var set_hw_hid = undefined;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {   
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
			db.transaction(queryLessonHwDB, errorCB);
}

// Query the database
function queryLessonHwDB(tx) {
	tx.executeSql('SELECT * FROM '+hw_db+' WHERE cid = "'+send_courseid+'" and lid = "null" ORDER BY hid ASC', [], queryLessonHwSuccess, errorCB);
}

// Query the success callback
function queryLessonHwSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){               
           $("#tea_course_list_lesson_hw").append('<li><a href="#" data-transition="none" name="'+results.rows.item(i).hid+'">'+results.rows.item(i).hname+'</a></li>'+"\n").listview('refresh'); 
    } 
 }
 
 function execUpdateLessonHw(tx) {
	tx.executeSql('UPDATE '+hw_db+' SET lid = "'+send_lid+'" WHERE hid = "'+set_hw_hid+'"');
	$.mobile.changePage('teacher_course_lesson.html', { transition: "none", changeHash: false });
}  
 
 
 //jQuery    
$( document ).ready(function() {
	$(document).on("click", "#tea_course_list_lesson_hw li a" ,function (event) {
		set_hw_hid = $(this).attr("name");
		//alert(set_hw_hid);
		
		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/edit_tea_lesson_hw.php",
						type: 'POST',
						data:  "lid="+send_lid+"&hid="+set_hw_hid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							//toast(data.message);							
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateLessonHw, errorCB);	
					
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