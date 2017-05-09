var trafficApp  = angular.module('trafficApp',['ngRoute','ngCookies', 'chart.js', 'ngStomp']);

trafficApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/impacts',
	{
		//controller:'impactController',
		templateUrl:'pages/impact.html',
	}).when('/home',
		 {
		templateUrl : 'pages/home.html',
		//controller  : 'homeController'
	})	
	.otherwise({
        redirectTo: '/home'
    });
}]).run(['$q', '$rootScope',
         function ($q, $rootScope) {
    //Init Run
}
]);
	
	


