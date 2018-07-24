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
