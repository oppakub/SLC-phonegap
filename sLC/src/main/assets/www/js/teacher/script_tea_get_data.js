//jQuery    
//$( document ).ready(function() {
//	alert("Welcome to "+send_coursecode);
//});

var edit_cname = undefined;
var edit_cdes = undefined;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {           
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
		db.transaction(queryUserDB, errorCB);
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryUserDB(tx) {
	tx.executeSql('SELECT * FROM '+user_db, [], querySuccessUser, errorCB);
}

// Query the success callback
function querySuccessUser(tx, results) {
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryCourseDB, errorCB);	
}

// Query the database
function queryCourseDB(tx) {
	tx.executeSql('SELECT * FROM '+course_db+' WHERE ccode = "'+send_coursecode+'"', [], querySuccess, errorCB);
}

// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	edit_cname = results.rows.item(0).cname;
	edit_cdes = results.rows.item(0).cdescription;
	$("#edit_cname").html(edit_cname);
	$("#course-name-input").val(edit_cname);
	$("#tea_cou_des").html(edit_cdes);
	$("#course-description-textarea").html(edit_cdes);
	//alert(results.rows.item(0).ccode);
}

//jQuery    
$( document ).ready(function() {
	
});