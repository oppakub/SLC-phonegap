var uid = undefined;
var username = undefined;
var session = undefined;
var firstname = undefined;
var lastname = undefined;
var email = undefined;
var phone = undefined;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
    
// Cordova is ready
function onDeviceReady() {
	//$("#auth_page").hide();
	//checkConnection();
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
	db.transaction(queryDB, errorCB);
}

// Populate the database
function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS '+user_db+'');
    tx.executeSql('CREATE TABLE IF NOT EXISTS '+user_db+' (uid unique, username unique, firstname, lastname, email, phone , session)');
    tx.executeSql('INSERT INTO '+user_db+' (uid, username, firstname, lastname, email, phone , session) VALUES ("'+uid+'", "'+username+'", "'+firstname+'", "'+lastname+'", "'+email+'", "'+phone+'", "'+session+'")');    
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryDB(tx) {
	tx.executeSql('SELECT * FROM '+user_db+'', [], querySuccess, showLoginPage);
}

//Show Login page if query errors    
function showLoginPage() {
	//$("#auth_page").show();
	$.mobile.changePage('#auth_page', "{transition: 'none', role: 'dialog'}");		
}

// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	//console.log("'+user_db+' table: " + len + " rows found.");
	var tmp_username = results.rows.item(0).username;
	var tmp_session = results.rows.item(0).session;
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
				url: "http://service.oppakub.me/SLC/chk_session.php",
				type: 'POST',
				data:  "username="+tmp_username+"&session="+tmp_session,
				dataType : "json",
				async: false,
				success: function(data, textStatus, jqXHR){
				if(data.status == "OK") {
					$(location).attr('href','main.html');
				} else {
					alert('Invalid session, please log in again.');
					//$("#auth_page").show();
					$.mobile.changePage('#auth_page', "{transition: 'none', role: 'dialog'}");		
				}									
			}, //end success
				error: function(jqXHR, textStatus, errorThrown) {
					//alert("ERROR");
					alert(jqXHR.responseText);
					//alert(thrownError);
				} //end error         
			});
	} else {
		alert("You are using offline mode");
		$(location).attr('href','main.html');
	}
        
       /* for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
        }*/
}

//jQuery    
$( document ).ready(function() {
  //login form
  $("#auth_submit").click(function() {
		//Callback handler for form submit event
			$("#auth_form").submit(function(e)
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
							uid = data.data.uid;
							username = data.data.username;
							session = data.session;
							firstname = data.data.firstname;
							lastname = data.data.lastname;
							email = data.data.email;
							phone = data.data.phone;
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
        					db.transaction(populateDB, errorCB);		
        					alert("welcome "+username);
							$(location).attr('href','main.html');					
						} else {
							//alert(data.message);
							toast(data.message);
						}							
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

