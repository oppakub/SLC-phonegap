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
//Homework variables
var hid = new Array();
var hname = new Array();
var hlid = new Array();

function showListHW() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_hw.php",
					type: 'POST',
					data:  "cid="+send_courseid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
							hid.push(data.data[i].hid);
							hname.push(data.data[i].hname);
							hlid.push(data.data[i].lid);			
						}						
					
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(insertHwData, errorCB);	
					
					} else {
						//toast(data.message);	
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(queryHwDB, errorCB);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryHwDB, errorCB);	
	}
}

function insertHwData(tx) {
	var data_len = hid.length;	
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+hw_db+' (hid , hname , cid, lid , PRIMARY KEY (hid))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+hw_db+' (hid , hname , cid, lid) VALUES ("'+hid[i]+'", "'+hname[i]+'", "'+send_courseid+'", "'+hlid[i]+'")');
    }
    
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryHwDB, errorCB);
}

// Query the database
function queryHwDB(tx) {
	tx.executeSql('SELECT * FROM '+hw_db+' WHERE cid = "'+send_courseid+'" ORDER BY hname DESC', [], queryHwSuccess, errorCB);
}

// Query the success callback
function queryHwSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){  
           $("#tea_course_list_homework").prepend('<li><a href="teacher_course_homework.html" data-transition="none" name="'+results.rows.item(i).hid+'">'+results.rows.item(i).hname+'</a><a href="#del_HwID" hid="'+results.rows.item(i).hid+'" hname="'+results.rows.item(i).hname+'" data-rel="popup" data-theme="k" data-transition="slidedown" class="del_exam">Del</a></li>'+"\n").listview('refresh');     
    } 
 }   
/* ################################################################################################################ */
//Lesson variables
var llid = new Array();
var lname = new Array();
var ldescription = new Array();

function showListLesson() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_lesson.php",
					type: 'POST',
					data:  "cid="+send_courseid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
							llid.push(data.data[i].lid);
							lname.push(data.data[i].lname);
							ldescription.push(data.data[i].ldescription);			
						}						
					
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(insertLesData, errorCB);	
					
					} else {
						//toast(data.message);	
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(queryLesDB, errorCB);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryLesDB, errorCB);	
	}
}

function insertLesData(tx) {
	var data_len = llid.length;	
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+lesson_db+' (lid , lname , ldescription , cid ,PRIMARY KEY (lid))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+lesson_db+' (lid , lname , ldescription , cid) VALUES ("'+llid[i]+'", "'+lname[i]+'",  "'+ldescription[i]+'" , "'+send_courseid+'")');
    }
    
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryLesDB, errorCB);
}

// Query the database
function queryLesDB(tx) {
	tx.executeSql('SELECT * FROM '+lesson_db+' WHERE cid = "'+send_courseid+'" ORDER BY lid DESC', [], queryLesSuccess, errorCB);
}

// Query the success callback
function queryLesSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){              
           $("#tea_course_list_lesson").prepend('<li><a href="teacher_course_lesson.html" data-transition="none" name="'+results.rows.item(i).lid+'">'+results.rows.item(i).lname+'</a></li>  '+"\n").listview('refresh');            
    }
}
    
    
/* ################################################################################################################ */
//Book variables
var bid = new Array();
var bname = new Array();
var blink = new Array();
var btype = new Array();
var bdate_created = new Array();

function showListBook() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_tea_book.php",
					type: 'POST',
					data:  "cid="+send_courseid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
							bid.push(data.data[i].bid);
							bname.push(data.data[i].bname);
							blink.push(data.data[i].blink);		
							btype.push(data.data[i].btype);		
							bdate_created.push(data.data[i].bdate_created);	
						}						
					
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(insertBookData, errorCB);	
					
					} else {
						//toast(data.message);	
						var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
						db.transaction(queryBookDB, errorCB);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
		db.transaction(queryBookDB, errorCB);	
	}
}

function insertBookData(tx) {
	var data_len = bid.length;	
	tx.executeSql('CREATE TABLE IF NOT EXISTS '+book_db+' (bid , bname , blink , btype , bdate_created , cid ,PRIMARY KEY (bid))');    
	for(var i =0;i<data_len;i++) {	
		tx.executeSql('INSERT OR IGNORE INTO '+book_db+' (bid , bname , blink , btype , bdate_created , cid) VALUES ("'+bid[i]+'", "'+bname[i]+'",  "'+blink[i]+'" ,  "'+btype[i]+'" ,  "'+bdate_created[i]+'" , "'+send_courseid+'")');
    }
    
    var db = window.openDatabase(database_name,database_version, database_displayname, database_size);										
	db.transaction(queryBookDB, errorCB);
}

// Query the database
function queryBookDB(tx) {
	tx.executeSql('SELECT * FROM '+book_db+' WHERE cid = "'+send_courseid+'" ORDER BY bid DESC', [], queryBookSuccess, errorCB);
}

// Query the success callback
function queryBookSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){              
           //$("#tea_course_list_lesson").prepend('<li><a href="teacher_course_lesson.html" data-transition="none" name="'+results.rows.item(i).lid+'">'+results.rows.item(i).lname+'</a></li>  '+"\n").listview('refresh');      
           $("#tea_course_list_book").prepend('<li><a href="'+results.rows.item(i).blink+'" target="_blank" data-transition="none" name="'+results.rows.item(i).bid+'"><img src="../img/book-'+results.rows.item(i).btype+'.png"><h3>'+results.rows.item(i).bname+'</h3><p>Added : '+results.rows.item(i).bdate_created+'</p> </a><a href="#del_bookID" data-rel="popup" data-theme="k" data-transition="slidedown" bid="'+results.rows.item(i).bid+'" bname="'+results.rows.item(i).bname+'"  class="del_exam">Del</a><!-- Delete Book Button--> </li><!--Do repeat for any book-->'+"\n").listview('refresh');        
    }
}
    

