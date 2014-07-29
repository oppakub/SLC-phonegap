var main_uid = undefined;
var main_avatar = undefined;
var main_username = undefined;
var new_avatar = undefined;

        // Wait for Cordova to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // Cordova is ready
        //
        function onDeviceReady() {
        // uploadPhoto("C:\fakepath\IMG_20140625_134510.jpg");
			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
			db.transaction(queryUserProfileDB, errorxCB);
        }
        
        //ErrorCB
		function errorxCB(err) {
			console.log("Error processing SQL: "+err.code);
		}

		// Query the database
		function queryUserProfileDB(tx) {
			tx.executeSql('SELECT * FROM '+user_db, [], querySuccessUserProfile, errorxCB);
		}

		// Query the success callback
		function querySuccessUserProfile(tx, results) {
			var len = results.rows.length;
			main_uid= results.rows.item(0).uid;
			main_avatar = results.rows.item(0).avatar;
			main_username = results.rows.item(0).username;
			if (main_avatar.indexOf("http://") !=-1) {
				$("#your_avatar").attr("src",main_avatar);
			}
			//alert(main_avatar);
			//$("#change_pw_username").val(main_username);
		}
		
		// Update user data
		function updateUserPicData(tx) {
			tx.executeSql('UPDATE '+user_db+' SET avatar = "'+new_avatar+'" WHERE uid = "'+main_uid+'"');
		}



         var img;

        function selectPicture() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(
                function(uri) {
                img = document.getElementById('your_avatar');
               // img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                statusDom = document.querySelector('#statuss');
            },
            function(e) {
            alert("Error getting picture: " + e);
             },
             { quality: 50,
               destinationType: navigator.camera.DestinationType.FILE_URI,
               sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
             });
}

        function uploadPicture() {
            var avatar  = document.getElementById('your_avatar');
            var imageURI = img.src;
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="plain/text";
           // options.mimeType="application/pdf";
            options.chunkedMode = false;

            var params = {};
            params.uid = main_uid;
           // params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://service.oppakub.me/SLC/upload_avatar.php"), win, fail, options);
            var perc;
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    statusDom.innerHTML = perc + "% loaded...";
                } else {
                    if(statusDom.innerHTML == "") {
                         statusDom.innerHTML = "Loading";
                    } else {
                         statusDom.innerHTML += ".";
                    }
                }
             };
        }

        function download() {
            alert('d');
             var remoteFile = "http://service.oppakub.me/SLC/upload/profile/13_7955.jpg";
             var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
             window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                 fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                    var localPath = fileEntry.fullPath;
                    if (device.platform == "Android" && localPath.indexOf("file://") == 0) {
                         localPath = localPath.substring(7);
                    }
                    alert(localPath);
                    alert(remoteFile);
                     var ft = new FileTransfer();
                     ft.download(remoteFile,localPath, function(entry) {
                        alert("path = " + entry.fullPath);
                     }, fail);
                    }, fail);
            }, fail);
         }

        function win(r) {
        	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_edit_profile.php",
					type: 'POST',
					data:  "username="+main_username,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {		
						new_avatar = data.data[0].avatar;	
						$("#main_avatar").attr("src",new_avatar);
					} else {
						alert(data.message);	
						$.mobile.hidePageLoadingMsg();	
						//$(location).attr('href','auth.html');		
						$.mobile.changePage('main.html');		
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						$.mobile.hidePageLoadingMsg();
						alert(jqXHR.responseText);
						$.mobile.changePage('main.html');		
					} //end error         
			});	 //end ajax
        	 var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(updateUserPicData, errorxCB);
            alert("Upload Successful.");
         //   download();
         //   console.log("Code = " + r.responseCode);
         //   console.log("Response = " + r.response);
         //   console.log("Sent = " + r.bytesSent);
          //  $(location).attr('href','auth.html');
           $.mobile.changePage('main.html' , "{transition: 'none', role: 'dialog'}");
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }