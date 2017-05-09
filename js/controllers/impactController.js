trafficApp.controller("impactController",['$scope','$rootScope','$location','DataServices','CommonUtils', '$cookieStore','$timeout',function($scope,$rootScope,$location,DataServices,CommonUtils,$cookieStore,$timeout){
	
	$scope.showErrorMsg = false;
	$scope.showModalBac = false;
	$scope.loading = false;
	$scope.dblClkFlag = false;
	//$scope.isManager = false;
	$scope.isNavigate = false;
	$scope.worklistObj = {};
	$scope.indChangedObj = {};
	$scope.userRole = $cookieStore.get('role');
	$scope.userName = $cookieStore.get('userName');
	if(CommonUtils.funcList.length == 0 || CommonUtils.funcList == []){
		$scope.loading = false;
		$(".appError").addClass("removeLeft");
		if($scope.userRole == "MGR"){
			$scope.isManager = true;
			$scope.errorMsg = "No functionality available for the selected application. Please add Functionality in Admin Module.";
			$(".popUpBtn").css("margin-top","0px");
		}else{
			$scope.errorMsg = "No functionality available for the selected application.";
			$scope.isNavigate = true;
		}
		$scope.showModalBac = true;
		$scope.showErrorMsg = true;
	}else{
	 $scope.maxIndFunc = $cookieStore.get('maxIndFunc');
	 $scope.indColWidth = 150*$scope.maxIndFunc;
	}
	$scope.changeList = $cookieStore.get('changeList');
	 $scope.$watch('gridSelection', function(gridView){
	        console.log('changed', gridView);
	        $cookieStore.put('gridView',gridView);
	        if(gridView == "full"){
	         console.log("full view--->", gridView);
	         $scope.loading = true;
	         var dataToSubmit = {};
	         dataToSubmit.allFuncData=CommonUtils.funcList;
	         dataToSubmit.changeList=$scope.selectedChangeData;
			 DataServices.Post("impactData="+JSON.stringify(dataToSubmit), CommonUtils.urlString+"rest/IAService/getImpactFunctionality", $scope.getImpactsSuccess, $scope.commonError);
			}else if(gridView == "impacts"){
			 $scope.impactFuncArray = {};
			 $scope.impactFuncArray = $scope.impactList;
			 console.log("impacts view--->", gridView);
	         $scope.loading = false;
			 $("#gbox_funcGrid").remove();
			 $("#gridDiv").append("<table id='funcGrid'></table><div id='pager'></div>");
			 //$scope.funcList = $cookieStore.get('impactList');
			 for(var i=0; i<$scope.impactFuncArray.length; ){
				 $scope.indFuncLen = $scope.impactFuncArray[i].independentFunc.length;
				 for(var j=0; j<$scope.impactFuncArray[i].independentFunc.length;){
					 if(!($scope.impactFuncArray[i].independentFunc[j].impactFlag)){
						 $scope.impactFuncArray[i].independentFunc.splice(j, 1);
					 }else{
						 j++;
					 }
					 
				 }
				 if($scope.impactFuncArray[i].independentFunc.length == 0 || $scope.impactFuncArray[i].independentFunc == null || $scope.impactFuncArray[i].independentFunc == undefined){
					 $scope.impactFuncArray.splice(i, 1);
				 }else{
					 i++;
				 }
				}
			 console.log($scope.impactList);
			// $cookieStore.put('onlyImpactList',$scope.funcList);
			 $scope.onlyImpactList = $scope.impactFuncArray;
			 $("#colorBox").show();
			 $("#viewGrid").show();
			 $scope.showFuncGrid($scope.onlyImpactList);
	        }
	        
	    });
	 
	 if($scope.userRole == "MGR"){
		 $("#adminBtnDiv").show();
	 }else{
		 $("#adminBtnDiv").hide();
		 $("#goHomeImpact").addClass("homeRight");
		 //$("#goHomeImpact").css("margin-right","9% !important");
	 }

	$scope.populateChange=function(){
		for(var i=0; i<$scope.changeList.length; i++){
			$("#selectChange").append("<option value="+$scope.changeList[i].cd+">"+$scope.changeList[i].changeFuncName+"</option>");
		}
		 $('#selectChange').multiselect( 
					{includeSelectAllOption: true}, 'refresh'
			);
		 $("#footerBtnsImpact").hide();
		 $("#colorBox").hide();
		 $("#viewGrid").hide();
		 $("#funcGrid").empty();
		 $scope.funcList = CommonUtils.funcList;
		 $scope.showFuncGrid($scope.funcList);
	};
	$scope.showFuncGrid=function(funcList){
		$("#footerBtnsImpact").show();
		$("#funcGrid").jqGrid({
		      colNames: [ 'Apps', 'Main Functionality', 'Sub Functionality', '*Independent functionality inside the main functionality'],
		      colModel: [
		      {
		          name: 'appName',
		          index: 'appName',
		          sortable: false,
		          editable: false,
		          align:"center",
		          width:100,
             },
           {
			       name: 'mainFunc',
			       index: 'mainFunc',
			       sortable: false,
		           editable: false,
		           align:"center",
		           width:200,
		           formatter: function(value, options, rowObject){
		            	  console.log("rowId",options.rowId);
		            	  var cellvalue = value;
		            	  for(var i=0; i<funcList[options.rowId-1].independentFunc.length; i++){
		            		  if(funcList[options.rowId-1].independentFunc[i].impactFlag){
		            			  cellvalue="";
		            			  cellvalue = '<span class="cellWithoutBackground" style="background-color:yellow;display: block;padding: 5px;">' + value + '</span>';
			            	  }
		            	  }
		            	  return cellvalue;
		              }
		           },
		      {
		          name: 'subFunc',
		          index: 'subFunc',
		          sortable: false,
	              editable: false,
	              align:"center",
	              width:200,
	              formatter: function(value, options, rowObject){
	            	  console.log("rowId",options.rowId);
	            	  if(value == ""){
	            		  return value;
	            	  }else{
	            		   var cellvalue = value;
	            	  for(var i=0; i<funcList[options.rowId-1].independentFunc.length; i++){
	            		  if(funcList[options.rowId-1].independentFunc[i].impactFlag){
	            			  cellvalue="";
	            			  cellvalue = '<span class="cellWithoutBackground" style="background-color:yellow;display: block;padding: 5px;">' + value + '</span>';
		            	  }
	            	  }
	            	  return cellvalue;
	            	  }
	            	 
	              }
                },
		      
           {
			          name: 'independentFunc',
			          index: 'independentFunc',
			          sortable: false,
		              editable: true,
		              align:"left",
		              width:$scope.indColWidth,
		              formatter: function(value, options, rowObject){
		            	  var tdSet = "";
		            	  var temp = "newIndValue";
		            	 // var cellWidth = 500/$scope.maxIndFunc;
		            	  var cellWidth = 150;
		            	  for(var i=0; i<$scope.maxIndFunc; i++){
		            		  if(value[i] == "" || value[i] == null || value[i] == undefined){
		            			  var emptyInd = "";
		            			  tdSet+='<td id="'+((value[i])?(value[i].impactAreaId):temp)+'" style="width:'+cellWidth+'px !important; min-width:'+cellWidth+'px !important; padding-right: 0px !important; padding-left: 0px !important; text-align: center;border-left: none !important;border-top: none !important;border-bottom: none !important;">'+emptyInd+'</td>'; 
		            		  }else{
		            			  if(value[i].impactFlag){
		            				  tdSet+='<td id="'+((value[i])?(value[i].impactAreaId):temp)+'" style="width:'+cellWidth+'px !important;min-width:'+cellWidth+'px !important; padding-right: 0px !important; padding-left: 0px !important;text-align: center;background-color:#83EE97;border-left: none !important;border-top: none !important;border-bottom: none !important; ">'+value[i].independentFunc+'</td>';
		            			  }else{
		            				  tdSet+='<td id="'+((value[i])?(value[i].impactAreaId):temp)+'"  style="width:'+cellWidth+'px !important;min-width:'+cellWidth+'px !important; padding-right: 0px !important; padding-left: 0px !important;text-align: center;border-left: none !important;border-top: none !important;border-bottom: none !important;">'+value[i].independentFunc+'</td>';
		            			  }
		            		  }
		            	  }
		            	  return '<table id="indTable" style="table-layout: fixed; border-spacing: 0px !important;"><tr>'+tdSet+'</tr></table>';
		                 }},
	            
		      ],
		     // caption:"DSRreport",
		      //data:$scope.impactList,
		      datatype: "local",
		      height: 380,
		     // width:1132,
		      rowNum:15,
		      rowList:[15,20,30],
		      pager: '#pager',
		      viewrecords: true,
		      loadonce:true,
		      ondblClickRow: function(rowid){
		    	console.log("dblclk-->",rowid);  
		      },
		      loadComplete: function () {
                var gridName = "funcGrid";
            }	
		     
	      
		});
		 var names = [ 'appName', 'mainFunc', 'subFunc', 'independentFunc'];

		 for (var i = 0; i <= funcList.length; i++) {
		      $("#funcGrid").jqGrid('addRowData', i + 1, funcList[i]);
		  }
		 $("#indTable tbody tr td").dblclick(function (e) {
			 if($scope.dblClkFlag){
				 if ( !$(".thVal").is(':focus') ) {
				 $($scope.currentEle).html($(".thVal").val());
		        }
			 }
			 	$scope.dblClkFlag = true;
		        e.stopPropagation();
		        var currentEle = $(this);
		        var value = $(this).html();
		        $scope.updateIndVal(currentEle, value, e.currentTarget.id);
		    });
		
	};
	 $scope.updateIndVal=function(currentEle, value, id) {
		 $scope.currentEle=[];
		 $scope.currentEle=currentEle;
		    $(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
		    $(".thVal").focus();
		    $(".thVal").keyup(function (event) {
		        if (event.keyCode == 13) {
		        	$scope.tempChangedIndVal = $(".thVal").val().trim();
		            $(currentEle).html($scope.tempChangedIndVal);
		            if(!($scope.tempChangedIndVal == value)){
		            	if($scope.userRole == "MGR"){
			            	$scope.indChangedObj.independentFunc = $scope.tempChangedIndVal;
			            	$scope.indChangedObj.imId = id;
			            	$scope.indChangedObj.role = $scope.userRole;
			            	$scope.indChangedObj.reqBy = $scope.userName;
			            	console.log($scope.indChangedObj);
			            	$scope.loading = true;
				            DataServices.Post("worklist="+JSON.stringify($scope.indChangedObj), CommonUtils.urlString+"rest/IAService/updateIndependentFunc", $scope.postWorklistSuccess, $scope.commonError);
			            }else{
			            	$scope.worklistObj.independentFunc = $scope.tempChangedIndVal;
			            	$scope.worklistObj.imId = id;
			            	$scope.worklistObj.role = $scope.userRole;
			            	$scope.worklistObj.reqBy = $scope.userName;
			            	console.log($scope.worklistObj);
			            	$scope.loading = true;
				            DataServices.Post("worklist="+JSON.stringify($scope.worklistObj), CommonUtils.urlString+"rest/IAService/updateIndependentFunc", $scope.postWorklistSuccess, $scope.commonError);
			            }
		            }else{
		            	
		            }
		            }
		    });
		};
	$('#selectChange').change(function(){
		$("#footerBtnsImpact").show();
	    console.log(JSON.stringify($(this).val()));
	    $scope.getImpacts();
	});
	$scope.postWorklistSuccess=function(data){
		$scope.loading = false;
		if(data == "FAILURE"){
			$(".appError").addClass("removeLeft");
			$scope.errorMsg = "Update Failed. Please try again.";
	    	$scope.showModalBac = true;
			$scope.showErrorMsg = true;
		}else{
			if($scope.userRole == "MGR"){
		    	$scope.errorMsg = "Updated Successfully.";
		    	$scope.showModalBac = true;
				$scope.showErrorMsg = true;
			 }else{
				 $(".appError").addClass("removeLeft");
				    $scope.errorMsg = "Functionality name change sent for Manager approval.";
			    	$scope.showModalBac = true;
					$scope.showErrorMsg = true;
			 }
		}
		
	};
	$scope.getImpacts=function(){
		$scope.selectedChange = [];
		$scope.selectedChangeTxt = [];
		$scope.selectedAppData = [];
		$scope.selectedChangeData = [];
		$scope.selectedAppData = $cookieStore.get('selectedAppData');
		$('#selectChange :selected').each(function(i, selectedElement) {
			$scope.selectedChange[i] = $(selectedElement).val();
			$scope.selectedChangeTxt[i] = $(selectedElement).text();
			});
			$scope.loading = true;
			console.log("App Request---->",$scope.selectedAppData);
			for(var i=0; i<$scope.selectedChange.length; i++){
				if(!($scope.selectedChange[i] == "multiselect-all")){
					$scope.selectedChangeData .push({"cd" : $scope.selectedChange[i]});
				}
			}
			console.log("Change Request---->",$scope.selectedChangeData);
			console.log("applicationList="+JSON.stringify($scope.selectedAppData)+"&changeList="+JSON.stringify($scope.selectedChangeData));
			if($scope.selectedChangeData == [] || $scope.selectedChangeData.length == 0 || $scope.selectedChangeData == null || $scope.selectedChangeData == undefined){
				$("#footerBtnsImpact").hide();
				 $("#colorBox").hide();
				 $("#viewGrid").hide();
				 $("#gbox_funcGrid").remove();
				 $("#gridDiv").append("<table id='funcGrid'></table><div id='pager'></div>");
				 $scope.funcList = CommonUtils.funcList;
				 $scope.loading = false;
				 $scope.showFuncGrid($scope.funcList);
			}else{
				$scope.loading = true;
				var dataToSubmit = {};
				 dataToSubmit.allFuncData=CommonUtils.funcList;
		         dataToSubmit.changeList=$scope.selectedChangeData;
				DataServices.Post("impactData="+JSON.stringify(dataToSubmit), CommonUtils.urlString+"rest/IAService/getImpactFunctionality", $scope.getImpactsSuccess, $scope.commonError);
			}
	};
	
	$scope.getImpactsSuccess=function(data){
		$scope.impactList={};
		$scope.impactList = data;
		//$cookieStore.put('impactList',$scope.funcList);
		 $scope.loading = false;
		 $("#gbox_funcGrid").remove();
		 $("#gridDiv").append("<table id='funcGrid'></table><div id='pager'></div>");
		 $("#colorBox").show();
		 $("#viewGrid").show();
		 $scope.gridSelection = "full";
		 $scope.showFuncGrid($scope.impactList);
	};
	$scope.commonError=function(data){
    	$scope.loading = false;
    	$scope.errorMsg = "Application Error.";
    	$scope.showModalBac = true;
		$scope.showErrorMsg = true;
    };
	$rootScope.closeAppErrorPopup = function() {
		$(".appError").removeClass("removeLeft");
		$scope.showErrorMsg = false;
		 $scope.showModalBac = false;
		 if($scope.isNavigate){
			 $location.path('/application');
		}
	 };
	 
	 $scope.goHome = function(){
		 $location.path('/home');
	 };
	 $scope.goBack = function(){
		 $scope.loading = true;
		 DataServices.Get(CommonUtils.urlString+"rest/IAService/getAppData?portfolioCd="+ $cookieStore.get('portfolioCd'), $scope.getAppSuccess, $scope.commonError);
	 };       
	 $scope.adminModule=function(){
		 $location.path('/admin');
	 };
	 $scope.getAppSuccess=function(data){
			$scope.appList = data;
			 $cookieStore.put('appList',$scope.appList);
			 $scope.loading = false;
			 $location.path('/application');
		};
	 $scope.populateChange();
	 $scope.logout = function(){
		 window.location = "/ImpactAnalyzer/login.html"; 
	 };
}]);