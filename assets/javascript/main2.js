var authKey = "78d36e7a8ac243d4a3f502d098ad9a55";

var resultsNum 	= 0;
var startYear 	= 2016;
var endYear		= 2017;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

var articleNum = 0;


function runQuery(numArticles, queryURL){

	$.ajax({
		url: queryURL, 
		method: "GET"}) 
		.done(function(NYTData) {
			console.log(NYTData);

			for (var i=0; i<10; i++) {

					articleNum++;

					var jsonReturn = (NYTData.response.docs[i].headline);
					var jsonDate = (NYTData.response.docs[i].pub_date);
					var resultStringDate = JSON.stringify(jsonDate);
					var resultString = JSON.stringify(jsonReturn);
					console.log(resultString, jsonDate);

					

					
			}
		});

}

	$('#runSearch').on('click', function(){
		event.preventDefault();
		articleNum = 0;

		$("#wellSection").empty();

		var searchTerm = $('#srch-term').val().trim();
		queryURL = queryURLBase + searchTerm;

		resultsNum = $("#numRecordsSelect").val();


		if (parseInt(startYear)) {
			queryURL = queryURL + "&begin_date=" + startYear + "0601";
		}

		if (parseInt(endYear)) {
			queryURL = queryURL + "&end_date=" + endYear + "0628";
		}

		runQuery(resultsNum, queryURL);

		return false;
		
	});	

$('#clearAll').on('click', function(){
	event.preventDefault();
	articleNum = 0;
	$("#wellSection").empty();
})
