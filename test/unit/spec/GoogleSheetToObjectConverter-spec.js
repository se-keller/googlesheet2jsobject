describe("GoogleSheetToObjectConverter", function() {
  // SHEET-URL			https://docs.google.com/spreadsheets/d/1BH3TzJ-GH-Syx9dGb1tBQpMq4atVFPFwnq3hGlgFL38/edit#gid=0
  // SHEET-ID			1BH3TzJ-GH-Syx9dGb1tBQpMq4atVFPFwnq3hGlgFL38
  // published to 		https://docs.google.com/spreadsheets/d/e/2PACX-1vQPcxnXj7ikAZ77Zx5hRdAwXvWzXScN_jvdGmTpeA_YLtdn55mDk7xH1MTX-UmwtYPN2cmcs11Gqt2R/pubhtml
  // CSV-Template URL   https://docs.google.com/spreadsheets/d/<KEY>/export?format=csv&id=<KEY>&gid=<GID>
  // CSV-URL 			https://docs.google.com/spreadsheets/d/e/2PACX-1vQPcxnXj7ikAZ77Zx5hRdAwXvWzXScN_jvdGmTpeA_YLtdn55mDk7xH1MTX-UmwtYPN2cmcs11Gqt2R/pub?output=csv
  // JSON-Template URL 	https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/full?alt=json
  // JSON-URL			https://spreadsheets.google.com/feeds/cells/1BH3TzJ-GH-Syx9dGb1tBQpMq4atVFPFwnq3hGlgFL38/1/public/full?alt=json
  	var converter
    beforeEach(function() {
      converter = new GoogleSheetToObjectConverter()
  	});

  	it("can convert first row to key and remaining rows to values of object", function(){
      var json = {
        feed: {
          entry: [
            {gs$cell: {row: "1", col: "1", inputValue: "TEST_HEADER"}},
            {gs$cell: {row: "2", col: "1", inputValue: "TEST_VALUE"}}
          ]
        }
      }
      var object = converter.convertGooglSheetJsonToJsObject(json)
      expect(object[1]["TEST_HEADER"]).toBeDefined()
      expect(object[1]["TEST_HEADER"]).toEqual("TEST_VALUE")
  	});

    it("can not convert cell without header", function(){
      var json = {
        feed: {
          entry: [
            {gs$cell: {row: "2", col: "1", inputValue: "TEST_VALUE"}}
          ]
        }
      }
      expect(function(){converter.convertGooglSheetJsonToJsObject(json)}).toThrowError("incorrect formated sheet: no cells without header (first row)")
      converter.convert("1BH3TzJ-GH-Syx9dGb1tBQpMq4atVFPFwnq3hGlgFL38", 1, function(object){
        console.log(object)
      })
      
    });

})