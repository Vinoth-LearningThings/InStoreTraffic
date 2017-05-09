trafficApp.directive('ngJqGrid', function () {
    return {
      restrict: 'AE',
      scope: {
        config: '=',
        gridId:'=',
        data: '=?',
        footerdata: '=?',
      },
      link: function (scope, element, attrs) {
    	  var table, div;
    	  var footerVal;
    	  var id = attrs.gridId;
        scope.$watch('config', function (newValue) {
          element.children().empty();
          table = angular.element('<table id="grid_'+id+'"></table>');
          
          div = angular.element('<div id="gridHeaderInfo"></div>');
          element.append(div);
          element.append(table);
         $(table).jqGrid(newValue);
        });
        scope.$watch('data', function (value) {
        	 $(table).jqGrid('clearGridData');
        	 $(table).jqGrid('setGridParam', { data: value }).trigger('reloadGrid');
        });
        scope.$watch('footerdata', function (value) {
        	if(angular.isDefined(value)){
	        	footerVal="";
	        	if(value.hasOwnProperty('totalNonBillable')){
	        		footerVal = footerVal+' <div class="grid-footer-element"><label class="searchLblCls">Total NonBillable: </label><span style="width:2px;"></span>'+value.totalNonBillable+'</div>';
	        	}
	        	if(value.hasOwnProperty('totalPartiallyBillable')){
	        		footerVal = footerVal+' <div class="grid-footer-element"><label class="searchLblCls">Total PartiallyBillable: </label><span style="width:2px;"></span>'+value.totalPartiallyBillable+'</div>';
	        	}
	        	if(value.hasOwnProperty('totalBillable')){
	        		footerVal = footerVal +' <div class="grid-footer-element">'+
	        			'<label class="searchLblCls">Total Billable: </label><span style="width:2px;"></span>'+value.totalBillable+'</div>';
	        	}
	        	if(value.hasOwnProperty('totalResults')){
	        		footerVal = footerVal+' <div class="grid-footer-element"><label class="searchLblCls">Total Results: </label><span style="width:2px;"></span>'+value.totalResults+'</div>';
	        	}
	       	 $(div).html(footerVal);
        	}
       	// $(table).jqGrid('setGridParam', { data: value }).trigger('reloadGrid');
       });

      }
    };
  });