function descartes(polynomial) {
	var chngNum = 0;
	var poly = polynomial.toString();
	console.log("Polynomial: " + poly);

	if (poly.charAt(0) != '-' && poly.charAt(0) != '+') // Adds understood +
	{
		var chng = '+';
		poly = chng + poly;
	}

	for (var t = 0; t < poly.length; t++) // Adds understood ^1 to x
	{
		if (poly.charAt(t) == 'x' && poly.charAt(t + 1) != '^') {
			var inc = poly.charAt(t + 1);
			poly = setCharAt(poly, t + 1, '^1 ');
		}
	}

	SignCount(poly);
	console.log("Possible max num of positive zeros: " + chngNum);
	chngNum = 0;
	NegZero(poly);
	console.log("Possible max num of negative zeros: " + chngNum);

	function SignCount(poly) // Counts sign changes
	{
		for (i = 0; i < poly.length; i++) {
			var x = poly.charAt(i);
			if (x == '-' || x == '+') {
				var chg = x;
				for (k = i + 1; k < poly.length; k++) {
					var y = poly.charAt(k);
					if (y == '-' || y == '+') {
						if (y == '-' && y == chg)
							break;
						else if (y == '-' && y != chg) {
							chngNum++;
							break;
						} else if (y == '+' && y == chg)
							break;
						else if (y == '+' && y != chg) {
							chngNum++;
							break;
						}
					}
				}
			}
		}
	}

	function NegZero(poly) // Evaluates polynomial at f(-x) to see how many
	{ // possible negative zeros
		for (i = 0; i < poly.length; i++) {
			var chck = poly.charAt(i);

			if (poly.charAt(i) == '-') {
				for (k = i; k < poly.length; k++) {
					if (poly.charAt(k) == '^') {
						var num = poly.charAt(k + 1);
						var tmp = evenOdd(num);
						break;
					}
				}
				if (chck == '-' && tmp == 1)
					poly = setCharAt(poly, i, '+');
			} else if (poly.charAt(i) == '+') {
				for (j = i; j < poly.length; j++) {
					if (poly.charAt(j) == '^') {
						var num2 = poly.charAt(j + 1);
						var tmp2 = evenOdd(num2);
						if (chck == '+' && tmp2 == 1)
							poly = setCharAt(poly, i, '-');
						break;
					}
				}
			}
		}
		console.log(poly);
		SignCount(poly); // Sends altered polynomial to SignCount
	}

	function setCharAt(str, index, chr) // Function for changing specific character
	{ // at specific index
		if (index > str.length - 1)
			return str;
		return str.substr(0, index) + chr + str.substr(index + 1);
	}

	function evenOdd(num) {
		return num % 2;
	}
}