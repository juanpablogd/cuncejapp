/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 function alerta(msj,callback,titulo,nomBoton){
    if(navigator.notification == undefined){
        alert(msj);
        callback();
    }else{
        navigator.notification.alert(
            msj,  // message
            callback,         // callback
            titulo,            // title
            nomBoton                  // buttonName
        );
    }
}

function confirmar(msj,callback,titulo,nomBotones){
    if(navigator.notification == undefined){
        if (confirm(msj) == true) {
            callback();
        }
    }else{
        navigator.notification.confirm(
            msj, // message
            callback,            // callback to invoke with index of button pressed
            titulo,           // title
            ['No','Si']     // buttonLabels
        );
    }
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('deviceready');
        var devicePlatform = device.platform;
        console.log(devicePlatform);
        if(devicePlatform == "iOS"){
        	StatusBar.overlaysWebView(false);
        }
	    var networkState = navigator.connection.type;	console.log('Connection type: ' + networkState);
	    if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {   console.log("Sin Conectividad");
			$.notify({  icon: 'glyphicon glyphicon-warning-sign',
						message:'No hay conectividad, revise su conexión por favor'
					 }, { 
					type: "danger",
					allow_dismiss: false, 
					timer : 100,
					delay: 3000,
						animate: {
							enter: 'animated zoomInDown',
							exit: 'animated zoomOutUp'
						},
						placement: {
							from: "top",
							align: "center"
						}
					}
				);
		}
        FCMPlugin.subscribeToTopic('android');

        FCMPlugin.onTokenRefresh(function(token){
            console.log( token );
        });

        FCMPlugin.getToken(function(token){
            console.log( token );
        });
        
        //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //Here you define your application behaviour based on the notification data.
        FCMPlugin.onNotification(function(data){
            if(data.wasTapped){
              //Notification was received on device tray and tapped by the user.
              console.log( JSON.stringify(data) );
            }else{
              //Notification was received in foreground. Maybe the user needs to be notified.
              console.log( JSON.stringify(data) );
            }
        },function(msg) {
            console.log("successCallback:", msg);
          },function(err) {
            console.log("Error errorCallback:", err);
          }
        );

    }    
};

app.initialize();