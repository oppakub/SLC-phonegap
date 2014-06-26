//Examination variables
var eid = new Array();
var ename = new Array();
var lid = new Array();

function showListExam() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_exam.php",
					type: 'POST',
					data:  "cid="+send_courseid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
							eid.push(data.data[i].eid);
							ename.push(data.data[i].ename);
							lid.push(data.data[i].lid);			
						}						
					
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(insertExamData, errorCB);	
					
					} else {
						//toast(data.message);	
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(queryExamDB, errorCB);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryExamDB, errorCB);	
	}
}

function insertExamData(tx) {
	var data_len = eid.length;	
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+exam_db+' (eid , ename , cid, lid , PRIMARY KEY (eid))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+exam_db+' (eid , ename , cid, lid) VALUES ("'+eid[i]+'", "'+ename[i]+'", "'+send_courseid+'", "'+lid[i]+'")');
    }
    
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryExamDB, errorCB);
}

// Query the database
function queryExamDB(tx) {
	tx.executeSql('SELECT * FROM '+exam_db+' WHERE cid = "'+send_courseid+'" ORDER BY ename DESC', [], queryExamSuccess, errorCB);
}

// Query the success callback
function queryExamSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
           // $("#tea_course_list_exam").append('<li><a href="teacher_course.html" data-transition="none" name="'+results.rows.item(i).ccode+'" cid="'+results.rows.item(i).cid+'">'+results.rows.item(i).cname+'</a></li>'+"\n").listview('refresh');
           $("#tea_course_list_exam").prepend('<li><a href="teacher_course_exam.html" data-transition="none" name="'+results.rows.item(i).eid+'">'+results.rows.item(i).ename+'</a> <!--Go to this exam--> <a href="#del_ExamID" eid="'+results.rows.item(i).eid+'" ename="'+results.rows.item(i).ename+'" data-rel="popup" data-theme="k" data-transition="slidedown" class="del_exam">Del</a><!--Delete This Exam--></li>'+"\n").listview('refresh');            
    }
    
}


/* ################################################################################################################ */

