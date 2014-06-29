//jQuery    
$( document ).ready(function() {	
	$(".header_title").html(stu_cname);
	$(".header_lesson").html(stu_lname);
	$("#student_course_ask_lesson_question_uid").val(stu_uid);
	$("#student_course_ask_lesson_question_lid").val(stu_lid);
	showAskQuestion();

	//Ask form
	$("#student_course_ask_submit").click(function() {  
	  var chk_connect = checkConnection();
		if(chk_connect != "no") {		
			//Callback handler for form submit event
				$("#student_course_ask_lesson_question-form").submit(function(e)
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
								//toast(data.message);
								$("#student_course_ask_lesson_question-input").val("");
								$("#show_ask_question_box").append('<div class="ui-grid-a" style="padding-bottom:15px;padding-top:10px;border-bottom: 1px solid #ddd;" id="ask_'+data.data.aid+'">                    \
								<div class="ui-block-a" style="text-align:left;padding-right:10px;">\
                        <span class="q-time"></span><br>\
                        <div class="img-shadow" style="background-color: #1E90FF;padding: 5px;border-radius:10px;color:#eee;display:inline-block;">\
                            <p class="no-p">Waiting for answer</p>\
                        </div>\
                    </div>\
                    <div class="ui-block-b" style="text-align:right;padding-left:10px;">\
                        <span class="q-time">'+data.data.aqdate+'</span><br>\
                        <div class="img-shadow" style="background-color: #aaa;padding: 5px;border-radius:10px;color:#222;display:inline-block;">\
                            <span>'+data.data.aquestion+'</span></div>\
                    </div>\
                </div>');
                $(document).scrollTop( $('#ask_'+data.data.aid).offset().top ); 
                //$.mobile.changePage('#anchor_'+data.data.aid, "{transition: 'none', role: 'dialog'}");	
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
					e.preventDefault(); //Prevent Default action. 
					e.unbind();
				}); 
			} else {
				toast('Please connect to the internet.');
				return false;
			}
   });
   
   
});


//show ask box
   function showAskQuestion() {
	   var chk_connect = checkConnection();
		if(chk_connect != "no") {
		$("#show_ask_question_box").empty();
		//toast('refresh');
			$.ajax({
						url: "http://service.oppakub.me/SLC/stu_show_ask_question.php",
						type: 'POST',
						data:  "aquid="+stu_uid+"&lid="+stu_lid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							var data_len = data.data.length;					
							for(var i =0;i<data_len;i++) {
									if(data.data[i].areply == null)
										data.data[i].areply = "Waiting for answer";
									if(data.data[i].ardate == null)
										data.data[i].ardate = "";
									$("#show_ask_question_box").append('<div class="ui-grid-a" style="padding-bottom:15px;padding-top:10px;border-bottom: 1px solid #ddd;" id="ask_'+data.data[i].aid+'">\
						<div class="ui-block-a" style="text-align:left;padding-right:10px;">\
							<span class="q-time">'+data.data[i].ardate+'</span><br>\
							<div class="img-shadow" style="background-color: #1E90FF;padding: 5px;border-radius:10px;color:#eee;display:inline-block;">\
								<p class="no-p">'+data.data[i].areply+'</p>\
							</div>\
						</div>\
						<div class="ui-block-b" style="text-align:right;padding-left:10px;">\
							<span class="q-time">'+data.data[i].aqdate+'</span><br>\
							<div class="img-shadow" style="background-color: #aaa;padding: 5px;border-radius:10px;color:#222;display:inline-block;">\
								<span>'+data.data[i].aquestion+'</span>\
							</div>\
						</div>\
					</div>');   				
							}	
										
						} else {
							//toast(data.message);					
						}								
					}, //end success
						error: function(jqXHR, textStatus, errorThrown) {
							alert(jqXHR.responseText);
						}, //end error      
						complete: function() {
						setTimeout(showAskQuestion,15000); //After completion of request, time to redo it after a second
					 }   
			});
		} else {
			toast('Please connect to the internet.');
		}  
	}