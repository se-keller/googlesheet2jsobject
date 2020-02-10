# googlesheet2jsobject

__Converts the cells of a published GoogleSheet to an JS-Object/JS-Dictionary__

  column-name1|column-name2
  ------------|------------
  value1      |value2      
  value3      |value4      
 
  converts to
 
    {
      1: {
        column-name1: "value1",
        column-name2: "value2"
      },
      2: {
        column-name1: "value3",
        column-name2: "value4"
      }
    }
 
 ## Example Code

 Here you can see how to publish a GoogleSheet: https://support.google.com/docs/answer/183965
 After publishing you need the GoogleSheet Id of the original GoogleSheet, not the published.
 
 For Example:
     
     https://docs.google.com/spreadsheets/d/ <!!!THIS_ID!!!> /edit#gid=0

 If you want, you can look at the JSON file of the GoogleSheet by using this URL template
     
     https://spreadsheets.google.com/feeds/cells/<GOOGLE_SHEET_ID>/<TAB_NR>/public/full?alt=json

  You can access the values like this e.g. "value3":

  ```javascript
  var sheetId = "<the_sheet_id_of_the_published_sheet>"
  var tabNr = <the_number_of_the_tab_of_the_sheet_of_the_values>
  var dictionary = new GoogleSheetToObjectConverter().convert(sheetId, tabNr, function(values){
     console.log(values[2]["column-name1"])
  })
  ```



