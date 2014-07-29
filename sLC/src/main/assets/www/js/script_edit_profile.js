var main_username = undefined;
var edit_username = undefined;
var edit_firstname = undefined;
var edit_lastname = undefined;
var edit_phone = undefined;

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

// Update user data
function updateUserData(tx) {
	tx.executeSql('UPDATE '+user_db+' SET firstname = "'+edit_firstname+'" , lastname = "'+edit_lastname+'" , phone = "'+edit_phone+'" WHERE username = "'+edit_username+'"');
}

	

// Query the success callback
function querySuccessUserProfile(tx, results) {
	var len = results.rows.length;
	main_username= results.rows.item(0).username;
	//alert(main_username);
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_edit_profile.php",
					type: 'POST',
					data:  "username="+main_username,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {				
						//alert(data.data[0].firstname);
						edit_username = data.data[0].username;
						edit_firstname = data.data[0].firstname;
						edit_lastname = data.data[0].lastname;
						edit_phone = data.data[0].phone;
						$("#edit_firstname").val(edit_firstname);
						$("#edit_lastname").val(edit_lastname);
						$("#edit_phone").val(edit_phone);
						$("#edit_username").val(edit_username);
						$.mobile.hidePageLoadingMsg();
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
}




//jQuery    
$( document ).ready(function() {


		$("#edit_profile_submit").click(function() {
		//Callback handler for form submit event
			$("#edit_profile_form").submit(function(e)
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
						    $("#main_name").html(data.firstname+" "+data.lastname);
						    $("#main_phone").html(data.phone);
						     toast(data.message);
						     var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(updateUserData, errorxCB);
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
