// Selve beregningen kommer her
function doMath(tool, usermoment, tooljsfile){

	// Beregner hvilket som kommer nærmest
	$.getJSON("js/" + tooljsfile, function(json) {
	
		var trekketabell = new Array();
		$.each(json.XMLtype.XMLtable, function(key, val) {
			if(val.name == tool) {
				trekketabell = "";
				trekketabell = val.XMLrow;
			}
		
		});
		
		// Nå har vi alle verdiene i tabellene klart - la oss finne den nærmeste.
			var closest = null;
			var closestPSI = null;
		$.each(trekketabell, function(){
				if (closest == null || Math.abs(this.nm - usermoment) < Math.abs(closest - usermoment)) {
				closest = this.nm;
				closestPSI = this.psi;
				}
  		});
  		
  		// Nå har vi funnet den nærmeste verdien. 
	
	
	
  		$("#result").html("("+ closestPSI + " * " + usermoment + ") / " + closest + "= <b style='color:green'>" + ((closestPSI * usermoment) / closest) + "</b>");
	});
	
}
