
    var startDate = '';
    var endDate = '';
    var myLineChart1 = null;
    var myLineChart2 = null;
    var start = moment().subtract(29, 'days');
    var end = moment();
    var ctx1 = null;
    var ctx2 = null;
    var companyName = '';
///////////////DSIPLAY DATE RANGE FROM DATE PICKER/////////////
function displayedDateRange(start, end) {
  $('#reportrange span').html(start._d.toISOString().substring(0, 10) + ' - ' + end._d.toISOString().substring(0, 10));
  startDate = start._d.toISOString().substring(0, 10);
  endDate = end._d.toISOString().substring(0, 10);
}
///////////GET DATE RANGE FROM DATE PICKER/////////////////////
$(function getDateRangeFromDatePicker() 
{
  $('#reportrange').daterangepicker({
    startDate: start,
    endDate: end,
    ranges: {
     'Today': [moment(), moment()],
     'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
     'This Month': [moment().startOf('month'), moment().endOf('month')],
         // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
       }
     }, displayedDateRange);
  displayedDateRange(start, end);
});
////////ON BUTTON CLICK, DO THE FOLLOWING...///////////////////
    
$( "#runSearch" ).click(function() 
{
  if(myLineChart1 != null){
    myLineChart1.destroy();
  }
  if(myLineChart2 != null){
    myLineChart2.destroy();
  }
  var stockDataset = [];
  var stockDateRange = [];
  var newsDataset = [];
  var newsDateRange = [];
  var unixDate = '';
  var username = "6f5d813c0a07af969a0ce95f4753decc";
  var password = "c3b0696922572afd46a3b18f7e29bcf9";
  var auth = "Basic " + (username + ':' + password).toString('base64');
  var searchTicker = $('#srch-term').val();
////////GET STOCK FEED AND COMPANY INFO FROM INTRINIO.COM//////
var stockQueryURL =  "https://api.intrinio.com/historical_data?ticker=" + searchTicker.toUpperCase() + "&item=close_price&start_date=" + startDate + "&end_date=" + endDate;
$.ajax({
  beforeSend: function(request) {
    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
  },
  url: stockQueryURL, method: "GET" }).done(function(stockResponse) {
    console.log(stockResponse);
    for (var i = stockResponse.data.length - 1; i > 0; i--) 
    {
      stockDataset.push(stockResponse.data[i].value);
      stockDateRange.push(stockResponse.data[i].date);
    }
    displayChartWithStockPrices(stockDataset, stockDateRange);
/////////////////DISPLAY COMPANY INFO//////////////////////////
var companyQueryURL = "https://api.intrinio.com/companies?ticker=" + searchTicker.toUpperCase();
console.log(companyQueryURL);
$.ajax({
  beforeSend: function(request) {
    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
  },
  url: companyQueryURL, 
  method: "GET" }) 
.done(function(companyResponse) {
  console.log(companyResponse);
  companyName = companyResponse.name.split(' ')[0];
  console.log(companyName);
  retrieveNewsFeed(companyName);
// Empties the region associated with the articles
$("#wellSection").empty();
var wellSection = $("<div>");
wellSection.addClass('well');
wellSection.attr('id', 'articleWell');
$('#wellSection').append(wellSection);
// Then display the remaining fields in the HTML (Section Name, Date, URL)
$("#articleWell").append('<h5>Company: ' + companyResponse.name + "</h5>");
$("#articleWell").append('<h5>CEO: ' + companyResponse.ceo + "</h5>");
$("#articleWell").append('<h5>Symbol: ' + companyResponse.ticker + "</h5>");
$("#articleWell").append('<h5>Exchange: ' + companyResponse.stock_exchange + "</h5>");
$("#articleWell").append('<h5>Address: ' + companyResponse.business_address + "</h5>");
$("#articleWell").append('<h5>Website: ' + companyResponse.company_url + "</h5>");
});
//////////////////GET NEWS FEED FROM WEBHOSE.IO////////////////
function retrieveNewsFeed(companyName) {
    var dateInput = startDate;
  console.log(dateInput);
  var unixDate = moment(new Date(dateInput)).unix();
  console.log(unixDate);
  
  var queryURL = "http://webhose.io/filterWebContent?token=dee16515-7944-4491-927d-08bac14acf2a&format=json&ts=" + unixDate + "&sort=published&q=language%3Aenglish%20site%3Awsj.com%20organization%3A" + companyName;
  $.ajax({url: queryURL, method: "GET"}).done(function(NewsData) {
      // Here we are logging the URL so we have access to it for troubleshooting
      console.log("------------------------------------")
      console.log("URL: " + queryURL);
      console.log("------------------------------------")
      // Here we then log the NewsData to console, where it will show up as an object.
      console.log(NewsData);
      console.log("------------------------------------")
      var tempDate = '';
      for (var i = NewsData.posts.length - 1; i > 0;) 
      { 
        tempDate = NewsData.posts[i].published.substring(0,10);
        i--;
        if(tempDate != NewsData.posts[i].published.substring(0,10))
        {
          newsDataset.push(NewsData.posts[i].text);
          newsDateRange.push(NewsData.posts[i].published.substring(0,10));
        }
      }
      console.log(newsDataset);
      console.log(newsDateRange);
      displayChartWithSentiment(newsDataset, newsDateRange);
    });
}
//////////////////DISPLAY CHART WITH NEWS SENTIMENT////////////
function displayChartWithSentiment(newsDataset, newsDateRange) {
  $("#sentiment-label").html("Sentiment");
  var data2 = {
    labels: newsDateRange,
    datasets: [
    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, -20, 6]
    }
    ]
  };
  var option = {
    responsive: true,
  };
    // Get the context of the canvas element we want to select
    ctx2 = document.getElementById("canvas2").getContext('2d');
    myLineChart2 = new Chart(ctx2).Line(data2, option); //'Line' defines type of the chart.
  }
//////////////////DISPLAY CHART WITH STOCK PRICES//////////////
function displayChartWithStockPrices(stockDataset, stockDateRange){
  $("#stock-label").html("Stock");
  console.log(stockDateRange);
  var data1 = {
    labels: stockDateRange,
    datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: stockDataset
    }
    ]
  };
  var option = {
    responsive: true,
  };
    // Get the context of the canvas element we want to select
    ctx1 = document.getElementById("canvas").getContext('2d');
    myLineChart1 = new Chart(ctx1).Line(data1, option); //'Line' defines type of the chart.
  }
});
});