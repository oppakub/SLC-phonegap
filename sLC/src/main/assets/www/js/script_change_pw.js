var main_username = undefined;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
    
// Cordova is ready
function onDeviceReady() {   
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
	main_username= results.rows.item(0).username;
	$("#change_pw_username").val(main_username);
}

//jQuery    
$( document ).ready(function() {


		$("#change_pw_submit").click(function() {
		//Callback handler for form submit event
			$("#change_pw_profile_form").submit(function(e)
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
						     $.mobile.changePage('main.html' , "{transition: 'none', role: 'dialog'}");
						     
						   // $.mobile.changePage('sign_in_avatar.html', "{transition: 'none', role: 'dialog'}");
							//$(location).attr('href','auth.html');
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
