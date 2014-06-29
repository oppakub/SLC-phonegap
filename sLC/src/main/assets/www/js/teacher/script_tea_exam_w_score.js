//jQuery    
$( document ).ready(function() {
	$(".header_title").html(edit_cname);
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		var count = 1;
		$.ajax({
					url: "http://service.oppakub.me/SLC/tea_show_exam_score_write.php",
					type: 'POST',
					data:  "cid="+send_courseid+"&eid="+send_eid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
													
							$("#teacher_course_exam_w-score-table").append('\
							<tr>\
                        <td>'+count+'</td>\
                        <td>'+data.data[i].firstname+' '+data.data[i].lastname+'</td>\
                        <td onclick="score_edit($(this))" style="cursor:pointer;">\
                            <div class="object1">'+data.data[i].exc_wscore+'<img src="img/Editing-Edit-icon.png" style="width:12px;"></div>\
                            <div class="object2" style="display:none;">\
                                <input type="text" name="exam_w-score-'+count+'-input" id="exam_w-score-'+(i+1)+'-input" value="'+data.data[i].exc_wscore+'" placeholder="Score" style="text-align:center;" onblur="score_blur($(this))"/>\
                            </div>\
                        </td>\
                    </tr>\
							').trigger('create');
							
							count++;
						}	
						
						$("#save_exam_w_score_count").val(count);	
						$("#save_exam_w_score_cid").val(send_courseid);
						$("#save_exam_w_score_eid").val(send_eid);		
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
	
	
	
	
	$("#save_exam_w_score_btn").click(function() {
		//Callback handler for form submit event
			$("#save_exam_w_score_form").submit(function(e)
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
							toast('Saved');				
						} else {
							//alert(data.message);
							toast('AJAX : error');
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