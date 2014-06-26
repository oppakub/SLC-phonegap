var edit_ename = undefined;

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
	}
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryExamDB(tx) {
	tx.executeSql('SELECT * FROM '+exam_db+' WHERE eid = "'+send_eid+'"', [], querySuccessExam, errorCB);
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