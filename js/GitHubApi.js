var apiKey = require('./../.env').ghApiKey;
var moment = require('moment');

exports.GetUserInfo = function(username) {
  $.get("https://api.github.com/users/"+username+"?access_token="+apiKey)
    .then(function(response) {
      console.log(response);
      $("[username="+response.login+"] .userInfo img").attr('src', response.avatar_url);
      $(".userInfo .email").text("Email: " + response.email);
      $(".userInfo .name").text("Name: " + response.name);
      $(".userInfo .repoCount").text("Repo Count: " + response.public_repos);
      $(".userInfo .followers").text("Followers: " + response.following);
      $(".userInfo .location").text("Location: " + response.location);
      $(".userInfo .createdOn").text("Account created on " + moment(response.created_at).format('D/M/Y'));
    });
};

exports.GetUserRepos = function(username) {
  $.get('https://api.github.com/users/'+username+'/repos?per_page=1000&access_token=' + apiKey)
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
      exports.appendUser();
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
};

exports.appendUser = function() {
  $(".response").append($(".template").html());
};
