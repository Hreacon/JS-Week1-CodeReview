var GitHubApi = require('./../js/GitHubApi.js');

$(document).ready(function() {
  $("#githubNameForm").submit(function(event) {
    event.preventDefault();
    var username = $("input[name=name]").val();
    $("input[name=name]").val('');
    GitHubApi.GetUserRepos(username);
  });
});
