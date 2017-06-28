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

			for (var i=0; i<50; i++) {

					articleNum++;

					var wellSection = $("<div>");
					wellSection.addClass('well');
					wellSection.attr('id', 'articleWell-' + articleNum)
					$('#wellSection').append(wellSection);
					console.log(NYTData.response.docs[i].headline);

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

	$('#runSearch').on('click', function(){
		event.preventDefault();
		articleNum = 0;

		$("#wellSection").empty();

		var searchTerm = $('#srch-term').val().trim();
		queryURL = queryURLBase + searchTerm;

		resultsNum = $("#numRecordsSelect").val();

		//startYear = $('#startYear').val().trim();

		//endYear = $('#endYear').val().trim();

		if (parseInt(startYear)) {
			queryURL = queryURL + "&begin_date=" + startYear + "0101";
		}

		if (parseInt(endYear)) {
			queryURL = queryURL + "&end_date=" + endYear + "0101";
		}

		runQuery(resultsNum, queryURL);

		return false;
		
	});	

$('#clearAll').on('click', function(){
	event.preventDefault();
	articleNum = 0;
	$("#wellSection").empty();
})
