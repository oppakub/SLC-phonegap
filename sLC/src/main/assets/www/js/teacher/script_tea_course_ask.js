$( document ).ready(function() {
  		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/show_ask_in_course.php",
						type: 'POST',
						data:  "cid="+send_courseid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
                            if(data.status == "OK") {
                                var data_len = data.data.length;
                                for(var i =0;i<data_len;i++) {
                                   $("#askID_question_ul").prepend('<li id="askQuestion_'+send_courseid+'_'+data.data[i].qNo+'"><a href="#" id="askQuestion2_'+send_courseid+'_'+data.data[i].qNo+'" onclick="question_select($(this),this.id)">'+data.data[i].question+'</a><a href="#" data-theme="k" onclick="deleteQuestion(this.id)" id="askQuestion_del_'+data.data[i].qNo+'">Del</a></li>');
                                }
                            }	else {
                                toast(data.message);
                            }
					    }, //end success
						error: function(jqXHR, textStatus, errorThrown) {
							alert(jqXHR.responseText);
						} //end error
			});
		} else {
			 toast('Please connect to the internet');
		}
});

function addNewQuestion(){
     var textQuestion = document.getElementById("askID_question_quick_input").value;
     if(textQuestion != ""){
         $.ajax({
         	url: "http://service.oppakub.me/SLC/add_ask_in_course.php",
         	type: 'POST',
         	data:  "cid="+send_courseid+"&question="+textQuestion,
         	dataType : "json",
         	async: false,
         	success: function(data, textStatus, jqXHR){
                 if(data.status == "OK") {
                     $("#askID_question_ul").prepend('<li id="askQuestion_'+send_courseid+'_'+data.data.qNo+'"><a href="#" id="askQuestion2_'+send_courseid+'_'+data.data.qNo+'" onclick="question_select($(this),this.id)">'+data.data.question+'</a><a href="#" data-theme="k" onclick="deleteQuestion(this.id)" id="askQuestion_del_'+data.data.qNo+'">Del</a></li>').listview('refresh');
                     document.getElementById("askID_question_quick_input").value = "";
                 } else {
                     toast(data.message);
                 }
         	}, //end success
         	error: function(jqXHR, textStatus, errorThrown) {
         		alert(jqXHR.responseText);
         	} //end error
         });
     } else {
         toast("Please input your question.");
     }
 }

 function deleteQuestion(x){
     var ask_q_no = x.substr(x.lastIndexOf('_')+1);
         $.ajax({
         	url: "http://service.oppakub.me/SLC/delete_ask_in_course.php",
         	type: 'POST',
         	data:  "qNo="+ask_q_no,
         	dataType : "json",
         	async: false,
         	success: function(data, textStatus, jqXHR){
                 if(data.status == "OK") {
                     $("#askQuestion_"+send_courseid+"_"+ask_q_no).remove();
                     $("#askID_question_ul").listview('refresh');
                 } else {
                     toast(data.message);
                 }
         	}, //end success
         	error: function(jqXHR, textStatus, errorThrown) {
         		alert(jqXHR.responseText);
         	} //end error
         });
}
