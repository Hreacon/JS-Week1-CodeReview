var apiKey = require('./../.env').ghApiKey;
var moment = require('moment');

exports.GetUserRepos = function(username) {
  $.get('https://api.github.com/users/'+username+'/repos?per_page=1000&access_token=' + apiKey)
    .then(function(response){
      console.log(response);
      $(".template .user h3").html(response[0].owner.login);
      exports.appendUser();
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
};

exports.appendUser = function() {
  $(".response").append($(".template").html());
};
