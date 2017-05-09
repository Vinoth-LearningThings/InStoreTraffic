trafficApp.controller("homeController",['$scope','$rootScope','$location','DataServices','$stomp', '$cookieStore','$timeout',function($scope,$rootScope,$location,DataServices,$stomp,$cookieStore,$timeout){
	
	$scope.selectedPortfolio = "";
	$scope.trafficValue = 263;
	$scope.bestHour = '10a-11a';
	$scope.bestDay = 'Monday';
	$scope.loading = false;
	$scope.m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	$scope.d = new Date();
	$scope.curr_date = $scope.d.getDate();
	$scope.curr_month = $scope.d.getMonth();
	$scope.curr_year = $scope.d.getFullYear();
	$scope.currentDay = $scope.curr_date + " " + $scope.m_names[$scope.curr_month] + " " + $scope.curr_year;
	$scope.datepicker = $scope.curr_date + " " + $scope.m_names[$scope.curr_month] + " " + $scope.curr_year;

	//$( "#datepicker" ).datepicker({ dateFormat: 'dd MM yy' });
	var date = new Date();
    date.setDate(date.getDate() + 1);

    
	/*$('input.date').datepicker({
    beforeShow: function(input, inst)
    {
        inst.dpDiv.css({marginTop: -input.offsetHeight + 'px', marginLeft: input.offsetWidth + 'px'});
    }
	});*/
	$("#datepicker").datepicker({
        dateFormat: "dd MM yy",
        minDate: date	
		
    });
	$("#datepicker").datepicker("setDate", date);

	$('#chartMenu a.todayChart').click(function(e){
	    //Show chart
	    e.preventDefault();	    
	    var selText = $(this).text();
  		$(this).parents('.dropdown').find('.dropdown-toggle').html(selText+'  <span class="caret"></span>');
	    console.log("todayChart--->", $scope.data);
	    $scope.series = ['Today', 'Yesterday'];
	    $scope.data = [
	    	[65, 59, 80, 81, 56, 55, 40, 30],
	    	[28, 48, 40, 19, 86, 27, 90, 20]
	  	];
	  	$scope.$apply();
	}); 

	$('#chartMenu a.weekChart').click(function(e){
	    //Show chart
	    e.preventDefault();
	    console.log("weekChart--->", $scope.data);	 
	    var selText = $(this).text();
  		$(this).parents('.dropdown').find('.dropdown-toggle').html(selText+'  <span class="caret"></span>');
	    $scope.data = [
	    	[135, 179, 160, 161, 176, 155, 170, 130],
	    	[100, 170, 140, 109, 187, 167, 180, 120]
	  	];
	  	$scope.series = ['This week', 'Last week'];
	  	$scope.$apply();
	}); 

	$('#chartMenu a.monthChart').click(function(e){
	    //Show chart
	    e.preventDefault();
	    console.log("monthChart--->", $scope.data);
	    var selText = $(this).text();
  		$(this).parents('.dropdown').find('.dropdown-toggle').html(selText+'  <span class="caret"></span>');
	    $scope.series = ['This month', 'Last month'];
	    $scope.data = [
	    	[3005, 3259, 3080, 3881, 3556, 3355, 3340, 3090],
	    	[3008, 3148, 3440, 3719, 3186, 3027, 3690, 3020]
	  	];
	  	$scope.$apply();
	}); 

	$('#chartMenu a.yearChart').click(function(e){
	    //Show chart
	    e.preventDefault();
	    console.log("yearChart--->", $scope.data);	    
	    var selText = $(this).text();
  		$(this).parents('.dropdown').find('.dropdown-toggle').html(selText+'  <span class="caret"></span>');
	    /*$scope.data = [
	    	[1000135, 1000179, 1000160, 1000161, 1000176, 1000155, 1000170, 1000130],
	    	[1000100, 1000170, 1000140, 1000109, 1000187, 1000167, 1000180, 1000120]
	  	];*/
	  	$scope.data = [
	    	[1.35, 1.79, 1.60, 1.61, 1.76, 1.15, 1.70, 1.30],
	    	[1.00, 1.0, 1.40, 1.09, 1.87, 1.67, 1.80, 1.20]
	  	];
	  	$scope.series = ['This year', 'Last year'];	  	
	  	$scope.$apply();
	}); 

	$scope.labels = ['6AM-8AM', '8AM-10AM', '10AM-12Noon', '12Noon-2PM', '2PM-4PM', '4PM-6PM', '6PM-8PM', '8PM-10PM'];
  	$scope.series = ['Today', 'Yesterday'];
  	$scope.data = [
    	[65, 59, 80, 81, 56, 55, 40, 30],
    	[28, 48, 40, 19, 86, 27, 90, 20]
  	];
  	$scope.onClick = function (points, evt) {
    	console.log(points, evt);
  	};

  	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  	$scope.options = {
  		legend: {display: true},
    	scales: {
      		yAxes: [
	        	{
			      	id: 'y-axis-1',
			      	type: 'linear',
			      	display: true,
			      	position: 'left',
			      	gridLines : {
		                display : false
		            },
		            ticks: {        
				        // Return an empty string to draw the tick line but hide the tick label
				        // Return `null` or `undefined` to hide the tick line entirely
				        userCallback: function(value, index, values) {
				        	// Convert the number to a string and splite the string every 3 charaters from the end
				        	console.log('value-->', value.toString());
				            value = value.toString();
				            if (value.indexOf('.') > -1) {
				            	return value +'M';
				            } else {
				            	return value;
				            }
				        }
				    }
	        	},
	        	{
			        id: 'y-axis-2',
			        type: 'linear',
			        display: false,
			        position: 'right',
			        gridLines : {
		                display : false
		            }
	        	}
      		],
            xAxes: [{
                display: true,
                gridLines : {
                	display : false
            	}
            }]
    	}  	
    };
	$scope.colors1 = [{
		backgroundColor: 'rgba(19,214,233,0.4)',
        pointBackgroundColor: '#13D6E9',
        pointHoverBackgroundColor: '#13D6E9',
        borderColor: '#13D6E9',
        pointBorderColor: '#13D6E9',
        pointHoverBorderColor: '#13D6E9'
	},
	{
		backgroundColor: 'rgba(239,36,126,0.4)',
        pointBackgroundColor: '#EF247E',
        pointHoverBackgroundColor: '#EF247E',
        borderColor: '#EF247E',
        pointBorderColor: '#EF247E',
        pointHoverBorderColor: '#EF247E'
	}];
	$scope.series2 = ['Tomorrow'];
  	$scope.data2 = [
    	[28, 48, 40, 19, 86, 27, 90, 25]
  	];
	$scope.colors2 = [{
		backgroundColor: '#4780D9',
        pointBackgroundColor: '#4780D9',
        pointHoverBackgroundColor: '#4780D9',
        borderColor: '#4780D9',
        pointBorderColor: '#4780D9',
        pointHoverBorderColor: '#4780D9'
	}];
	
	/**
	 * Method : Connect
	 * method used to broadcast the messages from server to client to all logging as
	 * Offshore specialist and messages will be shown using ticker and alert icon.
	 */
	$scope.connect = function() {
		$stomp.connect('http://157.227.254.232:8080/alert').then(function (frame) {
			// Stomp is subscribing the messages.
			  $stomp.subscribe('/broadcast/messages', function (payload, headers, res) {
			  	console.log (payload)
	         	$scope.trafficValue = $scope.trafficValue + 1;	         	
	         	$scope.$apply();
	        });
		});
    };

	$scope.connect(); 

	
}]).directive('animateOnChange', function($timeout) {
    return function(scope, element, attr) {
        scope.$watch(attr.animateOnChange, function(nv,ov) {
            if (nv!=ov) {
                element.addClass('changed');
                $timeout(function() {
                    element.removeClass('changed');
                }, 3000);
            }
        });
    };  
});