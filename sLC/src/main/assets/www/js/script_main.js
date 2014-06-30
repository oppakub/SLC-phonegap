$( document ).ready(function() {	
	$("#logout").click(function() {
		clearData();
		alert('Logout successful.');
		$(location).attr('href','auth.html');
	});
});

function clearData() {
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
		db.transaction(dropDB, errorCB);
}

// Populate the database
function dropDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS '+user_db);
	tx.executeSql('DROP TABLE IF EXISTS '+course_db);
	tx.executeSql('DROP TABLE IF EXISTS '+exam_db);
	tx.executeSql('DROP TABLE IF EXISTS '+exam_choice_db);
	tx.executeSql('DROP TABLE IF EXISTS '+exam_write_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_choice_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_write_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_docs_db);
	tx.executeSql('DROP TABLE IF EXISTS '+lesson_db);
	tx.executeSql('DROP TABLE IF EXISTS '+lesson_sheet_db);
	tx.executeSql('DROP TABLE IF EXISTS '+book_db);
}

// Populate the database
function clearDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS '+course_db);
	tx.executeSql('DROP TABLE IF EXISTS '+exam_db);
	tx.executeSql('DROP TABLE IF EXISTS '+exam_choice_db);
	tx.executeSql('DROP TABLE IF EXISTS '+exam_write_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_choice_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_write_db);
	tx.executeSql('DROP TABLE IF EXISTS '+hw_docs_db);
	tx.executeSql('DROP TABLE IF EXISTS '+lesson_db);
	tx.executeSql('DROP TABLE IF EXISTS '+lesson_sheet_db);
	tx.executeSql('DROP TABLE IF EXISTS '+book_db);
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}