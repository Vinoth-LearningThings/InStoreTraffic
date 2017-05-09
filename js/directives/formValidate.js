trafficApp.directive('formValidate', function () {
    return {
      restrict: 'AE',
      scope: {
      },
      link: function (scope, element, attrs) {
		  var form, errorDiv;
		  form = element;
		 // form = angular.element('<form></form>');
          
		//  errorDiv = angular.element('<div id="#errorDiv"></div>');
    	  var createAllErrors = function() {
    		  errorList = $( "#errorDiv", form );

    	        var showAllErrorMessages = function() {
    	            errorList.empty();

    	            // Find all invalid fields within the form.
    	            var invalidFields = form.find( ":invalid" ).each( function( index, node ) {

    	                // Find the field's corresponding label
    	                var label = $( "label[for=" + node.id + "] "),
    	                    // Opera incorrectly does not fill the validationMessage property.
    	                    message = node.validationMessage || 'Invalid value.';

    	                errorList
    	                    .show()
    	                    .append( "<li><span>" + label.html() + "</span> " + message + "</li>" );
    	            });
    	        };

    	        // Support Safari
    	        form.on( "submit", function( event ) {
    	            if ( this.checkValidity && !this.checkValidity() ) {
    	                $( this ).find( ":invalid" ).first().focus();
    	                event.preventDefault();
    	            }
    	        });

    	        $( "input[type=submit], button:not([type=button])", form )
    	            .on( "click", showAllErrorMessages);

    	        $( "input", form ).on( "keypress", function( event ) {
    	            var type = $( this ).attr( "type" );
    	            if ( /date|email|month|number|search|tel|text|time|url|week/.test ( type )
    	              && event.keyCode == 13 ) {
    	                showAllErrorMessages();
    	            }
    	        });
    	    };

    	    $( "form" ).each( createAllErrors );

      }
    };
  });