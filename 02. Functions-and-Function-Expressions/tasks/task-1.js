/* Task Description */
/*
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number

*/

function sum() {
	var i,
		sum = 0;
	if (arguments.length == 0) {
		throw ' No parameters passed';
	}

	if (!Array.isArray(arguments[0])) {
		throw 'The given parameter is not array!';
	}

	if (arguments[0].length < 1) {
		return null;
	}

	for (i = 0; i < arguments[0].length; i += 1) {
		if (!isNumeric(arguments[0][i] * 1)) {
			throw 'Not all emelents of the array are numeric!';
		}
		sum += arguments[0][i] * 1;
	}

	return sum;

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
}

module.exports = sum;
