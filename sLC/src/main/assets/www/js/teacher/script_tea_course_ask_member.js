$( document ).ready(function() {
	$.ajax({
		url: "http://service.oppakub.me/SLC/show_member_in_ask_course.php",
		type: 'POST',
		data:  "cid="+send_courseid,
		dataType : "json",
		async: false,
		success: function(data, textStatus, jqXHR){
             if(data.status == "OK") {
                var data_len = data.data.length;
                for(var i =0;i<data_len;i++) {
                    $("#tca_student_user-a-content").append('<div class="ui-grid-a" id="tca_studentID-'+i+'" style="border-bottom: 2px solid #222;">\
                                                                <div class="ui-block-a" id="tca_studentID-'+send_courseid+'-'+data.data[i].uid+'" style="width:82%;background-color:#444;" onclick="user_active($(this),this.id)">\
                                                                    <div class="ui-grid-a">\
                                                                        <div class="ui-block-a" style="width:20%;padding:5px;">\
                                                                            <img src="'+data.data[i].avatar+'" style="width:100%;border-radius: 5px;">\
                                                                        </div>\
                                                                        <div class="ui-block-b" style="width:80%;color:#eee;">\
                                                                            <div style="margin:5px 0px 0px 5px;">\
                                                                                <p class="no-p">'+data.data[i].firstname+'</p>\
                                                                            </div>\
                                                                        </div>\
                                                                      </div>\
                                                                 </div>\
                                                                 <div class="ui-block-b" onclick="sendQuestion(this.id)" id="sendQuestion_'+send_courseid+'_'+data.data[i].uid+'" style="width:18%;cursor:pointer;text-align:center;">\
                                                                     <img src="../img/send_mail.png" style="width:80%;">\
                                                                 </div>\
                                                              </div>');
                }
             } else {
                 toast(data.message);
             }
	}, //end success
		error: function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.responseText);
		} //end error
	});
});

function sendQuestion(x){
    var sendQUid = x.substr(x.lastIndexOf('_')+1);
    var quesNum = ($("#askID_question_input").attr('name')).substr(($("#askID_question_input").attr('name')).lastIndexOf('_')+1);
         $.ajax({
         	url: "http://service.oppakub.me/SLC/send_ask_in_course.php",
         	type: 'POST',
         	data:  "tquid="+sendQUid+"&qNo="+quesNum,
         	dataType : "json",
         	async: false,
         	success: function(data, textStatus, jqXHR){
                 if(data.status == "OK") {
                    alert(data.message);
                 } else {
                     toast(data.message);
                 }
         	}, //end success
         	error: function(jqXHR, textStatus, errorThrown) {
         		alert(jqXHR.responseText);
         	} //end error
         });
}

function broadcastQuestion(){
var quesNumB = ($("#askID_question_input").attr('name')).substr(($("#askID_question_input").attr('name')).lastIndexOf('_')+1);
         $.ajax({
         	url: "http://service.oppakub.me/SLC/broadcast_ask_in_course.php",
         	type: 'POST',
         	data: "cid="+send_courseid+"&qNo="+quesNumB,
         	dataType : "json",
         	async: false,
         	success: function(data, textStatus, jqXHR){
                 if(data.status == "OK") {
                    alert(data.message);
                 } else {
                     toast(data.message);
                 }
         	}, //end success
         	error: function(jqXHR, textStatus, errorThrown) {
         		alert(jqXHR.responseText);
         	} //end error
         });
}

function showQuestionReply(x){
    var replyuid = x.substr(x.lastIndexOf('-')+1);
         $.ajax({
         	url: "http://service.oppakub.me/SLC/show_reply_ask_in_course.php",
         	type: 'POST',
         	data: "uid="+replyuid+"&cid="+send_courseid,
         	dataType : "json",
         	async: false,
         	success: function(data, textStatus, jqXHR){
                 if(data.status == "OK") {
                   $("#tca_studentID_img").attr('src',data.data[0].avatar);
                    $("#tca_studentID_name").html(data.data[0].firstname);
                    $("#tca_studentID_question").empty();
                 for(var i=0;i<data.data.length;i++){
                    if(data.data[i].tqanswer){
                        $("#tca_studentID_question").append('<div style="margin-top:5px;">\
                                                                   <div style="background-color: #aaa;position: relative;left: -15px;padding: 5px;">'+data.data[i].question+'</div>\
                                                                    <p style="border-bottom: 1px solid #aaa;padding-bottom: 5px;">'+data.data[i].tqanswer+'</p>\
                                                              </div>');
                    }else {
                        $("#tca_studentID_question").append('<div style="margin-top:5px;">\
                                                                  <div style="background-color: #aaa;position: relative;left: -15px;padding: 5px;">'+data.data[i].question+'</div>\
                                                                  <p style="border-bottom: 1px solid #aaa;padding-bottom: 5px;">...Waiting answer</p>\
                                                              </div>');
                    }
                 }
                 } else {
                     toast(data.message);
                 }
         	}, //end success
         	error: function(jqXHR, textStatus, errorThrown) {
         		alert(jqXHR.responseText);
         	} //end error
         });
}