$(function(){
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${imagehtml}
                    </div>
                  </div> `
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.messages').append(html);
       $( ".form__submit").prop( "disabled", false );
       $("#new_message")[0].reset();
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });

    var reloadMessages = function() {
      if(window.location.href.match(/\/groups\/\d+\/messages/)){  
        var last_message_id = $(".messages .message:last").data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })

        .done(function(messages) {
          var insertHTML = '';
                      messages.forEach(function(message){
                            insertHTML = buildHTML(message);
          $(".messages").append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        }); 
      } 
    };
    setInterval(reloadMessages, 7000);
});

