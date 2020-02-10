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

  You can access the values like this e.g. "value3":

  ```javascript
  var sheetId = "<the sheet id of the published sheet>"
  var tabNr = <the number of the tab of the sheet of the values>
  var dictionary = new GoogleSHeetToObjectConverter().convert(sheetId, tabNr, function(values){
     console.log(values[2][column-name1])
  })
  ```

