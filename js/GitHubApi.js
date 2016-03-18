var apiKey = '';
apiKey = require('./../.env').ghApiKey; // COMMENT THIS LINE OUT IF YOU DONT HAVE AN API KEY
var moment = require('moment');

exports.GetUserInfo = function(username) {
  console.log("APIKEY: " + apiKey);
  if(apiKey.length > 0)
    apiKey = "?access_token=" + apiKey;
  $.get("https://api.github.com/users/"+username+apiKey)
    .then(function(response) {
      console.log(response);
      $("[username="+response.login+"] .userInfo img").attr('src', response.avatar_url);
      $("[username="+response.login+"] .userInfo .email").text("Email: " + response.email);
      $("[username="+response.login+"] .userInfo .name").text("Name: " + response.name);
      $("[username="+response.login+"] .userInfo .repoCount").text("Repo Count: " + response.public_repos);
      $("[username="+response.login+"] .userInfo .followers").text("Followers: " + response.following);
      $("[username="+response.login+"] .userInfo .location").text("Location: " + response.location);
      $("[username="+response.login+"] .userInfo .createdOn").text("Account created on " + moment(response.created_at).format('D/M/Y'));
    });/**/
};

exports.GetUserRepos = function(username) {
  if(apiKey.length > 0)
    apiKey = "&access_token=" + apiKey;
  $.get('https://api.github.com/users/'+username+'/repos?per_page=1000' + apiKey)
    .then(function(response){
      console.log(response);
      $(".template .user h3").html(response[0].owner.login);
      $(".template .user").attr("username", response[0].owner.login);
      exports.GetUserInfo(username);
      for(var i = 0; i < response.length; i++)
      {
        var html = '<li><a href="'+response[i].html_url+'">'+response[i].name+'</a>  <div> Created On: ' + moment(response[i].created_at).format("M/D/Y") + ' </div>';
        if(response[i].description.length > 0)
            html += '<div> Description: ' +response[i].description+'</div>';
        html += '</li>';

        $(".template .repositories ul").append(html);
      }
      $(".template .showRepo").attr("data-name", response[0].owner.login);
      exports.appendUser();
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
};

exports.appendUser = function() {
  $(".response").append($(".template").html());
  $(".template .repositories ul").html('');
  var name = $(".template .user .showRepo").attr("data-name");
  console.log(name);
  $(".template .showRepo").attr("data-name", '');
  $(".showRepo[data-name="+name+"]").click(function() {
    console.log("test");
    $(this).parent().find('.repositories').toggleClass('hidden');
  });
};
