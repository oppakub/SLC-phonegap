var stu_hid = undefined;
var stu_hname = undefined;
var stu_eid = undefined;
var stu_ename = undefined;

//jQuery    
$( document ).ready(function() {		
	$(".header_title").html(stu_cname);	
	$("#s_lesson_header").html(stu_lname);
	$("#std_less_des-text").html(stu_ldes);
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		showStuLessonSheetList();
		showStuLessonHwList();
		showStuLessonExamList();
		showStuLessonScore();
	} else {
		toast('Please connect to the internet.');
	}
	
	$(document).on("click", "#std_cou_less_list-homework li a" ,function (event) {
			stu_hid = $(this).attr("name");
			stu_hname = $(this).text();
	});
	
	$(document).on("click", "#std_cou_less_list-exam li a" ,function (event) {
			stu_eid = $(this).attr("name");
			stu_ename = $(this).text();
	});
});

function showStuLessonScore() {
	//Hw Score
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_score_hw.php",
					type: 'POST',
					data:  "lid="+stu_lid+"&uid="+stu_uid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;	
									
						for(var i =0;i<data_len;i++) {
							$("#tea_cou_less_coll-score").append('<p>'+data.data[i].hname+' : choice : '+data.data[i].hmc_cscore+' , writing : '+data.data[i].hmc_wscore+'</p>');				
						}	
										
					} else {
					
						//toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
		
	//Exam Score
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_score_exam.php",
					type: 'POST',
					data:  "lid="+stu_lid+"&uid="+stu_uid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;	
									
						for(var i =0;i<data_len;i++) {
							$("#tea_cou_less_coll-score").append('<p>'+data.data[i].ename+' : choice : '+data.data[i].exc_cscore+' , writing : '+data.data[i].exc_wscore+'</p>');				
						}	
										
					} else {
					
						//toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
}

function showStuLessonSheetList() {
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_sheet.php",
					type: 'POST',
					data:  "lid="+stu_lid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;	
						$("#std_cou_less_list-sheet").empty();				
						for(var i =0;i<data_len;i++) {
								$("#std_cou_less_list-sheet").append('<li><a href="#" onclick="window.open(\''+data.data[i].slink+'\', \'_system\');" data-transition="none" name="'+data.data[i].sid+'">'+data.data[i].sname+'</a></li>'+"\n").trigger('create');   				
						}	
										
					} else {
					$("#std_cou_less_list-sheet").empty();
						//toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
}

function showStuLessonHwList() {
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_hw.php",
					type: 'POST',
					data:  "lid="+stu_lid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;		
						$("#std_cou_less_list-homework").empty();			
						for(var i =0;i<data_len;i++) {
								$("#std_cou_less_list-homework").append('<li><a href="student_course_lesson_content_hw.html" data-transition="none" name="'+data.data[i].hid+'">'+data.data[i].hname+'</a></li>'+"\n").trigger('create');   				
						}	
										
					} else {
					$("#std_cou_less_list-homework").empty();
					//	toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
}

function showStuLessonExamList() {
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_exam.php",
					type: 'POST',
					data:  "lid="+stu_lid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;	
						$("#std_cou_less_list-exam").empty();				
						for(var i =0;i<data_len;i++) {
								$("#std_cou_less_list-exam").append('<li><a href="student_course_lesson_content_exam.html" data-transition="none" name="'+data.data[i].eid+'">'+data.data[i].ename+'</a></li>'+"\n").trigger('create');   				
						}	
										
					} else {
					$("#std_cou_less_list-exam").empty();
					//	toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
}