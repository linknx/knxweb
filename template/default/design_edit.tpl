<div class="menuTitle"></div>
<div id="notificationZone" class="notification"></div>

<ul id="myMenu">
	<li>
		<a href="#">menu item</a>
		<ul>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
		</ul>
	</li>	
	<li>
		<a href="#">menu item</a>
		<ul>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
		</ul>
	</li>	
	<li>
		<a href="#">menu item</a>
		<ul>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
			<li><a href="#">menu item</a></li>
		</ul>
	</li>	
</ul>



<div id="menu">
	<h3><a href="#">Design</a></h3>
	<div>
		<a onclick="modifyCurrentZone(); return false" href="" name="modifyZoneLayout">Modify layout</a><br />
		<input type="text" size="3" value="16">	<input type="checkbox"><br />
		<a onclick="saveDesign(); return false" href="" name="saveDesign">Save design</a><br />
		<a onclick="displayDesign(); return false" href="" name="displayDesign">Display design (XML)</a><br />
		<a href="index.html" name="gotoDesignList">Design list</a></li>
	</div>
	<h3><a href="#">Design</a></h3>
	<div>
		<a onclick="modifyCurrentZone(); return false" href="" name="modifyZoneLayout">Modify layout</a><br />
		<input type="text" size="3" value="16">	<input type="checkbox"><br />
		<a onclick="saveDesign(); return false" href="" name="saveDesign">Save design</a><br />
		<a onclick="displayDesign(); return false" href="" name="displayDesign">Display design (XML)</a><br />
		<a href="index.html" name="gotoDesignList">Design list</a></li>
	</div>
	
	{foreach from=$widgets key=cat item=widgetsArray}

		<h3><a href="#">{$cat}</a></h3>
		<div>
			{foreach from=$widgetsArray item=w}
			<button>{$w.label}</button><br />
			{/foreach}
		</div>

	{/foreach}
	
	</div>
