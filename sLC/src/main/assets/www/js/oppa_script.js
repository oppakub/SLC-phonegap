//Global variables
var username = "";
var session = "";
var user_db = "SLC_USER";
var database_name = "Database";
var database_version = "1.0";
var database_displayname = "SLC";
var database_size = 1024000; //byte

	// Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);
    
    // Cordova is ready
    //
    function onDeviceReady() {
    	$("#auth_page").hide();
        var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
        db.transaction(queryDB, errorCB);
    }

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM '+user_db+'', [], querySuccess, showLoginPage);
    }
    
    function showLoginPage() {
    	$("#auth_page").show();
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        console.log("'+user_db+' table: " + len + " rows found.");
        var tmp_username = results.rows.item(0).username;
        var tmp_session = results.rows.item(0).session;
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
							$("#auth_page").show();
						}
						//$.mobile.changePage('#show_dialog', "{transition: 'pop', role: 'dialog'}");										
					}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert("ERROR");
						alert(jqXHR.responseText);
						alert(thrownError);
					} //end error         
				});
        
       /* for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
        }*/
    }

// Populate the database
//
function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS '+user_db+'');
    tx.executeSql('CREATE TABLE IF NOT EXISTS '+user_db+' (username unique, session)');
    tx.executeSql('INSERT INTO '+user_db+' (username, session) VALUES ("'+username+'", "'+session+'")');
}
 function successCB() {
    //var db = window.openDatabase("Database", "1.0", "SLC", 1024000);
   // db.transaction(queryDB, errorCB);
   //alert("eiei");
}
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}
    
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
							username = data.username;
							session = data.session;
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
        					db.transaction(populateDB, errorCB, successCB);
							alert("welcome "+data.username);
							$(location).attr('href','main.html');
						} else {
							alert(data.message);
						}
						//$.mobile.changePage('#show_dialog', "{transition: 'pop', role: 'dialog'}");										
					}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert("ERROR");
						alert(jqXHR.responseText);
						alert(thrownError);
					} //end error         
				});
				e.preventDefault(); //Prevent Default action. 
				e.unbind();
			}); 
   });  
});

