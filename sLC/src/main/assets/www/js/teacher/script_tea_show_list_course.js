var cid = new Array();
var cname = new Array();
var cdescription = new Array();
var ccode = new Array();
var stu_uid = undefined;
var tea_uid = new Array();

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

// Populate the database
function populateDB(tx) {
	var data_len = cid.length;	 
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+course_db+' (cid , cname , cdescription, ccode , stu_uid, tea_uid , PRIMARY KEY (cid, ccode, stu_uid, tea_uid))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+course_db+' (cid , cname , cdescription, ccode , stu_uid, tea_uid) VALUES ("'+cid[i]+'", "'+cname[i]+'", "'+cdescription[i]+'", "'+ccode[i]+'", "'+stu_uid+'" , "'+tea_uid[i]+'")');
		//$("#tea_con_list").append('<li><a href="#" data-transition="none" name="'+ccode[i]+'">'+cname[i]+'</a></li>'+"\n").listview('refresh'); 
    }  
    
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryCourseDB, errorCB);	
}

// Query the database
function queryCourseDB(tx) {
	tx.executeSql('SELECT * FROM '+course_db+' WHERE tea_uid = stu_uid ORDER BY cname ASC', [], querySuccess, errorCB);
}


// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	var count = 0;
	//console.log("'+user_db+' table: " + len + " rows found.");
	for (var i=0; i<len; i++){
            $("#tea_con_list").append('<li><a href="teacher_course.html" data-transition="none" name="'+results.rows.item(i).ccode+'">'+results.rows.item(i).cname+'</a></li>'+"\n").listview('refresh');
           // $("#tea_edit_con_list").append('<li><a href="teacher_course.html" data-transition="none" name="'+results.rows.item(i).ccode+'">'+results.rows.item(i).cname+'</a></li>'+"\n").listview('refresh');
            
             $("#tea_edit_con_list").append('<li data-icon="delete"><a href="#del_t-courseID" data-rel="popup" data-transition="slidedown" name="'+results.rows.item(i).ccode+'">'+results.rows.item(i).cname+'</a>'+"\n").listview('refresh');
    }
}

// Query the success callback
function querySuccessUser(tx, results) {
	var len = results.rows.length;
	stu_uid = results.rows.item(0).uid;
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_course.php",
					type: 'POST',
					data:  "tea_uid="+stu_uid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
							//alert(data.data[i].cid);	
							cid.push(data.data[i].cid);
							cname.push(data.data[i].cname);
							cdescription.push(data.data[i].cdescription);
							ccode.push(data.data[i].ccode);
							tea_uid.push(data.data[i].uid);					
						}
					
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(populateDB, errorCB);	
					
					} else {
						toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryCourseDB, errorCB);	
	}
}

//jQuery    
$( document ).ready(function() {
	$(document).on("click", "#tea_con_list li a" ,function (event) {
	send_coursecode = $(this).attr("name");
	}); 
});








