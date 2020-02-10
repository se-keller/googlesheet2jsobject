describe("GoogleSheetToObjectConverter", function() {
  	var converter
    beforeEach(function() {
      converter = new GoogleSheetToObjectConverter()
  	});

  	it("can convert first row to key and remaining rows to values of object", function(){
      var json = {
        feed: {
          entry: [
            {gs$cell: {row: "1", col: "1", $t: "TEST_HEADER"}},
            {gs$cell: {row: "2", col: "1", $t: "TEST_VALUE"}}
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
            {gs$cell: {row: "2", col: "1", $t: "TEST_VALUE"}}
          ]
        }
      }
      expect(function(){converter.convertGooglSheetJsonToJsObject(json)}).toThrowError("incorrect formated sheet: no cells without header (first row)")
    });
})