var edit_ename = undefined;

var qNo = new Array();
var question = new Array();
var choice1 = new Array();
var choice2 = new Array();
var choice3 = new Array();
var choice4 = new Array();
var ans = new Array();

var wqNo = new Array();
var wquestion = new Array();
var wans = new Array();

var c = 1;
var w = 1;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {   
		$("#header_title").html(edit_cname);
		if(send_eid != "new_exam") {     
			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
			db.transaction(queryExamDB, errorCB);
		} else {
			setTheNewExam("Exam");
		}
		getListExamChoice();
		getListExamWrite();
}

function setTheNewExam(ename) {
var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/add_tea_ename.php",
					type: 'POST',
					data:  "ename="+ename+"&cid="+send_courseid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						send_eid = data.eid;
						edit_ename = ename;
						$("#hidden_ename").val(send_eid);
						$("#edit_exam_header").html(edit_ename);
						$("#course-exam-name-input").val(edit_ename);					
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

function getListExamChoice() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_quest_choice.php",
					type: 'POST',
					data:  "eid="+send_eid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {						
						//toast(data.message);		
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
								qNo.push(data.data[i].qNo);
								question.push(data.data[i].question);
								choice1.push(data.data[i].choice1);
								choice2.push(data.data[i].choice2);
								choice3.push(data.data[i].choice3);
								choice4.push(data.data[i].choice4);
								ans.push(data.data[i].ans);
						}	
						
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(insertExamChoiceDB, errorCB);
						
					}	
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		 var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryExamChoiceDB, errorCB);	
	}
}

function getListExamWrite() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_quest_write.php",
					type: 'POST',
					data:  "eid="+send_eid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {						
						//toast(data.message);		
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
								wqNo.push(data.data[i].qNo);
								wquestion.push(data.data[i].question);								
								wans.push(data.data[i].ans);
						}	
						
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(insertExamWriteDB, errorCB);
						
					}	
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		 var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryExamWriteDB, errorCB);	
	}
}

// Populate the database
function insertExamWriteDB(tx) {
	var data_len = wqNo.length;	 
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+exam_write_db+' (qNo , question , ans , eid , PRIMARY KEY (qNo))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+exam_write_db+' (qNo , question , ans , eid) VALUES ("'+wqNo[i]+'", "'+wquestion[i]+'", "'+wans[i]+'" , "'+send_eid+'")');
    }  
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryExamWriteDB, errorCB);	
}

// Populate the database
function insertExamChoiceDB(tx) {
	var data_len = qNo.length;	 
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+exam_choice_db+' (qNo , question , choice1 , choice2 , choice3 , choice4 , ans , eid , PRIMARY KEY (qNo))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+exam_choice_db+' (qNo , question , choice1 , choice2 , choice3 , choice4 , ans , eid) VALUES ("'+qNo[i]+'", "'+question[i]+'", "'+choice1[i]+'", "'+choice2[i]+'", "'+choice3[i]+'" , "'+choice4[i]+'" , "'+ans[i]+'" , "'+send_eid+'")');
    }  
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryExamChoiceDB, errorCB);	
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryExamDB(tx) {
	tx.executeSql('SELECT * FROM '+exam_db+' WHERE eid = "'+send_eid+'"', [], querySuccessExam, errorCB);
}

// Query the database
function queryExamChoiceDB(tx) {
	tx.executeSql('SELECT * FROM '+exam_choice_db+' WHERE eid = "'+send_eid+'"', [], querySuccessExamChoice, errorCB);
}

// Query the database
function queryExamWriteDB(tx) {
	tx.executeSql('SELECT * FROM '+exam_write_db+' WHERE eid = "'+send_eid+'"', [], querySuccessExamWrite, errorCB);
}

// Query the success callback
function querySuccessExamChoice(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		c = showChoiceQuestion(c,send_eid,"edit",results.rows.item(i).qNo,results.rows.item(i).question,results.rows.item(i).choice1,results.rows.item(i).choice2,results.rows.item(i).choice3,results.rows.item(i).choice4,results.rows.item(i).ans);
	}
}

// Query the success callback
function querySuccessExamWrite(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		w = showWriteQuestion(w,send_eid,"edit",results.rows.item(i).qNo,results.rows.item(i).question,results.rows.item(i).ans);
	}
}

// Query the success callback
function querySuccessExam(tx, results) {
	var len = results.rows.length;
	edit_ename = results.rows.item(0).ename;
	$("#hidden_ename").val(send_eid);
	$("#edit_exam_header").html(edit_ename);
	$("#course-exam-name-input").val(edit_ename);
}

function execUpdateEname(tx) {
	//console.log("UPDATE "+course_db+" SET cname = '"+edit_cname+"' WHERE ccode = '"+send_coursecode+"'");
	tx.executeSql('UPDATE '+exam_db+' SET ename = "'+edit_ename+'" WHERE eid = "'+send_eid+'"');
	$("#edit_exam_header").html(edit_ename);
	$("#course-exam-name-input").val(edit_ename);
	$("#tea_cou_exam_name-1").css("display","block");
    $("#tea_cou_exam_name-2").css("display","none");
		
}

//jQuery    
$( document ).ready(function() {
	//Edit Exam Name Form
	$("#edit_ename_btn_submit").click(function() {
		//Callback handler for form submit event
			$("#edit_ename_form").submit(function(e)
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
							edit_ename = data.ename;
							send_eid = data.eid;								
							toast(data.message);						
                			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateEname, errorCB);												
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
   //end of Edit Exam Name Form
   
});  