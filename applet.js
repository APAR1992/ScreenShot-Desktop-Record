//SchreenShot+Record Applet By Infektedpc
const Applet = imports.ui.applet;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;

function ConfirmDialog(){
    this._init();
}


function MyApplet(orientation) {
    this._init(orientation);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation) {        
        Applet.IconApplet.prototype._init.call(this, orientation);
        
        try {        
            this.set_applet_icon_symbolic_name("camera-photo-symbolic");
            this.set_applet_tooltip(_("Take A Snapshot or Record Your Desktop"));
            
            this.menuManager = new PopupMenu.PopupMenuManager(this);
            this.menu = new Applet.AppletPopupMenu(this, orientation);
            this.menuManager.addMenu(this.menu);        
                                                                
            this._contentSection = new PopupMenu.PopupMenuSection();
            this.menu.addMenuItem(this._contentSection);                    
                                                    
          
		//Advanced Screenshot - opens gnome-screenshot
		this.menu.addAction(_("\u622a\u53d6\u5c4f\u5e55"), function(event) {
                Main.Util.spawnCommandLine("gnome-screenshot --interactive");
		}); 

		//Whole Screen - Dropdown Menu		
		this.screenshotItem = new PopupMenu.PopupSubMenuMenuItem(_("\u622a\u53d6\u5168\u5c4f")); 
		//1 Sec Delay
		this.screenshotItem.menu.addAction(_("1\u79d2\u5ef6\u8fdf"), function(actor, event) {
		Main.Util.spawnCommandLine("gnome-screenshot --delay=1 ");
		});
		//3 Sec Delay
		this.screenshotItem.menu.addAction(_("3\u79d2\u5ef6\u8fdf"), function(actor, event) {
		Main.Util.spawnCommandLine("gnome-screenshot --delay=3");
		}); 
		//5 Sec Delay
		this.screenshotItem.menu.addAction(_("5\u79d2\u5ef6\u8fdf"), function(actor, event) {
		Main.Util.spawnCommandLine("gnome-screenshot --delay=5");
		
});  
                       
		this.menu.addMenuItem(this.screenshotItem); 



		//Current Window
		this.menu.addAction(_("\u5f53\u524d\u7a97\u53e3"), function(event) {
                Main.Util.spawnCommandLine("gnome-screenshot -w");
		}); 

		//Selected Area
		this.menu.addAction(_("\u9009\u5b9a\u533a\u57df"), function(event) {
                Main.Util.spawnCommandLine("gnome-screenshot -a");
		});
	

	//Record My Desktop - Dropdown Menu
	this.recordItem = new PopupMenu.PopupSubMenuMenuItem(_("\u5f55\u5236\u684c\u9762"));
	//Start Recording With Audio
	this.recordItem.menu.addAction(_("\u6709\u58f0\u5f55\u5236"), function(actor, event) {
        Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/ScreenShot+RecordDesktop@tech71/screencapturesound.sh");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording With-Audio");
	});
	//Start Recording No Audio
	this.recordItem.menu.addAction(_("\u65e0\u58f0\u5f55\u5236"), function(actor, event) {
	Main.Util.spawnCommandLine(GLib.get_home_dir() + "/.local/share/cinnamon/applets/ScreenShot+RecordDesktop@tech71/screencapture.sh");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording No-Audio");
	});
	//Stop Recording
	this.recordItem.menu.addAction(_("Stop"), function(actor, event) {
	Main.Util.spawnCommandLine("killall -SIGTERM screencapture.sh");
	Main.Util.spawnCommandLine("killall -SIGTERM screencapturesound.sh");
	Main.Util.spawnCommandLine("killall -SIGTERM ffmpeg");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording-Stopped");
	Main.Util.spawnCommandLine("notify-send --icon=gtk-add Recording-Finished");
	});
                       
	this.menu.addMenuItem(this.recordItem);


	//Open Recorded Video Folder
	this.menu.addAction(_("\u56fe\u7247\u6587\u4ef6\u5939"), function(actor, event) {
	Main.Util.spawnCommandLine("xdg-open Pictures");
	});  

	//Open Recorded Video Folder
	this.menu.addAction(_("\u89c6\u9891\u6587\u4ef6\u5939"), function(actor, event) {
	Main.Util.spawnCommandLine("xdg-open Videos");
	});   
                        
        }
        catch (e) {
            global.logError(e);
        }
    },
    
    on_applet_clicked: function(event) {
        this.menu.toggle();        
    },
        
    
};

function main(metadata, orientation) {  
    let myApplet = new MyApplet(orientation);
    return myApplet;      
}
