trafficApp.directive("iconSelector", function() {
    return {
      restrict: 'E',
      template: '<span class="icon" />',
      link: function($scope, elm, attrs) {
            if (Math.random() < 0.33) {
              elm.find('span').addClass('icon-ok');
            } else if (Math.random() > 0.66) {
              elm.find('span').addClass('icon-warning-sign');
            } else {
              elm.find('span').addClass('icon-remove');
            }
      }
    };
  });