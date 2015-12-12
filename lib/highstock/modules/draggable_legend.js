/**
 * Highcharts plugin for dragging a legend by its title
 *
 * Author: Torstein Hønsi
 * License: MIT License
 * Last revision: 2013-02-14
 * Requires: Highcharts 3.0+
 *
 * Adapted for Highstock by Fraxinas 2014-12-27
 *
 * Usage: Set draggable:true and floating:true in the legend options. The legend
 * preserves is alignment after dragging. For example if it is aligned to the right,
 * if will keep the same distance to the right edge even after chart resize or
 * when exporting to a different size.
 */
(function (H) {
    var addEvent = H.addEvent;

    H.wrap(H.Chart.prototype, 'init', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var chart = this,
            legend = chart.legend,
            title = legend.title,
            options = legend.options,
            isDragging,
            downX,
            downY,
            optionsX,
            optionsY,
            currentX,
            currentY;

        if (options.draggable && title) {

            title.css({ cursor: 'move' });
            var origDragStart = chart.pointer.dragStart;

            addEvent(title.element, 'mousedown', function (e) {
                chart.pointer.dragStart = function () {};
                e = chart.pointer.normalize(e);
                downX = e.chartX;
                downY = e.chartY;
                optionsX = options.x;
                optionsY = options.y;
                currentX = legend.group.attr('translateX');
                currentY = legend.group.attr('translateY');
                isDragging = true;
            });
            addEvent(chart.container, 'mousemove', function (e) {
                if (isDragging) {
                    e = chart.pointer.normalize(e);
                    var draggedX = e.chartX - downX,
                        draggedY = e.chartY - downY;

                    options.x = optionsX + draggedX;
                    options.y = optionsY + draggedY;

                    // Do the move is we're inside the chart
                    if (currentX + draggedX > 0 &&
                            currentX + draggedX + legend.legendWidth < chart.chartWidth &&
                            currentY + draggedY > 0 &&
                            currentY + draggedY + legend.legendHeight < chart.chartHeight) {
                        legend.group.placed = false; // prevent animation
                        legend.group.align(H.extend({
                            width: legend.legendWidth,
                            height: legend.legendHeight
                        }, options), true, 'spacingBox');
                    }

                }
            });
            addEvent(document, 'mouseup', function () {
                isDragging = false;
                if ( chart.pointer !== undefined )
                  chart.pointer.dragStart = origDragStart;
            });
        }
    });
}(Highcharts));
// End plugin
