var edit_hname = undefined;

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
		if(send_hid != "new_hw") {     
			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
			db.transaction(queryHwDB, errorCB);
		} else {
			setTheNewHw("Homework");
		}		
		getListHwChoice();
		getListHwWrite();
}

function setTheNewHw(hname) {
var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/add_tea_hname.php",
					type: 'POST',
					data:  "hname="+hname+"&cid="+send_courseid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						send_hid = data.hid;
						edit_hname = hname;
						$("#hidden_hname").val(send_hid);
						$("#edit_hw_header").html(edit_hname);
						$("#course-hw-name-input").val(edit_hname);					
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

function getListHwChoice() {	
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_hw_quest_choice.php",
					type: 'POST',
					data:  "hid="+send_hid,
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
						db.transaction(insertHwChoiceDB, errorCB);
						
					}	
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		 var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryHwChoiceDB, errorCB);	
	}
}

function getListHwWrite() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_hw_quest_write.php",
					type: 'POST',
					data:  "hid="+send_hid,
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
						db.transaction(insertHwWriteDB, errorCB);
						
					}	
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		 var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryHwWriteDB, errorCB);	
	}
}

// Populate the database
function insertHwWriteDB(tx) {
	var data_len = wqNo.length;	 
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+hw_write_db+' (qNo , question , ans , hid , PRIMARY KEY (qNo))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+hw_write_db+' (qNo , question , ans , hid) VALUES ("'+wqNo[i]+'", "'+wquestion[i]+'", "'+wans[i]+'" , "'+send_hid+'")');
    }  
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryHwWriteDB, errorCB);	
}

// Populate the database
function insertHwChoiceDB(tx) {
	var data_len = qNo.length;	 
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+hw_choice_db+' (qNo , question , choice1 , choice2 , choice3 , choice4 , ans , hid , PRIMARY KEY (qNo))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+hw_choice_db+' (qNo , question , choice1 , choice2 , choice3 , choice4 , ans , hid) VALUES ("'+qNo[i]+'", "'+question[i]+'", "'+choice1[i]+'", "'+choice2[i]+'", "'+choice3[i]+'" , "'+choice4[i]+'" , "'+ans[i]+'" , "'+send_hid+'")');
    }  
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryHwChoiceDB, errorCB);	
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryHwDB(tx) {
	tx.executeSql('SELECT * FROM '+hw_db+' WHERE hid = "'+send_hid+'"', [], querySuccessHw, errorCB);
}

// Query the database
function queryHwChoiceDB(tx) {
	tx.executeSql('SELECT * FROM '+hw_choice_db+' WHERE hid = "'+send_hid+'"', [], querySuccessHwChoice, errorCB);
}

// Query the database
function queryHwWriteDB(tx) {
	tx.executeSql('SELECT * FROM '+hw_write_db+' WHERE hid = "'+send_hid+'"', [], querySuccessHwWrite, errorCB);
}

// Query the success callback
function querySuccessHwChoice(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		c = showChoiceQuestion(c,send_hid,"edit",results.rows.item(i).qNo,results.rows.item(i).question,results.rows.item(i).choice1,results.rows.item(i).choice2,results.rows.item(i).choice3,results.rows.item(i).choice4,results.rows.item(i).ans);
	}
}

// Query the success callback
function querySuccessHwWrite(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		w = showWriteQuestion(w,send_hid,"edit",results.rows.item(i).qNo,results.rows.item(i).question,results.rows.item(i).ans);
	}
}

// Query the success callback
function querySuccessHw(tx, results) {
	var len = results.rows.length;
	edit_hname = results.rows.item(0).hname;
	$("#hidden_hname").val(send_hid);
	$("#edit_hw_header").html(edit_hname);
	$("#course-hw-name-input").val(edit_hname);
}

function execUpdateHname(tx) {
	tx.executeSql('UPDATE '+hw_db+' SET hname = "'+edit_hname+'" WHERE hid = "'+send_hid+'"');
	$("#edit_hw_header").html(edit_hname);
	$("#course-hw-name-input").val(edit_hname);
	$("#tea_cou_hw_name-1").css("display","block");
    $("#tea_cou_hw_name-2").css("display","none");
		
}

//jQuery    
$( document ).ready(function() {
	//Edit Exam Name Form
	$("#edit_hname_btn_submit").click(function() {
		//Callback handler for form submit event
			$("#edit_hname_form").submit(function(e)
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
							edit_hname = data.hname;
							send_hid = data.hid;								
							toast(data.message);						
                			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateHname, errorCB);												
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