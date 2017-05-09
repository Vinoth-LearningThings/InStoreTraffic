/**
 * ngFocus - directive is used to bind the function to the element on focus
 */
trafficApp.directive('setFocus', function() {
//	 return{
//	        link:function(scope,element,attrs){
//	            attrs.$observe('class',function(){
//	            	var list = $(element).find('.ng-invalid');
//	            	if(list.length>0 ){ //if (this.hasClass('ng-invalid')) {
//	            		scope.enablFlg= true;
//	            	}
//	            	else{
//	            		scope.enablFlg= false;
//	            	}
//	            });
//	        }
//	    };
	 return{
    link:function(scope,element,attrs){
    	 scope.$watch('submitted', function (value) {
	          var list = $(formELe).find('.ng-invalid');
	          var divEle = $(list[0]).parents(':eq(2)');//.find('.acc-content-div');
	          var selEle = divEle[0];
	          var temp = $(selEle).attr('content');
            scope.$apply(attrs.setFocus);
            var functionToCall =  scope.$eval(attrs.setFocus);
            functionToCall(temp);
        });
    }
};
//return function( scope, elem, attrs ) {
//    elem.bind('click', function(event) {
//              scope.$apply(attrs.setFocus);
//              var functionToCall =  scope.$eval(attrs.setFocus);
//              functionToCall();
//    	
//    		    var formELe = elem.parent().parent();
//  	          var list = $(formELe).find('.errorCls');
//  	          var divEle = $(list[0]).parents(':eq(2)');//.find('.acc-content-div');
//  	          var selEle = divEle[0];
//  	        setTimeout(function(){
//  	       angular.element(selEle).triggerHandler('click');
//	          //$(selEle ).trigger( "click" );
//    	    },5);
//    });
//  };
});