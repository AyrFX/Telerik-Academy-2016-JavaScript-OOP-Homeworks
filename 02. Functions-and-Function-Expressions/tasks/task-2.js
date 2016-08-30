/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes() {
	var allPrimes = [],
		primesInRange = [],
		i;

	if (arguments.length !== 2) {
		throw 'Given parameters are less or more than two!';
	}

	if (!isNumeric(arguments[0]) || !isNumeric(arguments[1])) {
		throw 'All parameters must be convertable to number!';
	}

	allPrimes = findPrimes(arguments[1]);
	for (i = 0; i < allPrimes.length; i += 1) {
		if (arguments[0] <= allPrimes[i] && allPrimes[i] <= arguments[1]) {
			primesInRange.push(allPrimes[i]);
		}
	}

	return primesInRange;

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	function findPrimes(rangeTop) {
		var i,
			j,
			primes = [],
			isPrime;

		for (i = 2; i <= rangeTop; i += 1) {
			isPrime = true;
			for (j = 2; j < i; j += 1) {
				isPrime = true;
				if (i % j === 0) {
					isPrime = false;
					break;
				}
			}
			if (isPrime) {
				primes.push(i);
			}
		}
		return primes;
	}
}

module.exports = findPrimes;
