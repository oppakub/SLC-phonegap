//jQuery    
$( document ).ready(function() {		
	$("#hw_add_choice_question").bind('click', function(){
			c = showChoiceQuestion(c,send_hid,"add");
	});	
	$("#hw_add_write_question").bind('click', function(){
			w = showWriteQuestion(w,send_hid,"add");
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
								$("#hw-c-question-"+qNo+" span.quest_title").text(qNo+". "+data.question);	
								$("#hw-c-question-"+qNo+" input[name='action']").val("edit");	
								$("#hw-c-question-"+qNo+" input[name='qNo']").val(data.qNo);		
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
								$("#hw-w-question-"+qNo+" span.quest_title").text(qNo+". "+data.question);	
								$("#hw-w-question-"+qNo+" input[name='action']").val("edit");	
								$("#hw-w-question-"+qNo+" input[name='qNo']").val(data.qNo);		
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


function showChoiceQuestion(c,send_hid,choice_mode,qNo,question,ch1,ch2,ch3,ch4,ans) {
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
		$("#set_choice_question").append('<div data-role="collapsible" data-collapsed="false" data-content-theme="c" id="hw-c-question-'+c+'">\
                        <h3><span class="quest_title">'+question_head+'</span></h3>\
                        <form action="http://service.oppakub.me/SLC/edit_tea_hw_quest_choice.php" method="post" id="question_form-'+c+'">\
                        	<input type="hidden" name="action" value="'+choice_mode+'" />\
                        <input type="hidden" name="hid" value="'+send_hid+'" />\
                        <input type="hidden" name="qNo" value="'+qNo+'" />\
                            <label for="hw-c-question-'+c+'-input">Question:</label>\
                            <input type="text" name="hw-c-question-input" id="hw-c-question-'+c+'-input" value="'+question+'" placeholder="Question"/>\
\
                            <div data-role="fieldcontain" id="hw-c-question-'+c+'-choice-1">\
                                <label for="hw-c-question-'+c+'-choice-1-input" style="width:10px;">1.</label>\
                                <input type="text" name="hw-c-question-choice-1-input" id="hw-c-question-'+c+'-choice-1-input" value="'+ch1+'" placeholder="Choice 1"/>\
                            </div>\
                            <div data-role="fieldcontain" id="hw-c-question-'+c+'-choice-2">\
                                <label for="hw-c-question-'+c+'-choice-2-input" style="width:10px;">2.</label>\
                                <input type="text" name="hw-c-question-choice-2-input" id="hw-c-question-'+c+'-choice-2-input" value="'+ch2+'" placeholder="Choice 2"/>\
                            </div>\
                            <div data-role="fieldcontain" id="hw-c-question-'+c+'-choice-3">\
                                <label for="hw-c-question-'+c+'-choice-3-input" style="width:10px;">3.</label>\
                                <input type="text" name="hw-c-question-choice-3-input" id="hw-c-question-'+c+'-choice-3-input" value="'+ch3+'" placeholder="Choice 3"/>\
                            </div>\
                            <div data-role="fieldcontain" id="hw-c-question-'+c+'-choice-4">\
                                <label for="hw-c-question-'+c+'-choice-4-input" style="width:10px;">4.</label>\
                                <input type="text" name="hw-c-question-choice-4-input" id="hw-c-question-'+c+'-choice-4-input" value="'+ch4+'" placeholder="Choice 4"/>\
                            </div>\
                            <fieldset data-role="controlgroup" data-type="horizontal">\
                                <legend>Choose true answer:</legend>\
                                <input type="radio" name="hw-c-question-radio" id="hw-c-question-'+c+'-choice-1-radio" value="1" '+ans_1+'  />\
                                <label for="hw-c-question-'+c+'-choice-1-radio">1</label>\
\
                                <input type="radio" name="hw-c-question-radio" id="hw-c-question-'+c+'-choice-2-radio" value="2"  '+ans_2+'  />\
                                <label for="hw-c-question-'+c+'-choice-2-radio">2</label>\
\
                                <input type="radio" name="hw-c-question-radio" id="hw-c-question-'+c+'-choice-3-radio" value="3"  '+ans_3+'  />\
                                <label for="hw-c-question-'+c+'-choice-3-radio">3</label>\
\
                                <input type="radio" name="hw-c-question-radio" id="hw-c-question-'+c+'-choice-4-radio" value="4"  '+ans_4+'  />\
                                <label for="hw-c-question-'+c+'-choice-4-radio">4</label>\
                            </fieldset>\
                            <input type="submit" value="Save" class="btn_submit_choice_question" choiceNo="'+c+'"  data-mini="true"/>\
                        </form>\
                    </div><!--Do repeat for any choice question-->').trigger( "create" );
    	
    	$( "#set_choice_question" ).collapsibleset( "refresh" );		
    	$("#hw_add_choice_question").detach().appendTo( "#set_choice_question" );
    	c++;
    	
    	return c;
    
}

function showWriteQuestion(c,send_hid,write_mode,qNo,question,ans) {
	if(typeof(qNo)==='undefined') qNo = 0;
   	if(typeof(question)==='undefined') {
   		 question_head = c+". Question ";
   		 question = "";
   	} else {
   		question_head = c+". "+question;
   	}
   	if(typeof(ans)==='undefined') ans = "";	
   	
		$("#set_write_question").append('<div data-role="collapsible" data-collapsed="false" data-content-theme="c" id="hw-w-question-'+c+'">\
                        <h3><span class="quest_title">'+question_head+'</span></h3>\
                        <form action="http://service.oppakub.me/SLC/edit_tea_hw_quest_write.php" method="post" id="question_write_form-'+c+'">\
                        <input type="hidden" name="action" value="'+write_mode+'" />\
                        <input type="hidden" name="hid" value="'+send_hid+'" />\
                        <input type="hidden" name="qNo" value="'+qNo+'" />\
                            <label for="hw-w-question-'+c+'-input">Question:</label>\
                            <input type="text" name="hw-w-question-input" id="hw-w-question-'+c+'-input" value="'+question+'" placeholder="Question"/>\
                            <label for="hw-w-answer-'+c+'-input">Answer:</label>\
                            <input type="text" name="hw-w-answer-input" id="hw-w-answer-'+c+'-input" value="'+ans+'" placeholder="Answer"/>\
\
                            <input type="submit" value="Save" class="btn_submit_write_question" choiceNo="'+c+'" data-mini="true"/>\
                        </form>\
                    </div><!--Do repeat for any writing question-->').trigger( "create" );
    	
    	$( "#set_write_question" ).collapsibleset( "refresh" );		
    	$("#hw_add_write_question").detach().appendTo( "#set_write_question" );
    	c++;
    	
    	return c;
    
}