function showTools(toolname){
	
	var userInput = $("#momentIn").attr('value');
	userInput = parseInt(userInput);
	
	$.getJSON("js/" + toolname.toLowerCase() + ".json", function(json) {
	
		// For hvert verktøy i tabellen på valgt verktøy
		$.each(json.XMLtype.XMLtable, function(key, val) {
		
		var demoArr = $.makeArray(val.XMLrow);
		
		// Konverterer minimum/maksimumsverdier og konverterer til integer.
		var minV = demoArr[0].nm;
		minV = parseInt(minV);
		var maxV = demoArr[demoArr.length - 1].nm;
		maxV = parseInt(maxV);
		
		
		if(userInput >= minV && userInput <= maxV) {
			$("#avTools").append("<li><a href='#' onclick=\"doMath(" + "'" +val.name + "'," + "'" + userInput + "','" + toolname.toLowerCase() + ".json'"  + ")\">" + val.name+"</a></li>");
		}
		
		});
		
		// Gir feilmelding hvis ingenting ble funnet..
		if( !$.trim( $('#avTools').html() ).length ) {
		$("#errorMsg").html("<p style='color:red'>Fant ingen verktøy.</p>");
		}
	});
}
