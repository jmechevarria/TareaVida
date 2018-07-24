;
(function($, window, document, undefined) {
    var pluginName = 'SwissTable';
    var $this;
    // Create the plugin constructor
    function _construct(element, options) {
        $(element).addClass('swiss-table');
        this.element = element;
        this._name = pluginName;
        this._defaults = $.fn.SwissTable.defaults;
        this._options = $.extend({}, this._defaults, options);
        this._options.THeadStyle = $.extend({}, this._defaults.THeadStyle, options.THeadStyle);
        $this = this;
        this.init();
    }
    $.extend(_construct.prototype, {
        init: function() {
            $.each(this._options.THeadStyle, function(i, v) {
                $.each(v, function(j, v2) {
                    if (i === 'background')
                        $($this.element).children('thead').css('background-' + j, v2);
                    if (i === 'foreground')
                        $($this.element).children('thead').find('th, label').css(j, v2);

                });
            });
            if (this._options.filters)
                this._filters = $(this.element).TableFilters(this._options.filters);
            if (this._options.delete)
                this._delete = $(this.element).TableDelete(this._options.delete);
            if (this._options.fixedTHead)
                this.fixTHead();

        },
        fixTHead: function() {
            var thead = $($this.element).children('thead');
            var tbody = $($this.element).children('tbody');
            var tHeadProps = [thead.css('position'), thead.css('top'), thead.css('box-shadow'), thead.css('z-index')];
            var tBodyProps = [tbody.css('position'), tbody.css('top'), tbody.css('z-index')];

            $($this.element).find('th, td').each(function(i) {
                $(this).css('width', $(this).css('width'));
            });

            var state = this.onScroll(tbody, thead, tHeadProps, tBodyProps, undefined);
            var prevState = undefined;
            $(document).scroll(function() {
                prevState = state;
                state = $this.onScroll(tbody, thead, tHeadProps, tBodyProps, prevState);
//                $('#events .nav-item.nav-header').text(state);
            });
        },
        onScroll: function(tbody, thead, tHeadProps, tBodyProps, currentState) {
//            $('#events .nav-item.nav-header').text($(document).scrollTop() + ' ' + $($this.element).offset().top + ' ' + parseInt($($this.element).css('height')));
            var documentScrollTop = $(document).scrollTop();
            var elementOffsetTop = $($this.element).offset().top;
            var tBodyHeight = parseInt($(tbody).css('height'));
            if (currentState !== 3 && elementOffsetTop + tBodyHeight - 66 < documentScrollTop) {
                thead.css({
                    position: 'absolute',
                    top: parseInt($(tbody).css('height'))
                });
                currentState = 3;
            } else if (currentState !== 2 && 35 < documentScrollTop && elementOffsetTop + tBodyHeight - 66 >= documentScrollTop) {
                var boxShadowColor = "rgba(0, 0, 0, 1)";
                if ($(thead).css('background-image') === 'none')
                    boxShadowColor = $(thead).css('background-color');
                else
                    boxShadowColor = $(thead).css('background-image')
                            .substring($(thead).css('background-image').indexOf('rgb'), $(thead).css('background-image').indexOf(')'));
                thead.css({
                    position: 'fixed',
                    top: 66,
                    'z-index': 100,
                    'box-shadow': boxShadowColor + ') 0 0 10px'
                });
                tbody.css({
                    position: 'relative',
                    top: thead.css('height'),
                    'z-index': 10
                });
                currentState = 2;
            } else if (currentState !== 1 && 35 >= documentScrollTop) {
                thead.css({
                    position: tHeadProps[0],
                    top: tHeadProps[1],
                    'box-shadow': tHeadProps[2],
                    'z-index': tHeadProps[3]
                });
                tbody.css({
                    position: tBodyProps[0],
                    top: tBodyProps[1],
                    'z-index': tBodyProps[2]
                });
                currentState = 1;
            }
            return currentState;
        }
    });

    $.fn.SwissTable = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new _construct(this, options));
            }
        });
//        console.log($.data(this, "plugin_" + pluginName));
        return this;
    };

    $.fn.SwissTable.defaults = {
        fixedTHead: true,
        THeadStyle: {
            background: {
                color: 'rgb(9, 25, 30)'
//                image: 'none',
//                repeat: 'repeat',
//                attachment: 'scroll',
//                position: '0% 0%',
//                clip: 'border-box',
//                origin: 'padding-box',
//                size: 'auto auto'
            },
            foreground: {
                color: 'white'
            }
        }
    };

})(jQuery, window, document);