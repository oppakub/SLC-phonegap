
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
                                    if(data.data[i].cmactive == "N"){ //yellow (New member)
                                        $("#tca_student_user-s-list").append('<li onclick="user_change_state($(this),this)" data-icon="info" data-split-theme="e" data-theme="e" id="member_'+send_courseid+'_'+data.data[i].uid+'"><a href="#"><img src="'+data.data[i].avatar+'" class="img-radius"><h3>'+data.data[i].firstname+'</h3><p><span class="status">Pending</span></p></a><a href="#" data-theme="e">Notification</a></li>');
                                    } else if(data.data[i].cmactive == "Y"){ //green (Allow)
                                        $("#tca_student_user-s-list").append('<li onclick="user_change_state($(this),this)" data-icon="check" data-split-theme="g" data-theme="g" id="member_'+send_courseid+'_'+data.data[i].uid+'"><a href="#"><img src="'+data.data[i].avatar+'" class="img-radius"><h3>'+data.data[i].firstname+'</h3><p><span class="status">Joined</span></p></a><a href="#" data-theme="g">Notification</a></li>');
                                    } else { //Red (Ban)
                                        $("#tca_student_user-s-list").append('<li onclick="user_change_state($(this),this)" data-icon="minus" data-split-theme="k" data-theme="k" id="member_'+send_courseid+'_'+data.data[i].uid+'"><a href="#"><img src="'+data.data[i].avatar+'" class="img-radius"><h3>'+data.data[i].firstname+'</h3><p><span class="status">Blocked</span></p></a><a href="#" data-theme="k">Notification</a></li>');
                                    }
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

function statusMember(x,y){
var member_id = x.substr(x.lastIndexOf('_')+1);
		$.ajax({
			url: "http://service.oppakub.me/SLC/change_status_member_in_course.php",
			type: 'POST',
			data:  "course_id="+send_courseid+"&member_id="+member_id+"&mode="+y,
			dataType : "json",
			async: false,
			success: function(data, textStatus, jqXHR){
                if(data.status == "OK") {

                } else {

			}
			}, //end success
			    error: function(jqXHR, textStatus, errorThrown) {
					alert(jqXHR.responseText);
			    } //end error
			});
}
