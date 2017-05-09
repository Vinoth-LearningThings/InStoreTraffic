/**
 * ngFocus - directive is used to bind the function to the element on focus
 */
trafficApp.directive('ngEnter', function() {
return function( scope, elem, attrs ) {
    elem.bind('keydown keyup', function(event) {
        if(event.which === 13){
            setTimeout(function(){
                scope.$apply(attrs.ngEnter);
                var functionToCall =  scope.$eval(attrs.ngEnter);
                functionToCall();
            },5);
            event.preventDefault();
        }
    });
  };
});