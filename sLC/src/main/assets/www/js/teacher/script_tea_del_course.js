//jQuery   
var success_msg = undefined; 
$( document ).ready(function() {
	$(document).on("click", "#tea_edit_con_list li a" ,function (event) {
		$("#show_course_name").text($(this).text());
		send_coursecode = $(this).attr("name");
	}); 
	
	$("#tea_confirm_del_course").click(function() {
		//alert(send_coursecode);
		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/del_tea_course.php",
						type: 'POST',
						data:  "ccode="+send_coursecode,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							success_msg = data.message;							
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(deleteCourseDB, errorCB);	
					
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
function deleteCourseDB(tx) { 
	tx.executeSql('DELETE FROM '+course_db+' WHERE ccode ="'+send_coursecode+'" ');	
	alert(success_msg);	
	$(location).attr('href','teacher_edit.html');	
    
}