var cb = new Codebird;
cb.setConsumerKey("aycTaLhQyQEtfXhYhwWb3zbte", "jQorxagPVFwrfCJz7uuuq6P9Fgl62sLwS4KPMRPTZAbWiQO5kH");
cb.setToken("221904417-YJ8a9KVCFjCzjIIyy3O1OiY4oRIbu79Bvj43JrBX", "jlzw9IzBftxrSs9q0nIHYg3rJbnrbnbvmbeZXCa0BE7wV");



 


$('#runSearch').on('click', function(event){
   event.preventDefault()
   var search = $('#srch-term').val().trim();
  twitterCall(search)

   console.log("hello");
});

  var twitterCall = function(searchTerm){
    console.log(searchTerm);
            var params = {
                q: searchTerm
            };
            cb.__call(
                "search_tweets",
                params,
                function (reply) {
                    console.log(reply);
                    // ...
                }
            );

            cb.__call(
                "search_tweets",
                "q=Twitter",
                function (reply, rate_limit_status) {
                    console.log(rate_limit_status);
                    // ...
                }
            );
   }
   