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
    onResize: function(callback) {
        if (typeof callback == 'function') {
            ResizeHandler.callbacks.onResize.push(callback);
        }
    },
    onResizeEnd: function(callback) {
        if (typeof callback == 'function') {
            ResizeHandler.callbacks.onResizeEnd.push(callback);
        }
    },
    callback: function(callback, type) {
        var type = type || 'onResize';
        if (typeof callback == 'function' && typeof ResizeHandler.callbacks[type] != 'undefined') {
            ResizeHandler.callbacks[type].push(callback);
        }
    }
};
