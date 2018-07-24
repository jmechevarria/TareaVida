(function($, window, document, undefined) {
    var $this;
    var pluginName = 'TableDelete';
    $.fn.TableDelete = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new _construct(this, options));
            }
        });
//        return this;
    };

    function _construct(element, options) {
        if (!options.deleteButtonContainer)
            window.alert('SwissTable says: Please, set a container for the delete button');
        else if (!options.deleteIconsContainer)
            window.alert('SwissTable says: Please, set a container for the delete icons');
        else {
            this.element = element;
            this._name = pluginName;
            this._defaults = $.fn.TableDelete.defaults;
            this._options = $.extend({}, this._defaults, options);
            this.selected = undefined;
            this.lastSelected = undefined;
            this.range = 20;
            this.rate = .3;
            this.animation = {};
            this.animation['binClicked'] = false;
            this.toBeDeleted = 0;
            this.lastToBeDeleted = 0;
            $this = this;
            this.init();
        }
    }

    $.extend(_construct.prototype, {
        init: function() {
            var deleteButtonContainer = $(this._options.deleteButtonContainer);
            var deleteIconsContainer = $(this._options.deleteIconsContainer);
            this.appendComponents({'deleteButtonContainer': deleteButtonContainer, 'deleteIconsContainer': deleteIconsContainer});
            $(this._options.deleteIconsContainer + ' i').click(function(e) {
                $this.markRow($(this), e);
            });
            $(this._options.deleteButtonContainer + ' a').click(function() {
                $this.delete($(this));
            });
        },
        appendComponents: function(components) {
            if (components['deleteButtonContainer']) {
                var anchor = $('<a id="raise-delete-modal"></a>');
                var icon = $('<i class="fa fa-trash-o fa-2x red" data-original-title="Delete selected" data-placement="bottom"></i>');
                var sup = $('<sup></sup>');
                var span = $('<span class="badge"></span>');
                anchor.append(icon);
                icon.after(sup.append(span));
                components['deleteButtonContainer'].append(anchor);
            }
            if (components['deleteIconsContainer']) {
                var anchor = $('<a><i class="fa fa-circle-o"></i></a>');
                components['deleteIconsContainer'].append(anchor);
            }
        },
        delete: function(caller) {
            $.isFunction(this._options.deleteFunction) && this._options.deleteFunction.call(caller);
        },
        markRow: function(caller, e) {
            this.selected = caller.parents('tr:first');
            var siblings;
            if (e.shiftKey)
                if (this.lastSelected === undefined) {
                    siblings = this.selected.siblings('tr').slice(0, this.selected.index());
                    siblings.addClass('to-be-deleted')
                            .find(this._options.deleteIconsContainer + ' a i')
                            .toggleClass('fa-circle-o fa-times-circle');
                    this.selected.addClass('to-be-deleted').find(this._options.deleteIconsContainer + ' a i')
                            .toggleClass('fa-circle-o fa-times-circle');
                } else {
                    var lastSelectedIndex = this.lastSelected.index();
                    var selectedIndex = this.selected.index();
                    if (this.lastSelected.hasClass('to-be-deleted')) {
                        siblings = this.lastSelected.siblings('tr').slice(Math.min(lastSelectedIndex, selectedIndex), Math.max(lastSelectedIndex, selectedIndex));
                        siblings.addClass('to-be-deleted').find(this._options.deleteIconsContainer + ' a i')
                                .removeClass('fa-circle-o').addClass('fa-times-circle');
                    } else {
                        siblings = this.lastSelected.siblings('tr').slice(Math.min(lastSelectedIndex, selectedIndex), Math.max(lastSelectedIndex, selectedIndex));
                        siblings.removeClass('to-be-deleted').find(this._options.deleteIconsContainer + ' a i')
                                .removeClass('fa-times-circle').addClass('fa-circle-o');
                    }
                }
            else {
                this.selected.toggleClass('to-be-deleted').find(this._options.deleteIconsContainer + ' a i').toggleClass('fa-circle-o fa-times-circle');
            }

            this.toBeDeleted = $(this.element).find('tr.to-be-deleted').length;
            $(this._options.deleteButtonContainer + ' a sup span').text(this.toBeDeleted === 0 ? '' : this.toBeDeleted);

            this.animation['x'] = 0, this.animation['y'] = 0;
            if (this.lastToBeDeleted === 0 && this.toBeDeleted !== 0) {
                requestAnimationFrame(this.animate);
            } else if (this.toBeDeleted === 0) {
                this.stopAnimate(this.animation['animationId']);
            }
            this.lastSelected = this.selected;
            this.lastToBeDeleted = this.toBeDeleted;
        },
        animate: function() {
            var elemsToAnimate = $($this._options.deleteButtonContainer).find("i, span");
            $(elemsToAnimate[0]).css('transform', 'rotateZ(' + ($this.range * $this.animation['y']) + 'deg)');
//            $(elemsToAnimate[1]).css('transform', 'rotateZ(' + (-$this.range * $this.animation['y']) + 'deg)');
            $this.animation['animationId'] = requestAnimationFrame($this.animate);
            $this.animation['y'] = $this.progress($this.animation['x']);
            $this.animation['x'] += $this.rate;
        },
        stopAnimate: function(animationId) {
            cancelAnimationFrame(animationId);
            $(this.element).find(this._options.deleteButtonContainer + ' a')
                    .find('i, span').css('transform', 'rotateZ(0deg)');
        },
        progress: function(x) {
            return Math.sin(x);
        }
    });

    $.fn.TableDelete.defaults = {
        'deleteButtonContainer': null,
        'deleteIconsContainer': null
    };

})(jQuery, window, document);