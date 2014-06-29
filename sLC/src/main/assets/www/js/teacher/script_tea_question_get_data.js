var val_quest_lid = undefined;
var val_quest_name = undefined;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {  
	//$("#header_title").html(edit_cname); 
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
			db.transaction(queryQuestionLesDB, errorCB);
}

// Query the database
function queryQuestionLesDB(tx) {
	tx.executeSql('SELECT * FROM '+lesson_db+' WHERE cid = "'+send_courseid+'" ORDER BY lid DESC', [], queryQuestionLesSuccess, errorCB);
}

// Query the success callback
function queryQuestionLesSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){              
           $("#teacher_course_list_question").append('<li><a href="teacher_course_question_lesson.html" data-transition="none" name="'+results.rows.item(i).lid+'" lactive="'+results.rows.item(i).lactive+'" lshow="'+results.rows.item(i).lshow+'">'+results.rows.item(i).lname+'</a></li>  '+"\n").listview('refresh');            
    }
}

//jQuery    
$( document ).ready(function() {
	$(document).on("click", "#teacher_course_list_question li a" ,function (event) {
		val_quest_lid = $(this).attr("name");
		val_quest_name = $(this).text();
		//alert(send_eid);
	}); 
});