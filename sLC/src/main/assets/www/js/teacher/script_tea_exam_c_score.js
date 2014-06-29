//jQuery    
$( document ).ready(function() {
	$(".header_title").html(edit_cname);
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/tea_show_exam_score_choice.php",
					type: 'POST',
					data:  "cid="+send_courseid+"&eid="+send_eid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
							$("#teacher_course_exam_c-score-table").append('\
							<tr>\
                    <td>'+(i+1)+'</td>\
                    <td>'+data.data[i].firstname+' '+data.data[i].lastname+'</td>\
                    <td>'+data.data[i].exc_cscore+'</td>\
                </tr>\
							').trigger('create');
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
});