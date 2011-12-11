package org.knxweb.objectupdater;

import java.applet.Applet;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.Socket;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class objectUpdater extends Applet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Socket sock;

	public void javascriptReturn(String object, String value) {
		try {
			getAppletContext().showDocument
		        (new URL("javascript:EIBCommunicator.sendUpdate('" + object + "' ,'" + value + "')"));
		} catch (MalformedURLException me) { }
	}
	
	public void init() {

		String linknxHost = getParameter("linknxHost");
		int linknxPort = Integer.parseInt(getParameter("linknxPort"));
		
		
		System.out.println("Connecting to " + linknxHost + ":" + linknxPort);
    	try {
			sock = new Socket(linknxHost, linknxPort);
	    	sock.setKeepAlive(true);
			ServerConn sc = new ServerConn(sock, this);
	        Thread t = new Thread(sc);
	        t.start();			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void destroy() {
		try {
			sock.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

class ServerConn implements Runnable {
    private BufferedReader in = null;
    private Socket server;
    private objectUpdater applet;

    public ServerConn(Socket server, objectUpdater applet) throws IOException {
    	this.server=server;
    	this.applet=applet;
        in = new BufferedReader(new InputStreamReader(
                    server.getInputStream()));
    }

    public void run() {

		try {
			BufferedWriter wr = new BufferedWriter(new OutputStreamWriter(this.server.getOutputStream(),"UTF-8"));
			String request="<admin><notification><registerall notifynow='true' /></notification></admin>" + (char)4;
			System.out.println("Sending to linknx : " + request);
			wr.write(request);
			wr.flush();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
    	
        String line;
        Pattern p = Pattern.compile("<notify id='(.*)'>(.*)</notify>");
        try {
            while ((line= in.readLine()) != null) {
            	line=line.replaceAll("[\\x04]", "");
            	Matcher m = p.matcher(line);
            	if (m.matches()) {
//            		System.out.println(m.group(1) + " = " + m.group(2));
            		this.applet.javascriptReturn(m.group(1), m.group(2));
            	}
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }
}