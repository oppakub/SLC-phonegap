//jQuery    
var course_code = undefined;
var cid = undefined;
var cname = undefined;
var cdescription = undefined;
var ccode = undefined;
var stu_uid = undefined;
var tea_uid = undefined;
$( document ).ready(function() {
  //login form
  $("#student_btn_add_course").click(function() {
  		$.mobile.loading('show');  		
		//Callback handler for form submit event
			$("#student_add_course_form").submit(function(e)
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
							course_code = data.data.ccode;
							cid = data.data.cid;
							$("#box_add_course").hide();
							$("#box_show_course").show();
							$("#detail_course_name").html("Course name : "+data.data.cname);
							$("#detail_course_des").html("Course description : "+data.data.cdescription);
							$("#detail_course_code").html("Course code : "+data.data.ccode);
							$("#detail_course_teachername").html("Course teacher : "+data.data.firstname+" "+data.data.lastname);
							//alert(data.message);
						} else {
							toast(data.message);
						}
						//$.mobile.changePage('#show_dialog', "{transition: 'pop', role: 'dialog'}");										
					}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						//$.mobile.loading( 'hide' );
						//alert("ERROR");
						toast(jqXHR.responseText);
						//alert(thrownError);
					} //end error         
				});
				$.mobile.loading('hide');
				e.preventDefault(); //Prevent Default action. 
				e.unbind();
			}); 
   });  
});


$("#student_join_course").click(function() {
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
	db.transaction(queryCourseDB, errorCB);	
});

// Query the database
function queryCourseDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+course_db+' (cid , cname , cdescription, ccode , stu_uid, tea_uid , PRIMARY KEY (cid, ccode, stu_uid, tea_uid))');
	tx.executeSql('SELECT * FROM '+course_db+' where ccode = "'+course_code+'"', [], querySuccessCourse, errorCB);
}

// Query the database
function queryUserDB(tx) {
	tx.executeSql('SELECT * FROM '+user_db, [], querySuccessUser, errorCB);
}

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Populate the database
function populateDB(tx) {    
    tx.executeSql('INSERT INTO '+course_db+' (cid , cname , cdescription, ccode , stu_uid, tea_uid) VALUES ("'+cid+'", "'+cname+'", "'+cdescription+'", "'+ccode+'", "'+stu_uid+'" , "'+tea_uid+'")');
}

function successCB() {
    //var db = window.openDatabase("Database", "1.0", "SLC", 1024000);
   // db.transaction(queryDB, errorCB);
   //alert("eiei");
    //alert('Joined this course');
	$(location).attr('href','student.html');
	//$.mobile.changePage('student.html', { transition: "none", changeHash: false });
}

// Query the success callback
function querySuccessCourse(tx, results) {
	var len = results.rows.length;
	if(len > 0) {
		toast('You already joined this course.');
		$.mobile.changePage('student.html', { transition: "none", changeHash: false });
	} else {
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
		db.transaction(queryUserDB, errorCB);
	}
}

// Query the success callback
function querySuccessUser(tx, results) {
	var len = results.rows.length;
	stu_uid = results.rows.item(0).uid;
	$.ajax({
				url: "http://service.oppakub.me/SLC/join_course.php",
				type: 'POST',
				data:  "cid="+cid+"&uid="+stu_uid,
				dataType : "json",
				async: false,
				success: function(data, textStatus, jqXHR){
				if(data.status == "OK") {	
					cid = data.data.cid;
					cname = data.data.cname;
					cdescription = data.data.cdescription;
					ccode = data.data.ccode;
					tea_uid = data.data.uid;
					var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
        			db.transaction(populateDB, errorCB, successCB);	
				} else {
					toast(data.message);					
				}								
			}, //end success
				error: function(jqXHR, textStatus, errorThrown) {
					alert(jqXHR.responseText);
				} //end error         
	});
}


