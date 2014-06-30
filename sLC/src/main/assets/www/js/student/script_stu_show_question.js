//jQuery    
$( document ).ready(function() {		
	$(".header_title").html(stu_cname);	
	showQuestion();
	
	
	
});



function showQuestion() {
   //toast('refresh');
	   var chk_connect = checkConnection();
		if(chk_connect != "no") {
		$("#stu_show_question").empty();
		//toast('refresh');
			$.ajax({
						url: "http://service.oppakub.me/SLC/stu_show_question.php",
						type: 'POST',
						data:  "cid="+stu_cid+"&uid="+stu_uid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							var data_len = data.data.length;	
							var qimage = "";	
							$("#stu_show_question").empty();			
							for(var i =0;i<data_len;i++) {
									if(data.data[i].avatar == "pic/avatar/default.png") {
										qimage = "../img/icon-user-default.png";
									} else {
										qimage = data.data[i].avatar;
									} 
									if(data.data[i].tqanswer == null) {
											$("#stu_show_question").append('\
<div class="ui-grid-a rType-question" id="s-cID-lID_r-questionID-'+data.data[i].tqid+'"><!--Replace questionID-1-->\
                <div class="ui-block-a" style="width:80%;">\
                    <div class="ui-grid-a r-box">\
                        <div class="ui-block-a" style="width:20%;padding: 2px;">\
                            <img src="'+qimage+'" class="img-radius r-img"><!--Replace src="..."-->\
                        </div><!--Image of student user-->\
                        <div class="ui-block-b" style="width:80%;padding:2px;">\
                            <p class="no-p r-name">'+data.data[i].firstname+' '+data.data[i].lastname+'</p><!--Replace name and time-->\
                            <p class="r-question">'+data.data[i].question+'</p><!--Replace question-->\
                        </div><!--Name of student, ask time and question from student-->\
                    </div>\
                    <div class="rType-form" style="display:none;">\
                        <form action="http://service.oppakub.me/SLC/stu_send_ask_question2.php" method="post" id="s-cID-lID_r-questionID-'+data.data[i].tqid+'-form">\
                        <input type="hidden" name="tqid" value="'+data.data[i].tqid+'" />\
							<input type="hidden" name="tquid" value="'+stu_uid+'" />\
                            <input type="text" data-clear-btn="true" name="s-cID-lID_r-questionID-input" id="s-cID-lID_r-questionID-'+data.data[i].tqid+'-input" value="" placeholder="Answer" onblur="answer_blur(\'questionID\',1)"/>\
                        </form><!--Replace questionID-1 both id of form and input-->\
                    </div><!--Form for type answer you must define right "id" and define right attribute of answer_blur() function is "questionID" and number of question in list-->\
                </div>\
                <div class="ui-block-b rType-b-1" style="width:20%;cursor:pointer;" onclick="answer_reply(\'questionID\','+data.data[i].tqid+')">\
                    <p class="r-reply">Reply</p>\
                </div><!--Reply button for show input tag for answer question and show ok button for submit form answer-->\
                <div class="ui-block-b rType-b-2" style="width:20%;cursor:pointer;display:none;" onclick="sendStuAnswer('+data.data[i].tqid+',\'add\');">\
                    <p class="r-reply">OK</p>\
                </div><!--OK button for submit answer form -->\
											').trigger('create');
									} else {
									$("#stu_show_question").append('\
<div class="ui-grid-a q-block-1" style="margin:15px 0px 15px 0px;" id="s-cID-lID_q-questionID-'+data.data[i].tqid+'"><!--Replace questionID-1-->\
                <div class="ui-block-a" style="width:20%;">\
                    <img src="'+qimage+'" class="img-shadow img-radius" style="width:100%;"><!--Replace src"..."-->\
                    <p class="q-name">'+data.data[i].firstname+' '+data.data[i].lastname+'</p><!--Replace student name-->\
                </div>\
                <div class="ui-block-b"  style="width:80%;padding:10px 0px 0px 15px;">\
                    <div style="text-align:left;">\
                        <div class="q-question">\
                            <p class="no-p">'+data.data[i].question+'</p><!--Replace student question-->\
                        </div>\
                       \
                    </div>\
                    <div style="text-align:right;" id="s-questionID-'+data.data[i].tqid+'"><!--Replace id so have 2 part is questionID and 1(number of question)-->\
                        <form action="http://service.oppakub.me/SLC/stu_send_ask_question2.php" method="post" id="s-questionID-'+data.data[i].tqid+'-form"><!--Replace questionID-1-->\
                        <input type="hidden" name="tqid" value="'+data.data[i].tqid+'" />\
							<input type="hidden" name="tquid" value="'+stu_uid+'" />\
                            <div class="q-answer" id="s-questionID-'+data.data[i].tqid+'-div1-1" onclick="answer_edit(\'questionID\','+data.data[i].tqid+')"><!--For function answer_edit(x); x is answer number-->\
                                '+data.data[i].tqanswer+'<!--Replace question of teacher-->\
                                <img src="img/Editing-Edit-icon.png" width="10" style="display:inline;"/><!--Replace src="..."-->\
                            </div><!--Display answer before push is normal text-->\
\
                            <div class="q-answer" id="s-questionID-'+data.data[i].tqid+'-div1-2" style="display:none;"><!--Replace questionID-1-->\
                                <input type="text" data-clear-btn="true" name="s-cID-lID_r-questionID-input" id="s-questionID-'+data.data[i].tqid+'-input" value="'+data.data[i].tqanswer+'" placeholder="Answer" /><!--Replace questionID-1 and value-->\
                            </div><!--Display answer in input tag after push-->\
\
                            <div id="s-questionID-'+data.data[i].tqid+'-div2-1"><!--Replace questionID-1-->\
                                \
                            </div><!--Display time only before push-->\
\
                            <div id="s-questionID-'+data.data[i].tqid+'-div2-2" style="display:none;"><!--Replace questionID-1-->\
                                \
                                <div class="q-edit" onclick="sendStuAnswer('+data.data[i].tqid+',\'edit\');">OK</div><!--Replace questionID-1-->\
                                <div class="q-edit" onclick="answer_cancel(\'questionID\','+data.data[i].tqid+')">Cancel</div><!--Replace questionID and number(1)-->\
                            </div><!--Display time and OK button after push-->\
                        </form>\
                    </div>\
                </div>\
            </div>	').trigger('create');




									
									}
							}	
										
						} else {
							//toast(data.message);					
						}								
					}, //end success
						error: function(jqXHR, textStatus, errorThrown) {
							alert(jqXHR.responseText);
						}
			});
		} else {
			toast('Please connect to the internet.');
		}  
}



function sendStuAnswer(get_qid,mode) {
	var getForm = undefined;
	if(mode == "add") {
		getForm = $('#s-cID-lID_r-questionID-'+get_qid+'-form');
	} else {
		getForm = $('#s-questionID-'+get_qid+'-form');
	}
	
	getForm.submit(function(e)
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
							toast(data.message);		
							showQuestion();
							$(document).scrollTop( $('#s-cID-lID_r-questionID-'+(get_qid-1)).offset().top ); 
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
			getForm.submit();
			
}