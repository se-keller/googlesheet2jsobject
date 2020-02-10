/**
 * Convert the cells of a puglished GoogleSheet to an JS-Object/Dictionary
 * 
 * |column-name1|column-name2|
 * |value1      |value2      |
 * |value3      |value4      |
 *
 * converts to
 *
 * {
 *   1: {
 *     column-name1: "value1",
 *     column-name2: "value2"
 *   },
 *   2: {
 *     column-name1: "value3",
 *     column-name2: "value4"
 *   }
 * }
 *
 * You can access the values like this e.g. "value3":
 *
 * var sheetId = "<the sheet id of the published sheet>"
 * var tabNr = <the number of the tab of the sheet of the values>
 * var dictionary = new GoogleSheetToObjectConverter().convert(sheetId, tabNr, function(values){
 *    console.log(values[2]["column-name1"])
 * })
 */
function GoogleSheetToObjectConverter() {
	
	/**
	 * Convert the cells of a published GoogleSheet to an JS-Object/Dictionary
	 *
	 * @param spreadsheetId {String} The sheet id of the published sheet
	 * @param tabNr 		{String} The number of the tab of the sheet of the values
	 * @param callback 		{String} the callback function with the values as parameter
	 */
	this.convert = function(spreadsheetId, tabNr, callback) {
		var url = "https://spreadsheets.google.com/feeds/cells/"+spreadsheetId+"/"+tabNr+"/public/full?alt=json"
		this.convertFromUrl(url, callback)
	}

   /**
    * Convert the cells of a published GoogleSheet to an JS-Object/Dictionary
    * 
    * @param spreadsheetUrl {String} The Google Sheet Url in the format https://spreadsheets.google.com/feeds/cells/<SHEET_ID>/<TAB_NR>/public/values?alt=json
    * @param callback 		{String} the callback function with the values as parameter
    */
	this.convertFromUrl = function(spreadsheetUrl, callback) {
		var parent = this
		$.getJSON(spreadsheetUrl, function(json){		
			callback(parent.convertGooglSheetJsonToJsObject(json));	
	  	})
	}

	this.convertGooglSheetJsonToJsObject = function(json) {
		var header = {}
   		var rowEntries = {}
   		for(var position in json["feed"]["entry"]) {
   			var cellValue = json["feed"]["entry"][position]["gs$cell"]["$t"]
   			var cellRow = json["feed"]["entry"][position]["gs$cell"]["row"]
   			var cellCol = json["feed"]["entry"][position]["gs$cell"]["col"]

   			if(cellRow == "1") {
  				header[position] = cellValue
   			} else {
   				if(rowEntries[cellRow-1] === undefined)
   					rowEntries[cellRow-1] = {}
   				var headerOfValue = header[cellCol-1]
   				if(!headerOfValue)
   					throw new Error("incorrect formated sheet: no cells without header (first row)")
   				rowEntries[cellRow-1][headerOfValue] = cellValue
   				
   			}
  		}
  		return rowEntries
	}
	
}