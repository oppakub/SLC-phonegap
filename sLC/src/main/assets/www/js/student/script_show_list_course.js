// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
    
// Cordova is ready
function onDeviceReady() {           
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
		db.transaction(queryDB, errorCB);
}

// Query the database
function queryDB(tx) {
	tx.executeSql('SELECT * FROM '+course_db+'', [], querySuccess, errorCB);
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	console.log("'+user_db+' table: " + len + " rows found.");
	for (var i=0; i<len; i++){
            $("#show_list_course").append('<li><a href="#" data-transition="none" name="'+results.rows.item(i).ccode+'">'+results.rows.item(i).cname+'</a></li>'+"\n").listview('refresh');
    }
}