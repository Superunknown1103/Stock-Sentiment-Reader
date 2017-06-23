
var searchTerm  = "";
var authKey = "78d36e7a8ac243d4a3f502d098ad9a55";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

var cb = new Codebird;
cb.setConsumerKey("aycTaLhQyQEtfXhYhwWb3zbte", "jQorxagPVFwrfCJz7uuuq6P9Fgl62sLwS4KPMRPTZAbWiQO5kH");
cb.setToken("221904417-YJ8a9KVCFjCzjIIyy3O1OiY4oRIbu79Bvj43JrBX", "jlzw9IzBftxrSs9q0nIHYg3rJbnrbnbvmbeZXCa0BE7wV");


$('#runSearch').on('click', function(event){
  event.preventDefault()
  var search = $('#srch-term').val().trim();
  twitterCall(search);
  runQuery(search);

   
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
   
    




function runQuery(numArticles, queryURL){

  $.ajax({
    url: queryURL, 
    method: "GET"}) 
    .done(function(NYTData) {

      for (var i=0; i<numArticles; i++) {

          articleNum++;

          var wellSection = $("<div>");
          wellSection.addClass('well');
          wellSection.attr('id', 'articleWell-' + articleNum)
          $('#wellSection').append(wellSection);

          if(NYTData.response.docs[i].headline != "null")
          {
            $("#articleWell-"+ articleNum).append('<h3><span class="label label-primary">' + articleNum + '</span><strong>   ' + NYTData.response.docs[i].headline.main + "</strong></h3>");
            
          }
          
          if( NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original"))
          {
            $("#articleWell-"+ articleNum).append('<h5>' + NYTData.response.docs[i].byline.original + "</h5>");

          }
          if( NYTData.response.docs[i].byline && NYTData.response.docs[i].section_name != "null"){
          $("#articleWell-"+ articleNum).append('<h5>Section: ' + NYTData.response.docs[i].section_name + "</h5>");
          }
          if( NYTData.response.docs[i].byline && NYTData.response.docs[i].pub_date != "null"){
          $("#articleWell-"+ articleNum).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
          }
          $("#articleWell-"+ articleNum).append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");
      }
    });

}









