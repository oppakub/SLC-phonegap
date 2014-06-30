var choice_count = 1;
var write_count = 1;

//jQuery    
$( document ).ready(function() {		
	$(".header_title").html(stu_cname);	
	$("#s_lesson_hw_header").html(stu_hname);
	//alert(stu_eid);
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		showStuLessonHwDataList();
		showStuLessonHwFileList();
	} else {
		toast('Please connect to the internet.');
	}
	
	$("#stu_btn_submit_hw").click(function() {
		gradeChoiceHw();
		gradeWriteHw();
		setHwStatus();
		alert('ส่งการบ้านสำเร็จ');
	});
	
});

function setHwStatus() {
	$.ajax({
					url: "http://service.oppakub.me/SLC/stu_send_hw_status.php",
					type: 'POST',
					data:  "uid="+stu_uid+"&hid="+stu_hid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
					} 							
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
		$.mobile.changePage('student_course_lesson_content.html', { transition: "none", changeHash: false });		
}

function gradeChoiceHw() {
	var score = 0;
	//alert(choice_count);
	for(var i =1;i<choice_count;i++) {
		var tmp_qNo = $("#qNo_"+i).attr('qNo');
		var tmp_set_ans = $("#answer_"+tmp_qNo).val();
		var tmp_user_ans = "0";
		tmp_user_ans = $('input[name=s_lesson_content_hwID-radio-'+tmp_qNo+']:checked', '#s_lesson_content_hwID-form').val();
		if(tmp_set_ans == tmp_user_ans) {
			score++;
		}
	}
	
	$.ajax({
					url: "http://service.oppakub.me/SLC/stu_send_hw_score.php",
					type: 'POST',
					data:  "uid="+stu_uid+"&cid="+stu_cid+"&lid="+stu_lid+"&hid="+stu_hid+"&score="+score,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
					} 							
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});

}

function gradeWriteHw() {
	var score = 0;
	//alert(choice_count);
	for(var i =1;i<write_count;i++) {
		var tmp_qNo = $("#wNo_"+i).attr('qNo');
		var tmp_ans = $("#s_lesson_content_hwID-input-"+tmp_qNo).val();
		
		$.ajax({
					url: "http://service.oppakub.me/SLC/stu_send_hw_write.php",
					type: 'POST',
					data:  "ans="+tmp_ans+"&qNo="+tmp_qNo+"&uid="+stu_uid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
					} 							
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});

		
	}
}

function showStuLessonHwDataList() {
	//Choice
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_hw_choice.php",
					type: 'POST',
					data:  "hid="+stu_hid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;	
						$("#s_lesson_content_hwID_choice").empty();	
						for(var i =0;i<data_len;i++) {							
								
								$("#s_lesson_content_hwID_choice").append('\
			<div data-role="header" data-theme="j">\
                    <p style="margin:10px;">'+choice_count+'.'+data.data[i].question+'</p>\
                </div>\
                <div data-role="content" data-theme="d">\
                    <fieldset data-role="controlgroup" data-theme="d" id="qNo_'+choice_count+'" qNo="'+data.data[i].qNo+'">\
                    <input type="hidden" id="answer_'+data.data[i].qNo+'" value="'+data.data[i].ans+'" /> \
                        <input type="radio" name="s_lesson_content_hwID-radio-'+data.data[i].qNo+'" id="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-1" value="1"  />\
                        <label for="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-1">'+data.data[i].choice1+'</label>\
\
                        <input type="radio" name="s_lesson_content_hwID-radio-'+data.data[i].qNo+'" id="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-2" value="2"  />\
                        <label for="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-2">'+data.data[i].choice2+'</label>\
\
                        <input type="radio" name="s_lesson_content_hwID-radio-'+data.data[i].qNo+'" id="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-3" value="3"  />\
                        <label for="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-3">'+data.data[i].choice3+'</label>\
\
                        <input type="radio" name="s_lesson_content_hwID-radio-'+data.data[i].qNo+'" id="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-4" value="4"  />\
                        <label for="s_lesson_content_hwID-radio-'+data.data[i].qNo+'-4">'+data.data[i].choice4+'</label>\
                    </fieldset>\
                </div><!--Repeat this-->	'+"\n").trigger('create');   
                
                choice_count++;				
						}	
										
					} else {
					$("#s_lesson_content_hwID_choice").empty();
					//	toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
		
		
		//Write
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_hw_write.php",
					type: 'POST',
					data:  "hid="+stu_hid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;	
						$("#s_lesson_content_hwID_writing").empty();	
						for(var i =0;i<data_len;i++) {							
								
								$("#s_lesson_content_hwID_writing").append('<div data-role="header" data-theme="j">\
                    <p style="margin:10px;">'+write_count+'.'+data.data[i].question+'</p>\
                </div>\
                <div data-role="content" data-theme="d" qNo="'+data.data[i].qNo+'" id="wNo_'+write_count+'">\
                    <input type="text"  name="s_lesson_content_hwID-input-'+data.data[i].qNo+'" id="s_lesson_content_hwID-input-'+data.data[i].qNo+'" placeholder="พิมพ์คำตอบ"/>\
                </div><!--Repeat this-->'+"\n").trigger('create');   
                
                			write_count++;				
						}	
										
					} else {
					$("#s_lesson_content_hwID_writing").empty();
					//	toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
		
		
}



function showStuLessonHwFileList() {
	//Choice
	$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson_hw_docs.php",
					type: 'POST',
					data:  "hid="+stu_hid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;	
						$("#s_lesson_content_hwID_file-ul").empty();	
						for(var i =0;i<data_len;i++) {							
								$("#s_lesson_content_hwID_file-ul").append('<li><a href="#" onclick="window.open(\''+data.data[i].hdoc_link+'\', \'_system\');" data-transition="none" name="'+data.data[i].hdoc_id+'">'+data.data[i].hdoc_name+'</a></li>'+"\n").trigger('create'); 
									
						}	
										
					} else {
					$("#s_lesson_content_hwID_file-ul").empty();
					//	toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
		
		
}