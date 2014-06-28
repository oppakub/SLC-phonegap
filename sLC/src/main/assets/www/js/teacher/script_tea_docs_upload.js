//jQuery    
$( document ).ready(function() {
	$("#tea_docs_hid").val(send_hid);
	$("#tea_btn_upload_docs").click(function() {
			//Callback handler for form submit event
				$("#tea_upload_docs_form").submit(function(e)
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
								alert(data.message);		
								$.mobile.changePage('teacher_course_homework.html', { transition: "none", changeHash: false });									
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
	   });  
}); 