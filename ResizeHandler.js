var ResizeHandler = {
    active: false,
    element: null,
    onStopTimer: null,
    callbacks: {
        onResize: [],
        onResizeStop: [],
    },
    initialize: function() {
        if (ResizeHandler.active == true) {
            return true;
        }

        ResizeHandler.element = $(window);
        ResizeHandler.element.on('resize', ResizeHandler.onResize);
        ResizeHandler.active = true;
    },
    onResize: function() {
        ResizeHandler.element.trigger('ResizeHandler-Resize')
        //On Resize Stop
        clearTimeout(ResizeHandler.onStopTimer);
        ResizeHandler.onStopTimer = setTimeout(ResizeHandler.onResizeStop, 300);

        var callbacks = ResizeHandler.callbacks.onResize;
        for (var i in callbacks) {
            callbacks[i](ResizeHandler.element);
        }
    },
    onResizeStop: function() {
        ResizeHandler.element.trigger('ResizeHandler-ResizeStop');
        var callbacks = ResizeHandler.callbacks.onResizeStop;
        for (var i in callbacks) {
            callbacks[i](ResizeHandler.element);
        }
    },
    callback: function(callback, type) {
        var type = type || 'onResize';
        if (typeof callback == 'function' && typeof ResizeHandler.callbacks[type] != 'undefined') {
            ResizeHandler.callbacks[type].push(callback);
        }
    }
};
