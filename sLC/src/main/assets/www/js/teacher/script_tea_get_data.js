//jQuery    
//$( document ).ready(function() {
//	alert("Welcome to "+send_coursecode);
//});

var edit_cname = undefined;
var edit_cdes = undefined;
var tea_uid = undefined;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {   
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
		db.transaction(queryUserDB, errorCB);
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryUserDB(tx) {
	tx.executeSql('SELECT * FROM '+user_db, [], querySuccessUser, errorCB);
}

// Query the success callback
function querySuccessUser(tx, results) {
tea_uid = results.rows.item(0).uid;
//alert(tea_uid);
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryCourseDB, errorCB);	
}

// Query the database
function queryCourseDB(tx) {
	tx.executeSql('SELECT * FROM '+course_db+' WHERE ccode = "'+send_coursecode+'"', [], querySuccess, errorCB);
}

// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	edit_cname = results.rows.item(0).cname;
	edit_cdes = results.rows.item(0).cdescription;
	$(".hidden_ccode").val(results.rows.item(0).ccode);
	$("#edit_cname").html(edit_cname);
	$("#course-name-input").val(edit_cname);
	$("#tea_cou_des").html(edit_cdes);
	$("#course-description-textarea").html(edit_cdes);
	showListExam();
	showListHW();
	showListLesson();
	showListBook();
	//alert(results.rows.item(0).ccode);
}

function execUpdateCname(tx) {
	//console.log("UPDATE "+course_db+" SET cname = '"+edit_cname+"' WHERE ccode = '"+send_coursecode+"'");
	tx.executeSql('UPDATE '+course_db+' SET cname = "'+edit_cname+'" WHERE ccode = "'+send_coursecode+'"');
	$("#edit_cname").html(edit_cname);
	$("#course-name-input").val(edit_cname);
	$("#tea_cou_name-1").css("display","block");
    $("#tea_cou_name-2").css("display","none");	
}

function execUpdateCdes(tx) {
	//console.log("UPDATE "+course_db+" SET cdescription = '"+edit_cdes+"' WHERE ccode = '"+send_coursecode+"'");
	tx.executeSql('UPDATE '+course_db+' SET cdescription = "'+edit_cdes+'" WHERE ccode = "'+send_coursecode+'"');
	$("#tea_cou_des").html(edit_cdes);
	$("#course-description-textarea").html(edit_cdes);
	$("#tea_cou_con_coll_CouDes-1").css("display","block");
   $("#tea_cou_con_coll_CouDes-2").css("display","none");
}

//jQuery    
$( document ).ready(function() {
	//Edit Coursename Form
	$("#edit_cname_btn_submit").click(function() {
		//Callback handler for form submit event
			$("#edit_cname_form").submit(function(e)
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
							edit_cname = data.cname;
							send_coursecode = data.ccode;		
							toast(data.message);						
                			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateCname, errorCB);												
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
   //end of Edit Coursename Form
   
   //Edit Course Description Form
	$("#edit_cdes_btn_submit").click(function() {
		//Callback handler for form submit event
			$("#edit_cdes_form").submit(function(e)
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
							edit_cdes = data.cdes;
							send_coursecode = data.ccode;		
							toast(data.message);						
                			var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
							db.transaction(execUpdateCdes, errorCB);												
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
   //end of Edit Course Description Form
   
	$(document).on("click", "#tea_course_list_exam li a" ,function (event) {
		send_eid = $(this).attr("name");
		//alert(send_eid);
	}); 
	
	$(document).on("click", "#tea_course_list_homework li a" ,function (event) {
		send_hid = $(this).attr("name");
		//alert(send_eid);
	}); 
	
	$(document).on("click", "#tea_course_list_lesson li a" ,function (event) {
		send_lid = $(this).attr("name");
		send_lactive = $(this).attr("lactive");
		send_lshow = $(this).attr("lshow");
		//alert(send_eid);
	}); 
	
	$("#tea_cou_con_coll_Cou-code-p").text(send_coursecode);   
   
});  // end of jQuery

