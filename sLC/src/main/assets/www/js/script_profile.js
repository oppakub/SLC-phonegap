
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
	tx.executeSql('SELECT * FROM '+user_db, [], querySuccessUserProfile, errorCB);
}

// Query the success callback
function querySuccessUserProfile(tx, results) {
	var len = results.rows.length;
	//stu_uid = results.rows.item(0).uid;
	var main_firstname = results.rows.item(0).firstname;
	var main_lastname = results.rows.item(0).lastname;
	var main_avatar = results.rows.item(0).avatar;
	var main_username= results.rows.item(0).username;
	var main_email= results.rows.item(0).email;
	var main_phone= results.rows.item(0).phone;
	
	if(main_avatar == "../img/icon-user-default.png")
		main_avatar = "img/icon-user-default.png";
	if(main_phone == "null")
		main_phone = "";
	
	
	//alert(main_firstname);
	$("#main_avatar").attr('src' , main_avatar);
	$("#main_username").html(main_username);
	$("#main_name").html(main_firstname+" "+main_lastname);
	$("#main_email").html(main_email);
	$("#main_phone").html(main_phone);
}