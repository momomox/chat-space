$(document).on('turbolinks:load', function(){
	$(function(){
		function buildHTML(message){
			message.image ? image = `<img src=${message.image}>` : image = "";
			var html = `<li class="message" msg-id = "${message.id}">
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
		function getMsg() {
			var newMsgId = $('.message').last().attr('msg-id');
			var url = $('#new_message').attr('action');
			console.log(location.pathname);
			$.ajax ({
				type: 'GET',
				url: url,
				data: { msg_id: newMsgId },
				dataType: 'json'
			})
			.done(function(data){
			if (data.length == 0) return false
			data.forEach(function(msg) {
			var html = buildHTML(msg)
			$('.main-contents__middle__message').append(html)
			})
			$('.main-contents__middle').animate({ scrollTop: $('.main-contents__middle')[0].scrollHeight}, 'swing')
			})
		}
		if (location.pathname.match(/messages/)){
			setInterval(getMsg, 5000)
		}
	})
})
