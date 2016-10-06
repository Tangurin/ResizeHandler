var ResizeHandler = {
    active: false,
    element: null,
    scrollEvent: null,
    onStopTimer: null,
    options: {},
    initialize: function($element, options) {
        if (ResizeHandler.active == true) {
            return true;
        }
        var options = options || {};
        options = $.extend(ResizeHandler.options,  options);

        ResizeHandler.element = $element;
        ResizeHandler.scrollEvent = ResizeHandler.element.on('resize', ResizeHandler.onResize);
        ResizeHandler.active = true;
    },
    onResize: function() {
        ResizeHandler.element.trigger('ResizeHandler-Resize')
        //On Resize Stop
        clearTimeout(ResizeHandler.onStopTimer);
        ResizeHandler.onStopTimer = setTimeout(ResizeHandler.onResizeStop, 300);
    },
    onResizeStop: function() {
        ResizeHandler.element.trigger('ResizeHandler-ResizeStop');
    }
};
