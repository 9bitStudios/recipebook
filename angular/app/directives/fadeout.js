app.directive('fadeOut', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var duration = parseInt(attrs.fadeout);
            if (isNaN(duration)) {
                duration = 500;
            }

            element.bind('click', function() {});   
        }
    };
});



