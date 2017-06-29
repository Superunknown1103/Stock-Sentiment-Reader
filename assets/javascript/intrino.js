var startDate = '';
var endDate = '';
var myLineChart = null;

    var start = moment().subtract(29, 'days');
    var end = moment();

        function displayedDateRange(start, end) {
        $('#dater span').html(start._d.toISOString().substring(0, 10) + ' - ' + end._d.toISOString().substring(0, 10));

        startDate = start._d.toISOString().substring(0, 10);
        endDate = end._d.toISOString().substring(0, 10);

        console.log(startDate);
        console.log(endDate);
    }

$(function() {

    $('#dater').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, displayedDateRange);


        console.log(startDate);
        console.log(endDate);
    displayedDateRange(start, end);

});


    









    $( '#runSearch' ).click(function() {
      $('#canvas').css({
      'background-color': '#f5f5f5'
      });

      if(myLineChart != null){
        myLineChart.destroy();
      }
     

      var dataset = [];
      var dateRange = [];
      var username = "6f5d813c0a07af969a0ce95f4753decc";
      var password = "c3b0696922572afd46a3b18f7e29bcf9";
      var auth = "Basic " + (username + ':' + password).toString('base64');
      var searchTicker = $('#srch-term').val();
      console.log(searchTicker);
        //var queryURL = "https://api.intrinio.com/companies?ticker=" + searchTicker;


        console.log(startDate);
        console.log(endDate);
        var stockQueryURL =  "https://api.intrinio.com/historical_data?ticker=" + searchTicker.toUpperCase() + "&item=close_price&start_date=" + startDate + "&end_date=" + endDate;

        var companyQueryURL = "https://api.intrinio.com/companies?ticker=" + searchTicker.toUpperCase();

        console.log(stockQueryURL);
        console.log(companyQueryURL);

        $.ajax({
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
          },
          url: stockQueryURL, 
          method: "GET" }) 
        .done(function(stockResponse) {


          console.log(stockResponse);



          for (var i = stockResponse.data.length - 1; i > 0; i--) 
          {
            dataset.push(stockResponse.data[i].value);
            dateRange.push(stockResponse.data[i].date);
    //console.log(response.Dataset);

  }

  console.log(dataset);
  console.log(dateRange);




  $(function () {

    var data = {
      labels: dateRange,
      datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: dataset
      }
      ]
    };

    var option = {
      responsive: true,
    };
    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("canvas").getContext('2d');
    myLineChart = new Chart(ctx).Line(data, option); //'Line' defines type of the chart.

  });


//         $(function () {

//           var data = {
//             labels: ["January 1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
//             datasets: [
//             {
//                 label: "My Second dataset",
//                 fillColor: "rgba(151,187,205,0.2)",
//                 strokeColor: "rgba(151,187,205,1)",
//                 pointColor: "rgba(151,187,205,1)",
//                 pointStrokeColor: "#fff",
//                 pointHighlightFill: "#fff",
//                 pointHighlightStroke: "rgba(151,187,205,1)",
//                 data: [28, 48, 40, 19, 86, 27, 90]
//             }
//             ]
//         };

//         var option = {
//             responsive: true,
//         };
//     // Get the context of the canvas element we want to select
//     var ctx = document.getElementById("myChart2").getContext('2d');
//     var myLineChart = new Chart(ctx).Line(data, option); //'Line' defines type of the chart.
// });



});





        $.ajax({
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
          },
          url: companyQueryURL, 
          method: "GET" }) 
        .done(function(companyResponse) {


          console.log(companyResponse);



            // Empties the region associated with the articles
            $("#wellSection").empty();

            var wellSection = $("<div>");
            wellSection.addClass('well');
            wellSection.attr('id', 'articleWell')
            $('#wellSection').append(wellSection);

// Then display the remaining fields in the HTML (Section Name, Date, URL)
$("#articleWell").append('<h5>Company: ' + companyResponse.name + "</h5>");
$("#articleWell").append('<h5>CEO: ' + companyResponse.ceo + "</h5>");
$("#articleWell").append('<h5>Symbol: ' + companyResponse.ticker + "</h5>");
$("#articleWell").append('<h5>Exchange: ' + companyResponse.stock_exchange + "</h5>");
$("#articleWell").append('<h5>Address: ' + companyResponse.business_address + "</h5>");
$("#articleWell").append('<h5>Website: ' + companyResponse.company_url + "</h5>");
});

      });