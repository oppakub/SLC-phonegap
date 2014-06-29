//jQuery    
$( document ).ready(function() {
	//alert(val_quest_lid);
	//alert(val_quest_name);
	//alert(tea_uid);
	$(".lesson_title").html(val_quest_name);		
	showTeaAskQuestion();
	$("#tea_question_refresh").click(function() {
		toast("refreshing...");
		showTeaAskQuestion();
	});
	
});

function showTeaAskQuestion() {
	   var chk_connect = checkConnection();
	   var areply = "";
	   var aquestion = "";
	   var imgsrc = "";
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
									$("#show_ask_stu_question_box").append('<hr><p style="color:#777;text-align:right;">'+data.data[i].date_ask+'</p>');
            						var data_sub_len = data.data[i].data.length;	
            						for(var j =0;j<data_sub_len;j++) {	
            								if(data.data[i].data[j].avatar == "pic/avatar/default.png") {
            									imgsrc = "../img/icon-user-default.png";
            								} else {
            								 	imgsrc = data.data[i].data[j].avatar;
            								}
											//teacher don't answer yet
											if(data.data[i].data[j].areply == null) {
												aquestion = '<div class="ui-grid-a rType-question" id="cID-lID_r-questionID-'+data.data[i].data[j].aid+'"> \
					<div class="ui-block-a" style="width:80%;">\
						<div class="ui-grid-a r-box"> \
							<div class="ui-block-a" style="width:20%;padding: 2px;"> \
								<img src="'+imgsrc+'" class="img-radius r-img"> \
							</div><!--Image of student user--> \
							<div class="ui-block-b" style="width:80%;padding:2px;">\
								<p class="no-p r-name">'+data.data[i].data[j].aqfname+' '+data.data[i].data[j].aqlname+'<span class="q-time">'+data.data[i].data[j].aqdate_ask+'</span></p>\
								<p class="r-question">'+data.data[i].data[j].aquestion+'</p><!--Replace question-->\
							</div>\
						</div>';
												areply = '<div class="rType-form" style="display:none;">\
							<form action="http://service.oppakub.me/SLC/tea_send_ask_question.php" method="post" id="cID-lID_r-questionID-'+data.data[i].data[j].aid+'-form">\
							<input type="hidden" name="aid" value="'+data.data[i].data[j].aid+'" />\
							<input type="hidden" name="aruid" value="'+tea_uid+'" />\
								<input type="text" data-clear-btn="true" name="cID-lID_r-questionID-input" id="cID-lID_r-questionID-'+data.data[i].data[j].aid+'-input" value="" placeholder="Answer" onblur="answer_blur(\'questionID\','+data.data[i].data[j].aid+')"/>\
							</form><!--Replace questionID-1 both id of form and input-->\
						</div><!--Form for type answer you must define right "id" and define right attribute of answer_blur() function is "questionID" and number of question in list-->\
					</div>\
					<div class="ui-block-b rType-b-1" style="width:20%;cursor:pointer;" onclick="answer_reply(\'questionID\','+data.data[i].data[j].aid+')">\
						<p class="r-reply">Reply</p>\
					</div><!--Reply button for show input tag for answer question and show ok button for submit form answer-->\
					<div class="ui-block-b rType-b-2" style="width:20%;cursor:pointer;display:none;" onclick="sendTeaAnswer('+data.data[i].data[j].aid+',\'add\');">\
						<p class="r-reply">OK</p>\
					</div><!--OK button for submit answer form -->\
				</div><!--Question is not answered--><!--Repeat this for question is not answered-->';
											} else {
												aquestion = '<div class="ui-grid-a q-block-1" style="margin:15px 0px 15px 0px;" id="cID-lID_q-questionID-'+data.data[i].data[j].aid+'">\
					<div class="ui-block-a" style="width:20%;">\
						<img src="'+imgsrc+'" class="img-shadow img-radius" style="width:100%;"><!--Replace src"..."-->\
						<p class="q-name">'+data.data[i].data[j].aqfname+' '+data.data[i].data[j].aqlname+'</p><!--Replace student name-->\
					</div>\
					<div class="ui-block-b"  style="width:80%;padding:10px 0px 0px 15px;">\
						<div style="text-align:left;">\
							<div class="q-question">\
								<p class="no-p">'+data.data[i].data[j].aquestion+'</p><!--Replace student question-->\
							</div>\
							<p class="q-time">'+data.data[i].data[j].aqdate_ask+'</p><!--Replace time is ask by student-->\
						</div>';
												areply = '<div style="text-align:right;" id="questionID-'+data.data[i].data[j].aid+'">\
							<form action="http://service.oppakub.me/SLC/tea_send_ask_question.php" method="post" id="questionID-'+data.data[i].data[j].aid+'-form">\
							<input type="hidden" name="aid" value="'+data.data[i].data[j].aid+'" />\
							<input type="hidden" name="aruid" value="'+tea_uid+'" />\
								<div class="q-answer" id="questionID-'+data.data[i].data[j].aid+'-div1-1" onclick="answer_edit(\'questionID\','+data.data[i].data[j].aid+')">\
									'+data.data[i].data[j].areply+'<!--Replace question of teacher-->\
									<img src="img/Editing-Edit-icon.png" width="10" style="display:inline;"/><!--Replace src="..."-->\
								</div><!--Display answer before push is normal text-->\
	\
								<div class="q-answer" id="questionID-'+data.data[i].data[j].aid+'-div1-2" style="display:none;">\
									<input type="text" data-clear-btn="true" name="cID-lID_r-questionID-input" id="questionID-'+data.data[i].data[j].aid+'-input" value="'+data.data[i].data[j].areply+'" placeholder="Answer" /><!--Replace questionID-1 and value-->\
								</div><!--Display answer in input tag after push-->\
	\
								<div id="questionID-'+data.data[i].data[j].aid+'-div2-1">\
									<p class="q-time" style="display:inline-block;">'+data.data[i].data[j].ardate_ask+'</p>\
								</div><!--Display time only before push-->\
	\
								<div id="questionID-'+data.data[i].data[j].aid+'-div2-2" style="display:none;">\
									<p class="q-time" style="display:inline-block;margin-right:5px;">'+data.data[i].data[j].ardate_ask+'</p>\
									<div class="q-edit" onclick="sendTeaAnswer('+data.data[i].data[j].aid+',\'edit\');">OK</div>\
									<div class="q-edit" onclick="answer_cancel(\'questionID\','+data.data[i].data[j].aid+')">Cancel</div>\
								</div><!--Display time and OK button after push-->\
							</form>\
						</div>\
					</div>\
				</div><!--Question is answered--><!--Repeat this for question is answered-->';
										
											}
										
											$("#show_ask_stu_question_box").append(aquestion + areply);
            						}
							}	
										
						} else {
							//toast(data.message);					
						}								
					}, //end success
						error: function(jqXHR, textStatus, errorThrown) {
							alert(jqXHR.responseText);
						} //end error      
						
			});
		} else {
			toast('Please connect to the internet.');
		}  
}

function sendTeaAnswer(get_qid,mode) {
	var getForm = undefined;
	if(mode == "add") {
		getForm = $('#cID-lID_r-questionID-'+get_qid+'-form');
	} else {
		getForm = $('#questionID-'+get_qid+'-form');
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
							showTeaAskQuestion();	
							$(document).scrollTop( $('#cID-lID_q-questionID-'+(get_qid-1)).offset().top ); 
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