trafficApp.directive('listElement', function ($compile) {
    return {
      restrict: 'AE',
//      transclude: 'element',
//      replace: true,
      scope: {
    	  initData: '=',
        deleteData: '=',
        insertData: '=',
        emptyData:'='
      },
      link: function (scope, element, attrs) {
    	  var list ="";
	    scope.$watch('initData', function (value) {
	    	element.html("");
	    	if(value==null || value ==""){
	    		return false;
	    	}
	    	list ="";
	    	for(var i=0;i<value.length;i++){
	       	 	var obj = JSON.stringify(value[i]);
	       	 list = list + "<option value ='"+obj+"'>"+value[i].empNumber+" - "+value[i].firstName+"</option>";
	    	}
		    element.html(list);
	    });
	    scope.genName = function(id,name) {
	        return id + ' - ' + name;
	    };
       scope.$watch('deleteData', function (delValue) {
    	   if(delValue == null || delValue == ""){
    		   return false;
    	   }
    	   var delObj;
    	   var thisObj;
    	  $(element.find('option')).each(function(){
    		  thisObj = $(this).val();
	   		   if(typeof thisObj === 'string'){
	   			   thisObj = JSON.parse(thisObj);
	   		   }
    		  for(var i=0;i<delValue.length;i++){
    			  delObj =  delValue[i];
       		   if(typeof delValue[i] === 'string'){
        			  delObj = JSON.parse(delValue[i]);
       		   }
    			  if(thisObj.empNumber == delObj.empNumber){
        			  $(this).remove();
        		  }          	
    			}
    		 
    	  });
       });
       scope.$watch('insertData', function (insertValue) {
    	   if(insertValue == null || insertValue == ""){
    		   return false;
    	   }
    	   var dataExist = false;
    	   var insertObj;
    	   var thisObj;
    	   for(var i=0;i<insertValue.length;i++){
    		   dataExist = false;
    		   insertObj =  insertValue[i];
    		   if(typeof insertValue[i] === 'string'){
    			   insertObj = JSON.parse(insertValue[i]);
    		   }
    		   $(element.find('option')).each(function(){
    			   thisObj =  $(this).val();
        		   if(typeof thisObj === 'string'){
        			   thisObj = JSON.parse(thisObj);
        		   }
    			   if(thisObj.empNumber ==  insertObj.empNumber){
    				   dataExist = true;
    			   } 
    	    		 
    	     });
			   if(!dataExist){
 				   var obj = JSON.stringify( insertObj);
				  element.append("<option value ='"+obj+"'>"+insertObj.empNumber+" - "+insertObj.firstName+"</option>");
			   }
 			         	
 		  }
    	
       });
       scope.$watch('emptyData', function (emptyOb) {
//    	   if(emptyOb == null || emptyOb == ""){
//    		   return false;
//    	   }
    	   if(emptyOb){
			  $(element.find('option')).each(function(){
	        		 $(this).remove();
	    		 
	    	  });
    	   }
 		  
    	
       });
      }
    };
  });