// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
	if (!window.cordova) {
		facebookConnectPlugin.browserInit(522533731207943);
	}

	//facebookConnectPlugin.logout(function (success) {}, function (error) {});

	var fbLoginSuccess = function (userData) {
		//alert("UserInfo: " + JSON.stringify(userData));
		facebookConnectPlugin.api("/me", [], fbGraphSuccess, fbError);
	}
	
	var fbError = function (msg) {
		$.mobile.hidePageLoadingMsg();
		alert("Error : "+msg);
		$(location).attr('href','auth.html');
	}

	facebookConnectPlugin.login(["public_profile","email"],
		fbLoginSuccess,
		fbError
	);
	
	var fbGraphSuccess = function (fbdata) {
		//alert("data: " + JSON.stringify(data));
		var user_id = fbdata.id;
		var user_fname = fbdata.first_name;
		var user_lname = fbdata.last_name;
		var user_email = fbdata.email;
		var user_name = user_fname+user_lname;
		
		//check existing user
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_signup.php",
					type: 'POST',
					data:  "email="+user_email,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {							
						//$("#sign_username").val(user_name.toLowerCase());
						//alert(user_fname);
						$("#sign_firstname").val(user_fname);
						$("#sign_lastname").val(user_lname);
						$("#sign_email").val(user_email);
						$("#sign_fid").val(user_id);
						$("#sign_img").val("http://graph.facebook.com/"+user_id+"/picture?type=large");
						$("#before_check_fb").hide();
						$("#after_check_fb").show();
						$.mobile.hidePageLoadingMsg();
					} else {
						alert(data.message);	
						$.mobile.hidePageLoadingMsg();	
						$(location).attr('href','auth.html');			
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						$.mobile.hidePageLoadingMsg();
						alert(jqXHR.responseText);
						$(location).attr('href','auth.html');
					} //end error         
		});	 //end ajax
		
	} //end fbGraphSuccess
} //end onDeviceReady

//jQuery    
$( document ).ready(function() {
var $this = $( "#before_check_fb"),
				theme = $this.jqmData("theme") || $.mobile.loadingMessageTheme,
				msgText = $this.jqmData("msgtext") || $.mobile.loadingMessage,
				textonly = !!$this.jqmData("textonly");
			$.mobile.showPageLoadingMsg(theme, msgText, textonly);
			
		$("#sign_in_submit").click(function() {
		//Callback handler for form submit event
			$("#sign_in_form").submit(function(e)
			{			 
				var formObj = $(this);
				var formURL = formObj.attr("action");
				var formData = new FormData(this);
				$.ajax({
					url: formURL,
					type: 'POST',
					data:  formData,
					mimeType:"multipart/form-data",
					dataType : "json",
					contentType: false,
					cache: false,
					processData:false,
					async: false,
					success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
						    //send_uid = data.uid;
						     alert(data.message);
						   // $.mobile.changePage('sign_in_avatar.html', "{transition: 'none', role: 'dialog'}");
							$(location).attr('href','auth.html');
						} else {
							//alert(data.message);
							toast(data.message);
							//$(location).attr('href','auth.html');
						}
						//$.mobile.changePage('#show_dialog', "{transition: 'pop', role: 'dialog'}");										
					}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						//alert("ERROR");
						alert(jqXHR.responseText);
						//alert(thrownError);
					} //end error         
				});
				e.preventDefault(); //Prevent Default action. 
				e.unbind();
			}); 
   });  	
			
			
			
			
			
});


