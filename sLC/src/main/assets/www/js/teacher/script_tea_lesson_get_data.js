var edit_lname = undefined;
var edit_ldes = undefined;

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
   
   
   
	
   
});  // end of jQuery