#!/usr/bin/env node
 
//
// This hook copies various resource files 
// from our version control system directories 
// into the appropriate platform specific location
//

// Nacho Marin took it from Holly Schinsky's post at
// her blog: http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/
// and adapted it to collaborate with tlvince's
// phonegap-icon-splash-generator repo at GitHub 

// Gotta copy this file to hooks/after_prepare
// in a cordova project and have tlvince's
// phonegap-icon-splash-generator.sh in the path
// The latter requires convert command from
// imagemagick (npm -g install imagemagick)

// Remember to chmod +x both scripts

// configure all the files to copy.  
// Key of object is the source file, 
// value is the destination location.  
// It's fine to put all platforms' icons 
// and splash screen files here, even if 
// we don't build for all platforms 
// on each developer's box.

var fs = require('fs'), xml2js = require('xml2js'), path = require('path');
var appName = null;
var rootdir = process.argv[2];

var parser = new xml2js.Parser();
fs.readFile('config.xml', 'utf8', function (err,data) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        parser.parseString(data, function (err, result) {
            if (err) {
                console.log('config.xml does not seem to be a valid XML document');
                console.log(err);
                process.exit(-1);
            } else {
                appName = result.widget.name;
                if (appName) {
                    console.log('Detected app name in config.xml: ' + appName);
                    copyFiles(appName, rootdir); 
                } else {
                    console.log('Could not find app name in config.xml');
                    process.exit(1);
                }
            }
        });
    }
});

function copyFiles (arg, rootdir) {
    var iOSPath = "platforms/ios/" + arg;
    var filestocopy = [{
        "res/icon/icon.png":
        "platforms/android/res/drawable/icon.png"
    }, {
        "res/icon/android/icon-72-hdpi.png":
        "platforms/android/res/drawable-hdpi/icon.png"
    }, {
        "res/icon/android/icon-36-ldpi.png":
        "platforms/android/res/drawable-ldpi/icon.png"
    }, {
        "res/icon/android/icon-48-mdpi.png":
        "platforms/android/res/drawable-mdpi/icon.png"
    }, {
        "res/icon/android/icon-96-xhdpi.png":
        "platforms/android/res/drawable-xhdpi/icon.png"
    }, {
        "res/screen/android/screen-xhdpi-portrait.png":
        "platforms/android/res/drawable/screen.png"
    }, {
        "res/screen/android/screen-hdpi-portrait.png":
        "platforms/android/res/drawable-port-hdpi/screen.png"
    }, {
        "res/screen/android/screen-hdpi-landscape.png":
            "platforms/android/res/drawable-land-hdpi/screen.png"
    },{
        "res/screen/android/screen-ldpi-portrait.png":
        "platforms/android/res/drawable-port-ldpi/screen.png"
    }, {
        "res/screen/android/screen-ldpi-landscape.png":
            "platforms/android/res/drawable-land-ldpi/screen.png"
    }, {
        "res/screen/android/screen-mdpi-portrait.png":
        "platforms/android/res/drawable-port-mdpi/screen.png"
    }, {
        "res/screen/android/screen-mdpi-landscape.png":
            "platforms/android/res/drawable-land-mdpi/screen.png"
    },{
        "res/screen/android/screen-xhdpi-portrait.png":
        "platforms/android/res/drawable-port-xhdpi/screen.png"
    },{
        "res/screen/android/screen-xhdpi-landscape.png":
            "platforms/android/res/drawable-land-xhdpi/screen.png"
    }, {
        "res/icon/ios/icon-40.png":
            iOSPath + "/Resources/icons/icon-40.png"
    }, {
        "res/icon/ios/icon-80.png":
            iOSPath + "/Resources/icons/icon-40@2x.png"
    }, {
        "res/icon/ios/icon-50.png":
            iOSPath + "/Resources/icons/icon-50.png"
    }, {
        "res/icon/ios/icon-100.png":
            iOSPath + "/Resources/icons/icon-50@2x.png"
    }, {
        "res/icon/ios/icon-60.png":
            iOSPath + "/Resources/icons/icon-60.png"
    }, {
        "res/icon/ios/icon-120.png":
            iOSPath + "/Resources/icons/icon-60@2x.png"
    }, {
        "res/icon/ios/icon-76.png":
            iOSPath + "/Resources/icons/icon-76.png"
    }, {
        "res/icon/ios/icon-152.png":
            iOSPath + "/Resources/icons/icon-76@2x.png"
    }, {
        "res/icon/ios/icon-29.png":
            iOSPath + "/Resources/icons/icon-small.png"
    }, {
        "res/icon/ios/icon-58.png":
            iOSPath + "/Resources/icons/icon-small@2x.png"
    }, {        "res/icon/ios/icon-72.png":
                iOSPath + "/Resources/icons/icon-72.png"
    }, {
        "res/icon/ios/icon-57.png":
        iOSPath + "/Resources/icons/icon.png"
    }, {
        "res/icon/ios/icon-114.png":
        iOSPath + "/Resources/icons/icon@2x.png"
    }, {
        "res/icon/ios/icon-144.png":
        iOSPath + "/Resources/icons/icon-72@2x.png"
    }, {
        "res/screen/ios/screen-iphone-portrait-2x.png":
        iOSPath + "/Resources/splash/Default@2x~iphone.png"
    }, {
        "res/screen/ios/Default-568h@2x~iphone.png":
        iOSPath + "/Resources/splash/Default-568h@2x~iphone.png"
    }, {
        "res/screen/ios/screen-iphone-portrait.png":
        iOSPath + "/Resources/splash/Default~iphone.png"
    }, {
        "res/screen/ios/screen-ipad-portrait.png":
         iOSPath + "/Resources/splash/Default-Portrait~ipad.png"
    }, {
        "res/screen/ios/screen-ipad-portrait-2x.png":
        iOSPath + "/Resources/splash/Default-Portrait@2x~ipad.png"
    }, {
        "res/screen/ios/screen-ipad-landscape-2x.png":
            iOSPath + "/Resources/splash/Default-Landscape@2x~ipad.png"
    }, {
        "res/screen/ios/screen-ipad-landscape.png":
            iOSPath + "/Resources/splash/Default-Landscape~ipad.png"
    } ];
     
     
    filestocopy.forEach(function(obj) {
        Object.keys(obj).forEach(function(key) {
            var val = obj[key];
            console.log('val = ' + val);
            console.log('key = ' + key);
            console.log('rootdir = ' + rootdir);
            var srcfile = path.join(rootdir, key);
            var destfile = path.join(rootdir, val);
            console.log("copying "+srcfile+" to "+destfile);
            var destdir = path.dirname(destfile);
            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                fs.createReadStream(srcfile).pipe(
                   fs.createWriteStream(destfile));
            }
        });
    });
}