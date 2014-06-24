$( document ).ready(function() {	
	$("#teacher_footer_addButton").click(function() {
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$("#tea_con_list").append('<li><input type="text" name="coursename" id="tea_add_new_course" value=""  placeholder="New Course" data-clear-btn="true"/>  <input id="teacher_btn_add_course" type="button" value="Add" /></li>'+"\n").listview('refresh'); 
	} else {
		toast('Please connect to the internet');
	}
	});
	
	$('#tea_con_list').on('click', '#teacher_btn_add_course', function() {
       var coursename = $("#tea_add_new_course").val();
		   $.ajax({
					url: "http://service.oppakub.me/SLC/tea_add_course.php",
					type: 'POST',
					data:  "coursename="+coursename+"&tea_uid="+stu_uid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						alert("done!");
						//$.mobile.changePage('teacher2.html', "{transition: 'pop', role: 'dialog'}");	
						$(location).attr('href','teacher.html');
					
					} else {
						toast(data.message);					
					}								
				}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					} //end error         
		});
    });
    
    
});