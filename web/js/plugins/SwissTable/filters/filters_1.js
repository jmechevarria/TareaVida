/*-----*-----Usage-----*-----*/
/*
 IMPORTANT: for this plugin to work, the table being filtered must have the complete structure, i.e:
 <table>
 <thead>
 <tr>
 <th>
 </th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>
 </td>
 </tr>
 </tbody>
 </table>

 Call the function using a selector, e.g.:
 $('.table-filtered').setTableFilters({});

 ---Markup options---
 1- Exclude rows from filtering applying the "no-filter" class to the desired <tr></tr> elements, e.g.:
 <TR class="no-filter"></TR>

 2- Exclude columns from filtering applying the "no-filter" class to the desired <th></th> elements
 in the row before the filters, e.g.:
 <TH class="no-filter"></TH>

 3- Set the type of filter for each column, "text-filter" is the default. Each type of filter
 needs specific information to work, which must be provided via the 'filter-data' attribute.

 3.1- SELECT
 This filter needs the text to place in the options of the select component.
 The following example will work on a column showing only the values Vacant, Booked and Occupied.
 <TD class="select-filter" filter-data="Vacant Booked Occupied">Availability</TD>

 3.2- BOOLEAN
 This filter needs the text corresponding to the 'checked' state of the checkbox component. When the checkbox is checked,
 only the cells with the text provided in the 'filter-data' attribute will be shown, when not, all rows will be visible. For
 example, a column showing the status of a site's users (Active or Blocked) could use the following filter:
 <TD class="boolean-filter" filter-data="Active">Status</TD>

 3.3- NUMBER
 This filter autodetermines the minimum and maximum values it should work with. You can, of course, provide those values yourself.
 Example:
 <TD class="number-filter" filter-data="0 100">Age</TD>

 ---Plugin options---
 1-
 Name: filterUpTo
 Default: 999999
 Description: Limit the number of rows to be filtered using the "filterUpTo" option. The rest will always be visible and
 ignore any filtering.
 Example:
 $('.table-filtered').setTableFilters({
 filterUpTo: 5
 });

 2-
 Name: rowBeforeFilters
 Default: 0
 Description: The row containing the filters will be added right after the first <tr></tr> inside <thead></thead>,
 you can override this behaviour via 'rowBeforeFilters'; this parameter represents the row's global index inside the table, i.e:
 if, for example, 'rowBeforeFilters' is assigned 4 and the <thead></thead> element contains 3 rows, the filters will be added
 AFTER the second row inside <tbody></tbody>.
 Example:
 $('.table-filtered').setTableFilters({
 rowBeforeFilters: 4
 });

 3-
 Name: withOptions
 Default: true
 Description: If you want an options cell appended to the filters row, you can achieve so by first adding
 an extra column with the 'no-filter' class to accomodate the options and then pass the
 'withOptions' argument to the plugin call.
 Example:
 $('.table-filtered').setTableFilters({
 withOptions: true
 });

 4-
 Name: appendAmountTo
 Default: null
 Description: To keep track of the amount of rows being shown every time a filter is applied, you can use the 'appendAmountTo' option and
 assign it a selector, which will be appended said amount.
 Note: Rows excluded from filtering, because of the 'filterUpTo' option for example, will not be accounted for.
 Example:
 $('.table-filtered').setTableFilters({
 appendAmountTo: $('#table-title')
 });

 */
/*-----*-----Usage-END-----*-----*/

;
(function($, window, document, undefined) {

    var pluginName = 'FilterTable';

    // Create the plugin constructor
    function _construct(element, options) {
        this.element = element;
        this._name = pluginName;
        this._defaults = $.fn.FilterTable.defaults;

        this._options = $.extend({}, this._defaults, options);

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(_construct.prototype, {
        init: function() {
            this.$element = $(this.element);
            this.filtersRow = $('<tr id="filters-row"></tr>');
            var rowBeforeFiltersIndex = this._options.rowBeforeFilters;
            var thead = $(this.element).children('thead');
            var tbody = $(this.element).children('tbody');
            if (rowBeforeFiltersIndex < thead.children().length)
                this.rowBeforeFilters = thead.children().eq(rowBeforeFiltersIndex);
            else
                this.rowBeforeFilters = tbody.children().eq(rowBeforeFiltersIndex - thead.children().length);

            this.columnsToFilter = this.rowBeforeFilters.children(':not(.no-filter)');
            for (var i in this.columnsToFilter) {
                this.columnsToFilter[i].filterBinaryId = (1 << this.columnsToFilter.length - i - 1);
            }
            this.rowsToFilter = [];
            this.initialDisplays = [];
            this.isVisible = [];
            this.isAffectedBy = [];
            this.optionsCell = null;

            this.bindEvents();
            this.addFiltersRow();

            var pluginConstruct = this;
            this.filtersRow.find(':input').on('keypress', function(e) {
                console.log('doesn\'t work with the select');
                if (e.keyCode === 27)
                    pluginConstruct.clearFilters();
            });
        },
        addFiltersRow: function() {
            var cells = this.rowBeforeFilters.children();
            var cellType = this.rowBeforeFilters.parent()[0].tagName === 'THEAD' ? $('<th>') : $('<td>');

            var pluginConstruct = this;
            this.rowBeforeFilters.after(this.filtersRow);
            this.cacheRowsToFilter();
            this.appendAmountTo(this._options.appendAmountTo);

            $.each(cells, function(i, v) {
                var colspan = $(v).attr('colspan');
                if (colspan)
                    cellType.attr('colspan', colspan);

                var clone = cellType.clone();
                pluginConstruct.filtersRow.append(clone);
                if (!$(v).hasClass('no-filter'))
                    pluginConstruct.appendFilterInput($(v), clone);
            });

            if (this.rowBeforeFilters.children().last().hasClass('no-filter') && this._options.withOptions) { //ADD OPTIONS CELL
                this.addOptionsCell();
            }
        },
        cacheRowsToFilter: function() {
            var pluginConstruct = this;
            var firstRow = this.filtersRow.next();
            var parent = this.filtersRow.parent();
            var rowsToFilterInTBody = $(this.element).children('tbody').children('tr:not(.no-filter)');

            if (firstRow[0]) {
                this.rowsToFilter = parent.children('tr:not(.no-filter)')
                        .slice(firstRow.index(), firstRow.index() + this._options.filterUpTo);
            }

            if (parent[0].tagName === 'THEAD') {
                var rowsToGo = this._options.filterUpTo - this.rowsToFilter.length;
                if (rowsToGo > 0)
                    $.merge(this.rowsToFilter, rowsToFilterInTBody.slice(0, rowsToGo));
            }

            $.each(this.rowsToFilter, function(i, v) {
                pluginConstruct.initialDisplays[i] = $(v).css('display');
                pluginConstruct.isVisible[i] = true;
                pluginConstruct.isAffectedBy[i] = 0;
            });
//            $(this.rowsToFilter).css('background-color', 'lightblue')
        },
        appendAmountTo: function(selector) {
            if (selector) {
                var rowsShown = $('<label id="rows-shown"/>');
                selector.append(rowsShown);
                rowsShown.text('(' + $(this.rowsToFilter).filter(':visible').length + ')');
            }
        },
        appendFilterInput: function(th, td) {
            var input;
            var filterData;

            if (th.hasClass('number-filter')) {
                var div = $('<div class="row"></div>');
                var col1 = $('<div class="col-5"></div>');
                var col2 = $('<div class="col-2"></div>');
                var col3 = $('<div class="col-5"></div>');
                div.append(col1).append(col2).append(col3);
                filterData = th.attr('filter-data');
                if (filterData)
                    filterData = filterData.split(' ');
                else {
                    var cellValues = [];
                    $.each(this.rowsToFilter, function(i) {
                        cellValues[i] = parseInt($(this).children().eq(td.index()).text());
                    });
                    cellValues = cellValues.sort(function(a, b) {
                        return a > b;
                    });

                    filterData = [cellValues[0], cellValues[cellValues.length - 1]];
                }

                var from = $('<input id="from" type="number"/>');
                var to = $('<input id="to" type="number"/>');
                from.attr('max', filterData[1]).attr('min', filterData[0]).val(filterData[0]);
                to.attr('max', filterData[1]).attr('min', filterData[0]).val(filterData[1]);
                col1.append(from);
                col2.append('-');
                col3.append(to);
                td.append(div);
                this.setupInputForNumber(from, to, div.parent().index());
            } else {
                if (th.hasClass('select-filter')) {
                    input = $('<select>');
                    filterData = th.attr('filter-data');
                    input.append('<option>');
                    if (filterData) {
                        filterData = filterData.split(' ');
                        $.each(filterData, function(i, v) {
                            input.append('<option>' + v);
                        });
                    }
                } else if (th.hasClass('boolean-filter')) {
                    input = $('<input type="checkbox">');
                    input.attr('data-true', th.attr('filter-data'));
                } else {
                    input = $('<input>');
                }
                td.append(input);
                this.setupInput(input);
            }
        },
        setupInput: function(input) {
            if (input[0]) {
                var tagName = input[0].tagName;
                var columnIndex = input.parent().index();
                if (tagName === 'INPUT') {
                    var type = input[0].type;
                    if (type === 'checkbox')
                        this.setupInputForCheckbox(input, columnIndex);
                    else
                        this.setupInputForText(input, columnIndex);
                } else if (tagName === 'SELECT') {
                    this.setupInputForSelect(input, columnIndex);
                }
            }
        },
        setupInputForText: function(input, columnIndex) {
            var pluginConstruct = this;
            input.on('input', function() {
                pluginConstruct.applyCriteria('text', columnIndex, input);
            });
        },
        setupInputForSelect: function(input, columnIndex) {
            var pluginConstruct = this;
            input.change(function() {
                pluginConstruct.applyCriteria('select', columnIndex, input);
            });
        },
        setupInputForCheckbox: function(input, columnIndex) {
            var pluginConstruct = this;
            input.change(function() {
                pluginConstruct.applyCriteria('checkbox', columnIndex, input);
            });
        },
        setupInputForNumber: function(from, to, columnIndex) {
            var pluginConstruct = this;
            var prevFromValue = $(from).val();
            var prevToValue = $(to).val();

            from.on('keypress', function() {
                prevFromValue = $(from).val();
            }).on('input', function(e) {
                var regexp = /^\d*$/;
                if (regexp.test(parseInt($(this).val()))) {
                    pluginConstruct.applyCriteria('number', columnIndex, from);
                } else {
                    $(this).val(prevFromValue);
                }
            });

            to.on('keypress', function() {
                prevToValue = $(to).val();
            }).on('input', function() {
                var regexp = /^\d*$/;
                if (regexp.test(parseInt($(this).val()))) {
                    pluginConstruct.applyCriteria('number', columnIndex, to);
                } else {
                    $(this).val(prevToValue);
                }
            });
        },
        applyCriteria: function(inputType, columnIndex, input) {
            var pluginConstruct = this;
            $(this.isVisible).each(function(i) {
                var row = $(pluginConstruct.rowsToFilter[i]);
                var filterStatusForRow = pluginConstruct.isAffectedBy[i];
                var text = row.children().eq(columnIndex).text();
                var inputValue;
                var inputMatches;
                switch (inputType) {
                    case 'text':
                        inputValue = input.val();
                        inputMatches = text.toLowerCase().contains(inputValue.toLowerCase());
                        break;
                    case 'select':
                        inputValue = input.val();
                        inputMatches = (text === inputValue);
                        break;
                    case 'checkbox':
                        inputValue = input.is(':checked') ? input.attr('data-true') : text;
                        inputMatches = (text === inputValue);
                        break;
                    case 'number':
                        var fromValue = pluginConstruct.$element.find('#from').val();
                        var toValue = pluginConstruct.$element.find('#to').val();
                        inputMatches = fromValue === '' || parseInt(text) >= fromValue;
                        inputMatches &= toValue === '' || parseInt(text) <= toValue;
                        break;
                    default:
                        inputMatches = true;
                }

                if (inputValue === '' || inputValue === null)
                    inputMatches = true;


                if (this == true) { //ROW IS VISIBLE
                    if (!inputMatches) {
                        row.css('display', 'none');
                        pluginConstruct.isVisible[i] = false;
                        pluginConstruct.isAffectedBy[i] |= pluginConstruct.columnsToFilter[columnIndex].filterBinaryId;
                    }
                }
                else { //ROW IS HIDDEN
                    if (inputMatches) {
                        if (!pluginConstruct.isAffectedByOtherFilters(columnIndex, filterStatusForRow)) {
                            row.css('display', pluginConstruct.initialDisplays[i]);
                            pluginConstruct.isVisible[i] = true;
                        }
                        pluginConstruct.isAffectedBy[i] &= ~pluginConstruct.columnsToFilter[columnIndex].filterBinaryId;
                    }
                    else {
                        pluginConstruct.isAffectedBy[i] |= pluginConstruct.columnsToFilter[columnIndex].filterBinaryId;
                    }
                }
            });

            $(this.element).find('#rows-shown').text('(' + $(this.rowsToFilter).filter(':visible').length + ')');
        },
        isAffectedByOtherFilters: function(columnIndex, filterStatusForRow) {
            return filterStatusForRow !== this.columnsToFilter[columnIndex].filterBinaryId;
        },
        addOptionsCell: function() {
            var pluginConstruct = this;
            this.optionsCell = this.filtersRow.children().last();
            this.optionsCell.attr('id', 'options');
            var row = $('<div class="row"></div>');
            this.optionsCell.append(row);
            var col1 = $('<div id="clear-filters" class="col-6" title="Clear filters"></div>');
            var col2 = $('<div id="generate-report" class="col-6" title="Generate report"></div>');
            row.append(col1).append(col2);
            col1.append($('<i class="fa fa-ban"></i>'));
            col1.click(function() {
                pluginConstruct.clearFilters();
            });
            var reportButton = $('<i class="fa fa-file"></i>');
            col2.append(reportButton);
        },
        clearFilters: function() {
            $.each(this.filtersRow.children(), function() {
                var input = $(this).find(':input');
                if (input[0]) {
                    var tagName = input[0].tagName;
                    if (tagName === 'INPUT') {
                        if (input[0].type === 'checkbox')
                            $(input).prop('checked', false).change();
                        else if (input[0].type === 'number' && input[1].type === 'number') {
                            $(input[0]).val($(input).attr('min')).trigger('input');
                            $(input[1]).val($(input).attr('max')).trigger('input');
                        }
                        else
                            $(input).val('').trigger('input');

                    } else if (tagName === 'SELECT') {
                        $(input).val(0).change();
                    }
                }
            });
        },
        // Remove plugin instance completely
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
        },
        // Bind events that trigger methods
        bindEvents: function() {

//            var plugin = this;
//
//            $(plugin.element).on('click' + '.' + plugin._name, function() {
//                plugin.someOtherFunction.call(plugin);
//            });
        },
        // Unbind events that trigger methods
        unbindEvents: function() {
            this.$element.off('.' + this._name);
        },
        callback: function() {
            // Cache onComplete option
            var onComplete = this._options.onComplete;

            if (typeof onComplete === 'function') {
                onComplete.call(this.element);
            }
        }

    });

    $.fn.FilterTable = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new _construct(this, options));
            }
        });
        return this;
    };

    $.fn.FilterTable.defaults = {
        rowBeforeFilters: 0,
        filterUpTo: 999999,
        withOptions: true,
        appendAmountTo: null,
        onComplete: null
    };

})(jQuery, window, document);