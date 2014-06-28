//jQuery    
$( document ).ready(function() {	
	$("#header_title").html(stu_cname);
	
	var chk_connect = checkConnection();
	if(chk_connect != "no") {
		$.ajax({
					url: "http://service.oppakub.me/SLC/chk_stu_course_book.php",
					type: 'POST',
					data:  "cid="+stu_cid,
					dataType : "json",
					async: false,
					success: function(data, textStatus, jqXHR){
					if(data.status == "OK") {
						var data_len = data.data.length;					
						for(var i =0;i<data_len;i++) {
								$("#student_course_book_list").append('<li><a href="#" onclick="window.open(\''+data.data[i].blink+'\', \'_system\');" data-transition="none" name="'+data.data[i].bid+'"><img src="../img/book-'+data.data[i].btype+'.png"><h3>'+data.data[i].bname+'</h3><p>Added : '+data.data[i].bdate_created+'</p> </a></li>'+"\n").trigger('create');     				
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
});