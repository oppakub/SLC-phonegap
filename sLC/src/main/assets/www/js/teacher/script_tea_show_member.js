$( document ).ready(function() {
  		var chk_connect = checkConnection();
		if(chk_connect != "no") {
			$.ajax({
						url: "http://service.oppakub.me/SLC/show_member_in_course.php",
						type: 'POST',
						data:  "cid="+send_courseid,
						dataType : "json",
						async: false,
						success: function(data, textStatus, jqXHR){
						if(data.status == "OK") {
							var data_len = data.data.length;
							for(var i =0;i<data_len;i++) {
                            	$("#tca_student_user-s-list").append('<li onclick="user_change_state($(this))"><a href="#"><img src="'+data.data[i].avatar+'" class="img-radius"><h3>'+data.data[i].firstname+'</h3><p>Online <span class="status"></span></p></a><a href="#">Notification</a></li>');
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