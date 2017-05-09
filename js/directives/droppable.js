  trafficApp.directive("uiOnDrop", [
        '$parse',
        '$rootScope',
        function ($parse, $rootScope) {
            return function (scope, element, attr) {
                var dragging = 0; 
                var dropChannel = attr.dropChannel || "defaultchannel" ;
                var dragChannel = "";
                var dragEnterClass = attr.dragEnterClass || "on-drag-enter";
                var dragHoverClass = attr.dragHoverClass || "on-drag-hover";

                function onDragOver(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }

                    e.dataTransfer.dropEffect = e.shiftKey ? 'copy' : 'move';
                    return false;
                }

                function onDragLeave(e) {
                  dragging--;
                  if (dragging == 0) {
                    element.removeClass(dragHoverClass);
                    element.removeClass(dragEnterClass);
                  }
                }

                function onDragEnter(e) {
                    dragging++;
                    $rootScope.$broadcast("ANGULAR_HOVER", dropChannel);
                    element.addClass(dragHoverClass);
                }

                function onDrop(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation(); // Necessary. Allows us to drop.
                    }

                    var sendData = e.dataTransfer.getData("Text");
                    sendData = angular.fromJson(sendData);

                    var fn = $parse(attr.uiOnDrop);
                    scope.$apply(function () {
                        fn(scope, {$data: sendData.data, $event: e, $channel: sendData.channel});
                    });
                    element.removeClass(dragEnterClass);
                }

                function isDragChannelAccepted(dragChannel, dropChannel) {
                    if (dropChannel === "*") {
                        return true;
                    }

                    var channelMatchPattern = new RegExp("(\\s|[,])+(" + dragChannel + ")(\\s|[,])+", "i");

                    return channelMatchPattern.test("," + dropChannel + ",");
                }

                var deregisterDragStart = $rootScope.$on("ANGULAR_DRAG_START", function (event, channel) {
                    dragChannel = channel;
                    if (isDragChannelAccepted(channel, dropChannel)) {

                        element.bind("dragover", onDragOver);
                        element.bind("dragenter", onDragEnter);
                        element.bind("dragleave", onDragLeave);

                        element.bind("drop", onDrop);
                    }

                });



                var deregisterDragEnd = $rootScope.$on("ANGULAR_DRAG_END", function (e, channel) {
                    dragChannel = "";
                    if (isDragChannelAccepted(channel, dropChannel)) {

                        element.unbind("dragover", onDragOver);
                        element.unbind("dragenter", onDragEnter);
                        element.unbind("dragleave", onDragLeave);

                        element.unbind("drop", onDrop);
                        element.removeClass(dragHoverClass);
                        element.removeClass(dragEnterClass);
                    }
                });


                var deregisterDragHover = $rootScope.$on("ANGULAR_HOVER", function (e, channel) {
                    if (isDragChannelAccepted(channel, dropChannel)) {
                      element.removeClass(dragHoverClass);
                    }
                });
                
                
                scope.$on('$destroy', function () {
                    deregisterDragStart();
                    deregisterDragEnd();
                    deregisterDragHover();
                });


                attr.$observe('dropChannel', function (value) {
                    if (value) {
                        dropChannel = value;
                    }
                });


            };
        }
    ]);
    