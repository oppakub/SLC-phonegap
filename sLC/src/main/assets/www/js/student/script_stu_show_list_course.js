var cid = new Array();
var cname = new Array();
var cdescription = new Array();
var ccode = new Array();
var stu_uid = undefined;
var tea_uid = new Array();

var stu_cid = undefined;
var stu_cname = undefined;

var stu_lid = undefined;
var stu_lname = undefined;

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
	var len = results.rows.length;
	stu_uid = results.rows.item(0).uid;
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course.php",
					type: 'POST',
					data:  "stu_uid="+stu_uid,
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

// Populate the database
function populateDB(tx) {
	var data_len = cid.length;	 
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+course_db+' (cid , cname , cdescription, ccode , stu_uid, tea_uid , PRIMARY KEY (cid, ccode, stu_uid, tea_uid))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT INTO '+course_db+' (cid , cname , cdescription, ccode , stu_uid, tea_uid) VALUES ("'+cid[i]+'", "'+cname[i]+'", "'+cdescription[i]+'", "'+ccode[i]+'", "'+stu_uid+'" , "'+tea_uid[i]+'")');
		//$("#stu_con_list").append('<li><a href="#" data-transition="none" name="'+ccode[i]+'">'+cname[i]+'</a></li>'+"\n").listview('refresh'); 
    }  
    
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryCourseDB, errorCB);	
}

/*// Query the success callback
function querySuccessUser(tx, results) {
	var len = results.rows.length;
	stu_uid = results.rows.item(0).uid;
	var db = window.openDatabase(database_name,database_version, database_displayname, database_size);
		db.transaction(queryCourseDB, errorCB);
}*/

// Query the database
function queryCourseDB(tx) {
	tx.executeSql('SELECT * FROM '+course_db+' WHERE tea_uid != stu_uid ORDER BY cname ASC', [], querySuccess, errorCB);
}


// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	//console.log("'+user_db+' table: " + len + " rows found.");
	for (var i=0; i<len; i++){
            $("#stu_con_list").append('<li><a href="student_course.html" data-transition="none" name="'+results.rows.item(i).cid+'" ccode="'+results.rows.item(i).ccode+'">'+results.rows.item(i).cname+'</a></li>'+"\n").listview('refresh');
    }
}


//jQuery    
$( document ).ready(function() {
	$(document).on("click", "#stu_con_list li a" ,function (event) {
		stu_cid = $(this).attr("name");
		stu_cname = $(this).text();
		//alert(stu_cid);
		//alert(send_eid);
	}); 
});