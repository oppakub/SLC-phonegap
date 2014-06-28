var edit_lname = undefined;
var edit_ldes = undefined;

var sid = new Array();
var sname = new Array();
var slink = new Array();

var send_sid = undefined;
var val_active = undefined;
var val_show = undefined;
var val_eid = undefined;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {   
		$("#header_title").html(edit_cname); 
		if(send_lid != "new_lesson") {     
			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
			db.transaction(queryLessonDB, errorCB);
		} else {
			setTheNewLesson("Lesson");
		}
		showListSheet();
		showListLessonExam();
		checkSetting();
}

function setTheNewLesson(lname) {
var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/add_tea_lname.php",
					type: 'POST',
					data:  "lname="+lname+"&cid="+send_courseid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						toast(data.message);
						send_lid = data.lid;
						edit_lname = lname;
						edit_ldes = data.ldes;
						$(".hidden_lid").val(send_lid);
						$("#edit_lesson_header").html(edit_lname);
						$("#course-less-name-input").val(edit_lname);
						$("#tea_less_des").html(edit_ldes);
						$("#lesson-description-textarea").html(edit_ldes);				
					} else {
						//toast(data.message);	
						toast("AJAX Error! : Please try again.");					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		toast('Please connect to the internet');	
		return false;
	}
}

function showListSheet() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_lesson_sheet.php",
					type: 'POST',
					data:  "lid="+send_lid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {						
						//toast(data.message);		
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
								sid.push(data.data[i].sid);
								sname.push(data.data[i].sname);								
								slink.push(data.data[i].slink);
						}	
						
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(insertSheetDB, errorCB);
						
					}	
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		 var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(querySheetDB, errorCB);	
	}
}

function showListLessonExam() {
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryLessonExamDB, errorCB);
}

// Query the database
function queryLessonExamDB(tx) {
	tx.executeSql('SELECT * FROM '+exam_db+' WHERE cid = "'+send_courseid+'"  ORDER BY ename DESC', [], queryLessonExamSuccess, errorCB);
}

// Query the success callback
function queryLessonExamSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
			if(results.rows.item(i).lid == send_lid)
           		$("#select-exam-for-lessonID").append('<option value="'+results.rows.item(i).eid+'" selected="selected">'+results.rows.item(i).ename+'</option>'+"\n");    
           	else
           		$("#select-exam-for-lessonID").append('<option value="'+results.rows.item(i).eid+'">'+results.rows.item(i).ename+'</option>'+"\n");   
    }
    $("#select-exam-for-lessonID").selectmenu("refresh");
    
}

function checkSetting() {	
		// alert("Active : "+send_lactive+"\nShow : "+send_lshow);	
		$("#lesson-setting-active-"+send_lactive).attr('selected' , true);
		$("#lesson-setting-show-"+send_lshow).attr('selected' , true);
}

// Populate the database
function insertSheetDB(tx) {
	var data_len = sid.length;	 
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+lesson_sheet_db+' (sid , sname , slink , lid , PRIMARY KEY (sid))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+lesson_sheet_db+' (sid , sname , slink , lid) VALUES ("'+sid[i]+'", "'+sname[i]+'", "'+slink[i]+'" , "'+send_lid+'")');
    }  
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(querySheetDB, errorCB);	
}

// Query the database
function querySheetDB(tx) {
	tx.executeSql('SELECT * FROM '+lesson_sheet_db+' WHERE lid = "'+send_lid+'"', [], querySuccessSheet, errorCB);
}

// Query the success callback
function querySuccessSheet(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		$("#tea_course_list_hw").prepend('<li><a href="#" onclick="window.open(\''+results.rows.item(i).hdoc_link+'\', \'_system\');" data-transition="none" name="'+results.rows.item(i).hdoc_id+'">'+results.rows.item(i).hdoc_name+'</a> <a href="#del_HwDocID" data-rel="popup" hdoc_id="'+results.rows.item(i).hdoc_id+'" hdoc_name="'+results.rows.item(i).hdoc_name+'"   data-theme="k" data-transition="slidedown" class="del_exam">Del</a></li> '+"\n").listview('refresh');   
		
		$("#tea_cou_less_list_sheet").prepend('<li><a href="#" onclick="window.open(\''+results.rows.item(i).slink+'\', \'_system\');" data-transition="none" name="'+results.rows.item(i).sid+'">'+results.rows.item(i).sname+'</a><a href="#del_sheetID" data-rel="popup" data-theme="k" sid="'+results.rows.item(i).sid+'" sname="'+results.rows.item(i).sname+'"  data-transition="slidedown" class="del_exam">Del</a></li>'+"\n").listview('refresh');
	}
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryLessonDB(tx) {
	tx.executeSql('SELECT * FROM '+lesson_db+' WHERE lid = "'+send_lid+'" ', [], queryLessonSuccess, errorCB);
}

// Query the success callback
function queryLessonSuccess(tx, results) {
	var len = results.rows.length;
	edit_lname = results.rows.item(0).lname;
	edit_ldes = results.rows.item(0).ldescription;	
	$(".hidden_lid").val(results.rows.item(0).lid);
	$("#edit_lesson_header").html(edit_lname);
	$("#course-less-name-input").val(edit_lname);
	$("#tea_less_des").html(edit_ldes);
	$("#lesson-description-textarea").html(edit_ldes);
	
	//alert(results.rows.item(0).ccode);
}

function execUpdateLname(tx) {
	tx.executeSql('UPDATE '+lesson_db+' SET lname = "'+edit_lname+'" WHERE lid = "'+send_lid+'"');
	$("#edit_lesson_header").html(edit_lname);
	$("#course-less-name-input").val(edit_lname);
	$("#tea_cou_less_name-1").css("display","block");
   $("#tea_cou_less_name-2").css("display","none");
}

function execUpdateLdes(tx) {
	tx.executeSql('UPDATE '+lesson_db+' SET ldescription = "'+edit_ldes+'" WHERE lid = "'+send_lid+'"');
	$("#tea_less_des").html(edit_ldes);
	$("#lesson-description-textarea").html(edit_ldes);
	$("#tea_cou_less_des-edit-1").css("display","block");
   $("#tea_cou_less_des-edit-2").css("display","none");
}

// Populate the database
function deleteSheetDB(tx) { 
	tx.executeSql('DELETE FROM '+lesson_sheet_db+' WHERE sid ="'+send_sid+'"');		

	$("#del_sheetID").popup( "close" );
	$("#tea_cou_less_list_sheet").empty();
	$("#tea_cou_less_list_sheet").append('<li data-icon="plus" data-theme="j"><a href="teacher_course_lesson_sheet.html" name="new_sheet" data-transition="none">Add Sheet</a></li>').listview('refresh'); 
	alert(success_msg);	
	//onDeviceReady();
	//showListExam();
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(querySheetDB, errorCB);    
}

function execUpdateLessonSetting(tx) {
	tx.executeSql('UPDATE '+lesson_db+' SET lactive = "'+val_active+'" , lshow = "'+val_show+'" WHERE lid = "'+send_lid+'"');
	
}

function execUpdateLessonExam(tx) {
	tx.executeSql('UPDATE '+exam_db+' SET lid = "'+send_lid+'" WHERE eid = "'+val_eid+'"');
	
}


function updateLessonSetting() {
		val_active = $('#lesson-setting-active').val();
  		val_show = $('#lesson-setting-show').val();
  		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/edit_tea_lesson_setting.php",
						type: 'POST',
						data:  "lid="+send_lid+"&lactive="+val_active+"&lshow="+val_show,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {						
							//toast(data.message);		
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateLessonSetting, errorCB);					
						}	else {
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
}

function updateLessonExam() {
		val_eid = $('#select-exam-for-lessonID').val();
  		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/edit_tea_lesson_exam.php",
						type: 'POST',
						data:  "lid="+send_lid+"&eid="+val_eid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {						
							//toast(data.message);		
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateLessonExam, errorCB);					
						}	else {
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
}

//jQuery    
$( document ).ready(function() {
	//Edit Lesson Name Form
	$("#edit_lname_btn_submit").click(function() {
		//Callback handler for form submit event
			$("#edit_lname_form").submit(function(e)
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
							edit_lname = data.lname;
							send_lid = data.lid;		
							toast(data.message);						
                			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateLname, errorCB);												
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
   //end of Edit Lesson Name Form
   
   //Edit Lesson Description Form
	$("#edit_ldes_btn_submit").click(function() {
		//Callback handler for form submit event
			$("#edit_ldes_form").submit(function(e)
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
							edit_ldes = data.ldes;
							send_lid = data.lid;		
							toast(data.message);						
                			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateLdes, errorCB);												
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
   //end of Edit Lesson Description Form
   
   $(document).on("click", "#tea_cou_less_list_sheet li a.del_exam" ,function (event) {
		$("#show_sheet_name").text($(this).attr("sname"));
			send_sid = $(this).attr("sid");	
	}); 
	
	$("#confirm_del_sheet").click(function() {
		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/del_tea_lesson_sheet.php",
						type: 'POST',
						data:  "sid="+send_sid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							success_msg = data.message;							
							var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(deleteSheetDB, errorCB);	
					
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
   
   $('#lesson-setting-active').on('change', function() {
  		//alert( $(this).val() );
  		updateLessonSetting();
	});
	
	$('#lesson-setting-show').on('change', function() {
  		//alert( $(this).val() );
  		updateLessonSetting();
	});
	
	$('#select-exam-for-lessonID').on('change', function() {
  		//alert( $(this).val() );
  		updateLessonExam();
	});
	
   
});  // end of jQuery