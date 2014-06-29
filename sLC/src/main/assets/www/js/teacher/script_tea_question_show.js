//jQuery    
$( document ).ready(function() {
	//alert(val_quest_lid);
	//alert(val_quest_name);
	$(".lesson_title").html(val_quest_name);	
	showTeaAskQuestion();
});

function showTeaAskQuestion() {
	   var chk_connect = checkConnection();
	   var areply = "";
	   var aquestion = "";
		if(chk_connect != "no") {
		$("#show_ask_stu_question_box").empty();
		//toast('refresh');
			$.ajax({
						url: "http://service.oppakub.me/SLC/tea_show_ask_question.php",
						type: 'POST',
						data:  "lid="+val_quest_lid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							var data_len = data.data.length;					
							for(var i =0;i<data_len;i++) {								
										//teacher don't answer yet
										if(data.data[i].areply == null) {
											aquestion = '<div class="ui-grid-a rType-question" id="cID-lID_r-questionID-'+data.data[i].aid+'"> \
                <div class="ui-block-a" style="width:80%;">\
                    <div class="ui-grid-a r-box"> \
                        <div class="ui-block-a" style="width:20%;padding: 2px;"> \
                            <img src="../img/icon-user-default.png" class="img-radius r-img"> \
                        </div><!--Image of student user--> \
                        <div class="ui-block-b" style="width:80%;padding:2px;">\
                            <p class="no-p r-name">'+data.data[i].aquid+'<span class="q-time">'+data.data[i].aqdate+'</span></p>\
                            <p class="r-question">'+data.data[i].aquestion+'</p><!--Replace question-->\
                        </div>\
                    </div>';
											areply = '<div class="rType-form" style="display:none;">\
                        <form action="#" method="post" id="cID-lID_r-questionID-'+data.data[i].aid+'-form">\
                            <input type="text" data-clear-btn="true" name="cID-lID_r-questionID-1-input" id="cID-lID_r-questionID-1-input" value="" placeholder="Answer" onblur="answer_blur(\'questionID\',1)"/>\
                        </form><!--Replace questionID-1 both id of form and input-->\
                    </div><!--Form for type answer you must define right "id" and define right attribute of answer_blur() function is "questionID" and number of question in list-->\
                </div>\
                <div class="ui-block-b rType-b-1" style="width:20%;cursor:pointer;" onclick="answer_reply(\'questionID\',1)">\
                    <p class="r-reply">Reply</p>\
                </div><!--Reply button for show input tag for answer question and show ok button for submit form answer-->\
                <div class="ui-block-b rType-b-2" style="width:20%;cursor:pointer;display:none;" onclick="$(\'#cID-lID_r-questionID-1-form\').submit();">\
                    <p class="r-reply">OK</p>\
                </div><!--OK button for submit answer form -->\
            </div><!--Question is not answered--><!--Repeat this for question is not answered--><hr>';
										} else {
											aquestion = '<div class="ui-grid-a q-block-1" style="margin:15px 0px 15px 0px;" id="cID-lID_q-questionID-'+data.data[i].aid+'">\
                <div class="ui-block-a" style="width:20%;">\
                    <img src="../img/icon-user-default.png" class="img-shadow img-radius" style="width:100%;"><!--Replace src"..."-->\
                    <p class="q-name">'+data.data[i].aquid+'</p><!--Replace student name-->\
                </div>\
                <div class="ui-block-b"  style="width:80%;padding:10px 0px 0px 15px;">\
                    <div style="text-align:left;">\
                        <div class="q-question">\
                            <p class="no-p">'+data.data[i].aquestion+'</p><!--Replace student question-->\
                        </div>\
                        <p class="q-time">11.30 AM</p><!--Replace time is ask by student-->\
                    </div>';
											areply = '<div style="text-align:right;" id="questionID-'+data.data[i].aid+'">\
                        <form action="#" method="post" id="questionID-'+data.data[i].aid+'-form">\
                            <div class="q-answer" id="questionID-'+data.data[i].aid+'-div1-1" onclick="answer_edit(\'questionID\','+data.data[i].aid+')">\
                                '+data.data[i].areply+'<!--Replace question of teacher-->\
                                <img src="img/Editing-Edit-icon.png" width="10" style="display:inline;"/><!--Replace src="..."-->\
                            </div><!--Display answer before push is normal text-->\
\
                            <div class="q-answer" id="questionID-'+data.data[i].aid+'-div1-2" style="display:none;">\
                                <input type="text" data-clear-btn="true" name="questionID-'+data.data[i].aid+'-input" id="questionID-'+data.data[i].aid+'-input" value="'+data.data[i].areply+'" placeholder="Answer" /><!--Replace questionID-1 and value-->\
                            </div><!--Display answer in input tag after push-->\
\
                            <div id="questionID-'+data.data[i].aid+'-div2-1">\
                                <p class="q-time" style="display:inline-block;">11.31 AM</p>\
                            </div><!--Display time only before push-->\
\
                            <div id="questionID-'+data.data[i].aid+'-div2-2" style="display:none;">\
                                <p class="q-time" style="display:inline-block;margin-right:5px;">11.31 AM</p>\
                                <div class="q-edit" onclick="$(\'#questionID-'+data.data[i].aid+'-form\').submit();">OK</div>\
                                <div class="q-edit" onclick="answer_cancel(\'questionID\','+data.data[i].aid+')">Cancel</div>\
                            </div><!--Display time and OK button after push-->\
                        </form>\
                    </div>\
                </div>\
            </div><!--Question is answered--><!--Repeat this for question is answered--><hr>';
										
										}
										
										
                    
										
										$("#show_ask_stu_question_box").append(aquestion + areply);
							}	
										
						} else {
							//toast(data.message);					
						}								
					}, //end success
						error: function(jqXHR, textStatus, errorThrown) {
							alert(jqXHR.responseText);
						}, //end error      
						complete: function() {
						setTimeout(showTeaAskQuestion,15000); //After completion of request, time to redo it after a second
					 }   
			});
		} else {
			toast('Please connect to the internet.');
		}  
}