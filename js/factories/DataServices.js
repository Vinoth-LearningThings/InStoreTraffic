trafficApp.factory('DataServices', ['$rootScope','$http',
    function ($rootScope, $http, $q) {
	 var DataServicesInstance = {};
     
     DataServicesInstance.urlString = "http://localhost:8082/ImpactAnalyzer/";
     
     DataServicesInstance.getImpactFunctionality_Url = DataServicesInstance.urlString+"rest/IAService/getImpactFunctionality"
     
     //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-	  
  
     /**  Call POST service to load data **/
     DataServicesInstance.Post = function (data,_url, success, error) {
     //	var reqData = $.param(data);
         $http({
             method: 'POST',
             url: _url,
             data:data,
             cache: false
         })
             .success(function (data, status, headers, config) {
                 if (status === 200) {
                     success(data);
                 }
                 else {
                     error(data);
                 }
                 return false;
             })
             .error(function (data, status, headers, config) {
                 error(data);
                 return false;
             });
     };
     //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-	        
     /**  Call GET service to load data **/
     DataServicesInstance.Get = function (_url, success, error) {
         $http({
             method: 'GET',
             url: _url,
             cache: false
         })
         .success(function (data, status, headers, config) {
         	if (status === 200) {
         		success(data);
         	} else {
         		error(data);
             }
         	return false;
         })
         .error(function (data, status, headers, config) {
         	error(data);
         	return false;
         });
     };
     //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-	        
    
     return DataServicesInstance;
}
]);