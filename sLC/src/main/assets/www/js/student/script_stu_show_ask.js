//jQuery    
$( document ).ready(function() {		
	$(".header_title").html(stu_cname);	
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_lesson.php",
					type: 'POST',
					data:  "cid="+stu_cid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
								$("#stu_list_ask").append('<li><a href="student_course_ask_lesson.html" data-transition="none" name="'+data.data[i].lid+'">'+data.data[i].lname+' </a></li>'+"\n").trigger('create');     				
						}	
										
					} else {
						toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
	} else {
		toast('Please connect to the internet.');
	}
	
	$(document).on("click", "#stu_list_ask li a" ,function (event) {
		stu_lid = $(this).attr("name");
		stu_lname = $(this).text();
		//alert(send_eid);
	}); 
});