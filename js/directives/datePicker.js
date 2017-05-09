trafficApp.directive('datePicker', function () {
    return {
        replace: true,
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                changeMonth: false,
                changeYear: false,
                dateFormat: "yy-mm-dd",
                onSelect: function (dateText) {
                    updateModel(dateText);
                },
                //		        beforeShow: function () {
                //		        	$(".ui-datepicker-calendar").hide();//css('display','none');
                //		        	$(".ui-datepicker-calendar").css('display','none');
                //		        }

            };
            $(elem).datepicker(options);
            $("#ui-datepicker-div").addClass("tmsTool");
        }
    }
});