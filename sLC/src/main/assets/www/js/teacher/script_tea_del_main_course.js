var success_msg = undefined; 
//jQuery    
$( document ).ready(function() {
	$(document).on("click", "#tea_course_list_exam li a.del_exam" ,function (event) {
		$("#show_exam_name").text($(this).attr("ename"));
			send_eid = $(this).attr("eid");	
	}); 
	
	$("#confirm_del_exam").click(function() {
		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/del_tea_exam.php",
						type: 'POST',
						data:  "eid="+send_eid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							success_msg = data.message;							
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(deleteExamDB, errorCB);	
					
						} else {
							toast(data.message);					
						}								
					}, //end success
						error: function(jqXHR, textStatus, errorThrown) {
							alert(jqXHR.responseText);
						} //end error         
			});
		} else {
			toast('Please connect to the internet');			
		}
	});
});

// Populate the database
function deleteExamDB(tx) { 
	tx.executeSql('DELETE FROM '+exam_db+' WHERE eid ="'+send_eid+'"');	
	
	//$(location).attr('href','teacher_edit.html');	
	//refreshPage($("#teacher_edit"));
	$("#del_ExamID").popup( "close" );
	$("#tea_course_list_exam").empty();
	$("#tea_course_list_exam").append('<li data-icon="plus" data-theme="j"><a href="teacher_course_exam.html" data-transition="none" name="new_exam">Add Examination</a></li>').listview('refresh'); 
	alert(success_msg);	
	//onDeviceReady();
	//showListExam();
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryExamDB, errorCB);
    
}