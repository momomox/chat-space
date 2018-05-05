$(document).on('turbolinks:load', function(){
	$(function(){
	  function buildHTML(message){
	  	message.image ? image = `<img src=${message.image}>` : image = "";
	  	var html = `<li>
		  						<h2>${message.user_name}</h2>
									<h4>${message.date}</h4>
									<p>${message.content}</p>
									${image}
									</li>`
			return html;
	  }
	  $('#new_message').on('submit', function(e){
	    e.preventDefault();
	    var formData = new FormData(this);
	    var url = $(this).attr('action');
	    $.ajax({
	      url: url,
	      type: "POST",
	      data: formData,
	      dataType: 'json',
	      processData: false,
	      contentType: false
	    })
	   .done(function(data){
	   	 var html = buildHTML(data);
	   	 $('.main-contents__middle__message').append(html)
	   	 $('#new_message')[0].reset();
         $('.main-contents__middle').animate({scrollTop: $('.main-contents__middle')[0].scrollHeight}, 'swing');
         $('.send_button').prop("disabled", false);
	   })
	   .fail(function(){
	   	 alert('error');
	   })
	  })
	})
})
