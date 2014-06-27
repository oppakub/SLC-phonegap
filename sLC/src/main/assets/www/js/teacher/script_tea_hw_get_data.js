var edit_hname = undefined;

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
		//getListExamChoice();
		//getListExamWrite();
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
						$("#hidden_hname").val(send_eid);
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

//ErrorCB
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Query the database
function queryHwDB(tx) {
	tx.executeSql('SELECT * FROM '+hw_db+' WHERE hid = "'+send_hid+'"', [], querySuccessHw, errorCB);
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