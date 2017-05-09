trafficApp.factory('CommonUtils', ['$rootScope','$location','DataServices','$filter','$cookieStore', function($rootScope,$location,DataServices,$filter,$cookieStore)
{
	 var CommonUtils = {};
	 CommonUtils.loading = false;
	    
	    CommonUtils.urlString = "http://localhost:8082/ImpactAnalyzer/";
	    
	    CommonUtils.getFuncSuccess = function(data) {
	    		CommonUtils.indFuncArray=[];
		    	CommonUtils.maxIndFunc=0;
		    	CommonUtils.funcList = data;
				//$cookieStore.put('funcList',$scope.funcList);
				$rootScope.loading = false;
				for(var i=0; i<CommonUtils.funcList.length; i++){
					CommonUtils.indFuncArray.push(CommonUtils.funcList[i].independentFunc.length);
				}
				CommonUtils.maxIndFunc = CommonUtils.indFuncArray[0]; 
				for (var i = 1; i < CommonUtils.indFuncArray.length; i++) 
				{ 
				if (CommonUtils.indFuncArray[i] > CommonUtils.maxIndFunc) 
					CommonUtils.maxIndFunc = CommonUtils.indFuncArray[i]; 
				} 
				$cookieStore.put('maxIndFunc',CommonUtils.maxIndFunc);
				CommonUtils.selectedAppData = $cookieStore.get('selectedAppData');
				CommonUtils.loading = true;
				DataServices.Get(CommonUtils.urlString+"rest/IAService/getChangeFunctionality?prtflioCd="+ $cookieStore.get('portfolioCd'), CommonUtils.getChangeSuccess, CommonUtils.commonError);
				/*$("#funcGrid").empty();
				$scope.showFuncGrid();*/
		};
		CommonUtils.getChangeSuccess=function(data){
			CommonUtils.changeList = data;
			$cookieStore.put('changeList',CommonUtils.changeList);
			CommonUtils.loading = false;
			 $location.path('/impacts');
		};
		CommonUtils.commonError=function(data){
			CommonUtils.loading = false;
			CommonUtils.errorMsg = "Application Error.";
			CommonUtils.showModalBac = true;
			CommonUtils.showErrorMsg = true;
	    };
	    return CommonUtils;    
}]);



