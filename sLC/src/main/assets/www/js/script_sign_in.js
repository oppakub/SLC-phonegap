var send_uid = undefined;

//jQuery
$( document ).ready(function() {
  //sign in form
  $("#sign_in_submit").click(function() {
		//Callback handler for form submit event
			$("#sign_in_form").submit(function(e)
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
						    send_uid = data.uid;
						     alert("successful");
						    $.mobile.changePage('sign_in_avatar.html', "{transition: 'none', role: 'dialog'}");
							//$(location).attr('href','sign_in_avatar.html');
						} else {
							//alert(data.message);
							toast(data.message);
						}
						//$.mobile.changePage('#show_dialog', "{transition: 'pop', role: 'dialog'}");										
					}, //end success
					error: function(jqXHR, textStatus, errorThrown) {
						//alert("ERROR");
						alert(jqXHR.responseText);
						//alert(thrownError);
					} //end error         
				});
				e.preventDefault(); //Prevent Default action. 
				//e.unbind();
			}); 
   });  
});

