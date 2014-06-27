//jQuery    
$( document ).ready(function() {		
	$("#exam_add_choice_question").bind('click', function(){
			c = showChoiceQuestion(c,send_eid,"add");
	});	
	$("#exam_add_write_question").bind('click', function(){
			w = showWriteQuestion(w,send_eid,"add");
	});	

	$(document).on("click", ".btn_submit_choice_question" ,function (event) {
		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			//alert($(this).attr('choiceNo'));
			var qNo = $(this).attr('choiceNo');
			//Callback handler for form submit event
				$("#question_form-"+qNo).submit(function(e)
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
								$("#ex-c-question-"+qNo+" span.quest_title").text(qNo+". "+data.question);	
								$("#ex-c-question-"+qNo+" input[name='action']").val("edit");	
								$("#ex-c-question-"+qNo+" input[name='qNo']").val(data.qNo);		
								alert('Saved.');												
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
		} else {
			toast('Please connect to the internet');	
			return false;
		}
	}); 
	
	$(document).on("click", ".btn_submit_write_question" ,function (event) {
		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			//alert($(this).attr('choiceNo'));
			var qNo = $(this).attr('choiceNo');
			//Callback handler for form submit event
				$("#question_write_form-"+qNo).submit(function(e)
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
								$("#ex-w-question-"+qNo+" span.quest_title").text(qNo+". "+data.question);	
								$("#ex-w-question-"+qNo+" input[name='action']").val("edit");	
								$("#ex-w-question-"+qNo+" input[name='qNo']").val(data.qNo);		
								alert('Saved.');
								//alert(data.qNo);												
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
		} else {
			toast('Please connect to the internet');	
			return false;
		}		
	}); 
		
}); //end of jQuery


function showChoiceQuestion(c,send_eid,choice_mode,qNo,question,ch1,ch2,ch3,ch4,ans) {
	if(typeof(qNo)==='undefined') qNo = 0;
   	if(typeof(question)==='undefined') {
   		 question_head = c+". Question ";
   		 question = "";
   	} else {
   		question_head = c+". "+question;
   	}
   	if(typeof(ch1)==='undefined') ch1 = "";
   	if(typeof(ch2)==='undefined') ch2 = "";
   	if(typeof(ch3)==='undefined') ch3 = "";
   	if(typeof(ch4)==='undefined') ch4 = "";
   	if(typeof(ans)==='undefined') ans = 1;
	//$("#set_choice_question").append('<div data-role="collapsible" data-collapsed="false" data-content-theme="c" id="ex-c-question-'+c+'"> <h3>Question '+c+'</h3> </div>');
	var ans_1 = "";
	var ans_2 = "";
	var ans_3 = "";
	var ans_4 = "";
	if(ans == 4) {
		ans_4 = 'checked="checked"';
	} else if(ans == 3) {
		ans_3 = 'checked="checked"';
	} else if(ans == 2) {
		ans_2 = 'checked="checked"';
	} else {
		ans_1 = 'checked="checked"';
	}
		$("#set_choice_question").append('<div data-role="collapsible" data-collapsed="false" data-content-theme="c" id="ex-c-question-'+c+'">\
                        <h3><span class="quest_title">'+question_head+'</span></h3>\
                        <form action="http://service.oppakub.me/SLC/edit_tea_quest_choice.php" method="post" id="question_form-'+c+'">\
                        <input type="hidden" name="action" value="'+choice_mode+'" />\
                        <input type="hidden" name="eid" value="'+send_eid+'" />\
                        <input type="hidden" name="qNo" value="'+qNo+'" />\
                            <label for="ex-c-question-input-'+c+'">Question:</label>\
                            <input type="text" name="ex-c-question-input" id="ex-c-question-input-'+c+'" value="'+question+'" placeholder="Question"/>\
\
                            <div data-role="fieldcontain" id="ex-c-question-choice-'+c+'">\
                                <label for="ex-c-question-choice-1-input-'+c+'" style="width:10px;">1.</label>\
                                <input type="text" name="ex-c-question-choice-1-input" id="ex-c-question-choice-1-input-'+c+'" value="'+ch1+'" placeholder="Choice 1"/>\
                            </div>\
                            <div data-role="fieldcontain" id="ex-c-question-choice-2-'+c+'">\
                                <label for="ex-c-question-choice-2-input-'+c+'" style="width:10px;">2.</label>\
                                <input type="text" name="ex-c-question-choice-2-input" id="ex-c-question-choice-2-input-'+c+'" value="'+ch2+'" placeholder="Choice 2"/>\
                            </div>\
                            <div data-role="fieldcontain" id="ex-c-question-choice-3-'+c+'">\
                                <label for="ex-c-question-choice-3-input-'+c+'" style="width:10px;">3.</label>\
                                <input type="text" name="ex-c-question-choice-3-input" id="ex-c-question-choice-3-input-'+c+'" value="'+ch3+'" placeholder="Choice 3"/>\
                            </div>\
                            <div data-role="fieldcontain" id="ex-c-question-choice-4-'+c+'">\
                                <label for="ex-c-question-choice-4-input-'+c+'" style="width:10px;">4.</label>\
                                <input type="text" name="ex-c-question-choice-4-input" id="ex-c-question-choice-4-input-'+c+'" value="'+ch4+'" placeholder="Choice 4"/>\
                            </div>\
                            <fieldset data-role="controlgroup" data-type="horizontal">\
                                <legend>Choose true answer:</legend>\
                                <input type="radio" name="ex-c-question-radio" id="ex-c-question-choice-1-radio-'+c+'" value="1" '+ans_1+' />\
                                <label for="ex-c-question-choice-1-radio-'+c+'">1</label>\
\
                                <input type="radio" name="ex-c-question-radio" id="ex-c-question-choice-2-radio-'+c+'" value="2" '+ans_2+' />\
                                <label for="ex-c-question-choice-2-radio-'+c+'">2</label>\
\
                                <input type="radio" name="ex-c-question-radio" id="ex-c-question-choice-3-radio-'+c+'" value="3" '+ans_3+' />\
                                <label for="ex-c-question-choice-3-radio-'+c+'">3</label>\
\
                                <input type="radio" name="ex-c-question-radio" id="ex-c-question-choice-4-radio-'+c+'" value="4" '+ans_4+' />\
                                <label for="ex-c-question-choice-4-radio-'+c+'">4</label>\
                            </fieldset>\
                            <input type="submit" value="Save" class="btn_submit_choice_question" choiceNo="'+c+'" data-mini="true"/>\
                        </form>\
                    </div><!--Do repeat for any choice question-->').trigger( "create" );
    	
    	$( "#set_choice_question" ).collapsibleset( "refresh" );		
    	$("#exam_add_choice_question").detach().appendTo( "#set_choice_question" );
    	c++;
    	
    	return c;
    
}

function showWriteQuestion(c,send_eid,write_mode,qNo,question,ans) {
	if(typeof(qNo)==='undefined') qNo = 0;
   	if(typeof(question)==='undefined') {
   		 question_head = c+". Question ";
   		 question = "";
   	} else {
   		question_head = c+". "+question;
   	}
   	if(typeof(ans)==='undefined') ans = "";	
   	
		$("#set_write_question").append('<div data-role="collapsible" data-collapsed="false" data-content-theme="c" id="ex-w-question-'+c+'">\
                        <h3><span class="quest_title">'+question_head+'</span></h3>\
                        <form action="http://service.oppakub.me/SLC/edit_tea_quest_write.php" method="post" id="question_write_form-'+c+'">\
                        <input type="hidden" name="action" value="'+write_mode+'" />\
                        <input type="hidden" name="eid" value="'+send_eid+'" />\
                        <input type="hidden" name="qNo" value="'+qNo+'" />\
                            <label for="ex-w-question-'+c+'-input">Question:</label>\
                            <input type="text" name="ex-w-question-input" id="ex-w-question-'+c+'-input" value="'+question+'" placeholder="Question"/>\
                            <label for="ex-w-answer-'+c+'-input">Answer:</label>\
                            <input type="text" name="ex-w-answer-input" id="ex-w-answer-'+c+'-input" value="'+ans+'" placeholder="Answer"/>\
\
                            <input type="submit" value="Submit" class="btn_submit_write_question" choiceNo="'+c+'" data-mini="true"/>\
                        </form>\
                    </div><!--Do repeat for any writing question-->').trigger( "create" );
    	
    	$( "#set_choice_question" ).collapsibleset( "refresh" );		
    	$("#exam_add_write_question").detach().appendTo( "#set_write_question" );
    	c++;
    	
    	return c;
    
}