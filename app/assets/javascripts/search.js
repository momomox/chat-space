$(function() {

  var search_list = $("#user-search-result");

  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
               <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
               </div>`
   search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<p>${user}</p>`
    search_list.append(html);
  }

  function appendGroupUser(username, userid) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${userid}'>
                <p class='chat-group-user__name'>${username}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#chat-group-users').append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
     search_list.empty();
     if (input == "");
     else if (users.length !== 0) {
       users.forEach(function(user){
         console.log(user);
         appendUser(user);
       });
     }
     else {
       appendNoUser("一致するユーザーはありません");
     }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
  search_list.on('click', '.user-search-add', function() {
     $('#user-search-field').val('');
     var userid = $(this).data('user-id')
     var username = $(this).data('user-name')
     appendGroupUser(username, userid)
     $(this).parent().remove()
  })
  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
});

