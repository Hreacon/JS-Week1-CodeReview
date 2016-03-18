var apiKey = require('./../.env').ghApiKey;

exports.GetUser = function(username) {
  $.get('https://api.github.com/users/'+username+'?access_token=' + apiKey)
    .then(function(response){
      console.log(response);
      $(".template .user h3").text(response.login);
      exports.appendUser();
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
};

exports.appendUser = function() {
  $(".response").append($(".template").html());
};

exports.getRepos = function(){
  $.get('https://api.github.com/users/daneden?access_token=' + apiKey).then(function(response){
    console.log(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
