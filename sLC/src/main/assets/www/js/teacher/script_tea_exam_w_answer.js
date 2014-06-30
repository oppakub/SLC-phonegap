//jQuery    
$( document ).ready(function() {
	$(".header_title").html(edit_cname);
	
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		var count = 1;
		
		$.ajax({
					url: "http://service.oppakub.me/SLC/tea_show_exam_get_write.php",
					type: 'POST',
					data:  "cid="+send_courseid+"&eid="+send_eid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
							var tmp_data = "";						
							tmp_data += '\
							<form action="http://service.oppakub.me/SLC/tea_show_exam_send_write.php" method="post" class="examID_w-score_form" data-transition="none">\
							<input type="hidden" name="uid" value="'+data.data[i].uid+'" />\
							<input type="hidden" name="eid" value="'+send_eid+'" />\
                    <div data-role="collapsible" data-content-theme="b" id="stdID-'+(i+1)+'_examID">\
                        <h3 id="stdID-'+(i+1)+'_examID-name">'+data.data[i].name+'</h3><!--Student name-->';
                        
                        var data_sub_len = data.data[i].question.length;

						for(var j =0;j<data_sub_len;j++) {
						tmp_data +='\
                        <div data-role="content" class="w_answer" id="stdID-'+(j+1)+'_examID_w-answer-'+(j+1)+'">\
                            <p>'+(j+1)+'.'+data.data[i].question[j].question+'</p><!--Question-->\
                             <p>Ans: '+data.data[i].question[j].ans+'</p>\
                            <input type="checkbox" name="stdID_examID_w-answer-checkbox" id="stdID-'+(j+1)+'_examID_w-answer-'+(j+1)+'-checkbox" class="custom" data-theme="d" onchange="score_check($(this))"/>\
                            <label for="stdID-'+(j+1)+'_examID_w-answer-'+(j+1)+'-checkbox" ><span class="user_answer" uid="'+data.data[i].uid+'" qNo="'+data.data[i].question[j].qNo+'"> </span></label><!--Answer-->\
                        </div><!--Repeat this for any question of this student user-->';
						}

						tmp_data +='\
                        <div class="ui-grid-a" id="stdID-'+(i+1)+'_examID_w-score">\
                            <div data-role="content" class="ui-block-a" data-theme="b" style="width:40%;">\
                                <h3 style="text-align:center;">Score</h3>\
                            </div>\
                            <div data-role="content" class="ui-block-b" data-theme="d" style="width:60%;">\
                                <h3 style="text-align:center;" id="stdID-'+(i+1)+'_examID_w-score-h3">0</h3>\
                                <input type="hidden" name="stdID_examID_w-score-input" id="stdID-'+(i+1)+'_examID_w-score-input" value="0"/>\
                            </div>\
                        </div>\
\
                        <input type="submit" value="Save Score" class="stdID_examID_w-answer_submit" data-mini="true" data-theme="e"/>\
\
                    </div><!--Repeat this for any student user in course-->\
                    </form>\
							';
							
							$("#exam_w_score_set").append(tmp_data).trigger('create');
							count++;
						}	
						
								
					} else {
						toast(data.message);	
						//toast("AJAX Error! : Please try again.");					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		toast('Please connect to the internet');	
	}
	
	$(".user_answer").each(function(i,v) {
		if(chk_connect != "no") {
			//alert($(this).attr('uid'));
			var t_uid = $(this).attr('uid');
			var t_qNo = $(this).attr('qNo');
			var obj = $(this);
			$.ajax({
					url: "http://service.oppakub.me/SLC/tea_set_exam_answer.php",
					type: 'POST',
					data:  "uid="+t_uid+"&qNo="+t_qNo,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						//alert(data.answer);
						obj.text(data.answer);
					}						
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
			});
		}
	});
	
	
	
	$(".stdID_examID_w-answer_submit").click(function() {
		//Callback handler for form submit event
			$(".examID_w-score_form").submit(function(e)
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
							toast('Saved score');				
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
	
});