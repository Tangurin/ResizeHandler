(function () {
    'use strict';
    /*===========================
    ResizeHandler
    ===========================*/
    var ResizeHandler = {
        active: false,
        element: null,
        onEndWaitTime: 500,
        onEndTimer: null,
        callbacks: {
            onResize: [],
            onResizeEnd: [],
        },
        initialize: function() {
            if (ResizeHandler.active == true) {
                return true;
            }

            ResizeHandler.element = $(window);
            ResizeHandler.element.on('resize', ResizeHandler.triggered);
            ResizeHandler.active = true;
        },
        triggered: function(event) {
            var $this = $(this)
            var callbacks = ResizeHandler.callbacks;

            //onResize
            for (var i in callbacks.onResize) {
                callbacks.onResize[i]($this, event);
            }

            //onResizeEnd
            clearTimeout(ResizeHandler.onEndTimer);
            ResizeHandler.onEndTimer = setTimeout(function() {
                for (var i in callbacks.onResizeEnd) {
                    callbacks.onResizeEnd[i]($this, event);
                }
            }, ResizeHandler.onEndWaitTime);
        },
        onResize: function(callback, run) {
            var run = run || false;
            if (typeof callback == 'function') {
                ResizeHandler.callbacks.onResize.push(callback);
            }
            if (run === true) {
                callback(ResizeHandler.element);
            }
        },
        onResizeEnd: function(callback, run) {
            var run = run || false;
            if (typeof callback == 'function') {
                ResizeHandler.callbacks.onResizeEnd.push(callback);
            }
            if (run === true) {
                callback(ResizeHandler.element);
            }
        }
    };

    window.ResizeHandler = ResizeHandler;
})();

/*===========================
ResizeHandler AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.ResizeHandler;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.ResizeHandler;
    });
}
