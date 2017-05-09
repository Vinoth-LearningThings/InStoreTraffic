 trafficApp.directive("uiDraggable", [
        '$parse',
        '$rootScope',
        function ($parse, $rootScope) {
            return function (scope, element, attrs) {
                var dragData = "",
                    isDragHandleUsed = false,
                    dragHandleClass,
                    dragHandles,
                    dragTarget;

                element.attr("draggable", false);

                attrs.$observe("uiDraggable", function (newValue) {
                    if(newValue){
                        element.attr("draggable", newValue);
                    }
                    else{
                        element.removeAttr("draggable");
                    }
                    
                });

                if (attrs.drag) {
                    scope.$watch(attrs.drag, function (newValue) {
                        dragData = newValue || "";
                    });
                }

                if (angular.isString(attrs.dragHandleClass)) {
                    isDragHandleUsed = true;
                    dragHandleClass = attrs.dragHandleClass.trim() || "drag-handle";
                    dragHandles = element.find('.' + dragHandleClass).toArray();

                    element.bind("mousedown", function (e) {
                        dragTarget = e.target;
                    });
                }

                element.bind("dragstart", function (e) {
                    var isDragAllowed = !isDragHandleUsed || -1 != dragHandles.indexOf(dragTarget);

                    if (isDragAllowed) {
                        var sendChannel = attrs.dragChannel || "defaultchannel";
                        var sendData = angular.toJson({ data: dragData, channel: sendChannel });
                        var dragImage = attrs.dragImage || null;
                        if (dragImage) {
                            var dragImageFn = $parse(attrs.dragImage);
                            scope.$apply(function() {
                                var dragImageParameters = dragImageFn(scope, {$event: e});
                                if (dragImageParameters && dragImageParameters.image) {
                                    var xOffset = dragImageParameters.xOffset || 0,
                                        yOffset = dragImageParameters.yOffset || 0;
                                    e.dataTransfer.setDragImage(dragImageParameters.image, xOffset, yOffset);
                                }
                            });
                        }

                        e.dataTransfer.setData("Text", sendData);
                        e.dataTransfer.effectAllowed = "copyMove";
                        $rootScope.$broadcast("ANGULAR_DRAG_START", sendChannel);
                    }
                    else {
                        e.preventDefault();
                    }
                });

                element.bind("dragend", function (e) {
                    var sendChannel = attrs.dragChannel || "defaultchannel";
                    $rootScope.$broadcast("ANGULAR_DRAG_END", sendChannel);
                    if (e.dataTransfer && e.dataTransfer.dropEffect !== "none") {
                        if (attrs.onDropSuccess) {
                            var fn = $parse(attrs.onDropSuccess);
                            scope.$apply(function () {
                                fn(scope, {$event: e});
                            });
                        }
                    }
                });


            
        };
        }
    ])