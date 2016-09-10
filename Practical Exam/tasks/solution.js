function solve() {
	item = (function (parent) {
		let idCounter = 0,
			item = Object.create(parent, {
				name: {
					get: function () {
						return this._name;
					},
					set: function (name) {
						checkItemName(name);
						this._name = name;
					}
				},
				description: {
					get: function () {
						return this._description;
					},
					set: function (description) {
						checkItemDescription(description);
						this._description = description;
					}
				}
			});

		item.init = function (name, description) {
			this.id = ++idCounter;
			this.name = name;
			this.description = description;
			return this;
		}

		return item;
	}({}));

	book = (function (parent) {
		let book = Object.create(parent, {
			isbn: {
				get: function () {
					return this._isbn;
				},
				set: function (isbn) {
					checkBookIsbn(isbn);
					this._isbn = isbn;
				}
			},
			genre: {
				get: function () {
					return this._genre;
				},
				set: function (genre) {
					checkBookGenre(genre);
					this._genre = genre;
				}
			}
		});

		book.init = function (name, isbn, genre, description) {
			parent.init.call(this, name, description);
			this.isbn = isbn;
			this.genre = genre;
			return this;
		}

		return book;
	}(item));

	media = (function (parent) {
		let media = Object.create(parent, {
			duration: {
				get: function () {
					return this._duration;
				},
				set: function (duration) {
					checkMediaDuration(duration);
					this._duration = duration;
				}
			},
			rating: {
				get: function () {
					return this._rating;
				},
				set: function (rating) {
					checkMediaRating(rating);
					this._rating = rating;
				}
			}
		});

		media.init = function (name, rating, duration, description) {
			parent.init.call(this, name, description);
			this.duration = duration;
			this.rating = rating;

			return this;
		}

		return media;
	}(item));

	catalog = (function () {
		let idCounter = 0;
		catalog = Object.create({}, {
			name: {
				get: function () {
					return this._name;
				},
				set: function (name) {
					checkItemName(name);
					this._name = name;
				}
			},
			items: {
				get: function () {
					return this._items;
				},
				set: function (items) {
					this._items = items;
				}
			}
		});

		catalog.init = function (name) {
			this._id = ++idCounter;
			this.name = name;
			this.items = [];

			return this;
		}

		catalog.add = function () {
			let i,
				items;

			if (arguments.length < 1) {
				throw 'No arguments passed!';
			}
			if (arguments.length == 1 && Array.isArray(arguments[0])) {
				items = arguments[0];
			} else {
				items = arguments;
			}
			for (i = 0; i < items.length; i += 1) {
				if (typeof items[i] !== 'object') {
					throw 'No all items are objects!';
				} else if (items[i].id == undefined || items[i].name == undefined || items[i].description ==
					undefined) {
					throw 'No all objects are item-like!';
				}
			}
			for (i = 0; i < items.length; i += 1) {
				this.items.push(items[i]);
			}

			return this;
		}

		catalog.find = function (criteria) {
			let item;
			if (criteria == undefined) {
				throw 'No id or options object given!';
			}
			if (typeof criteria == 'object') {
				item = this.items.filter(function (currentItem) {
					var idPass = false,
						namePass = false,
						genrePass = false;
					if (criteria.id && currentItem.id == criteria.id) {
						idPass = true;
					} else if (criteria.id) {
						idPass = false;
					} else {
						idPass = true;
					}
					if (criteria.name && currentItem.name == criteria.name) {
						namePass = true;
					} else if (criteria.name) {
						namePass = false;
					} else {
						namePass = true;
					}
					if (criteria.genre && currentItem.genre == criteria.genre) {
						genrePass = true;
					} else if (criteria.genre) {
						genrePass = false;
					} else {
						genrePass = true;
					}

					return idPass && namePass && genrePass;
				});

				return item;
			} else {
				if (typeof criteria !== 'number') {
					throw 'The id should be a number!';
				}
				item = this.items.find(function (currentItem) {
					return currentItem.id == criteria;
				});

				if (item) {
					return item;
				} else {
					return null;
				}
			}
		}

		catalog.search = function (item) {

		}

		return catalog;
	}());

	bookCatalog = (function (parent) {
		let bookCatalog = Object.create(parent, {});

		bookCatalog.init = function (name) {
			parent.init.call(this, name);

			return this;
		}

		bookCatalog.getGenres = function () {
			let i,
				uniqueGenres = [],
				currentGenre;

			for (i = 0; i < this.items.length; i += 1) {
				currentGenre = this.items[i].genre.toLowerCase();
				if (uniqueGenres.indexOf(currentGenre) == -1) {
					uniqueGenres.push(currentGenre);
				}
			}

			return uniqueGenres.slice();
		}

		/*bookCatalog.add = function () {
			if ()
		}*/

		return bookCatalog;
	}(catalog));

	//=======

	function checkItemName(name) {
		if (typeof name !== 'string') {
			throw 'Name should be a string!';
		}
		if (name.length < 2 || name.length > 40) {
			throw 'Invalid name!';
		}
	}

	function checkItemDescription(description) {
		if (typeof description !== 'string') {
			throw 'Description should be a string!';
		}
		if (description == '') {
			throw 'The description can not be empty!';
		}
	}

	function checkBookIsbn(isbn) {
		if (typeof isbn !== 'string') {
			throw 'ISBN should be a string!';
		}
		if (isbn.length !== 10 && isbn.length !== 13) {
			throw 'Invalid ISBN length!';
		}
		for (i = 0; i < isbn.length; i += 1) {
			if (isbn.charCodeAt(i) < 48 || isbn.charCodeAt(i) > 57) {
				throw 'Invalid ISBN!';
			}
		}
	}

	function checkBookGenre(genre) {
		if (typeof genre !== 'string') {
			throw 'Genre should be a string!';
		}
		if (genre.length < 2 || genre.length > 20) {
			throw 'Invalid genre length!';
		}
	}

	function checkMediaDuration(duration) {
		if (typeof duration !== 'number') {
			throw 'The duration should be a number!';
		}
		if (duration < 1) {
			throw 'The duration should be greather than 0!';
		}
	}

	function checkMediaRating(rating) {
		if (typeof rating !== 'number') {
			throw 'The rating should be a number!';
		}
		if (rating < 1 || rating > 5) {
			throw 'The rating should be between 1 and 5!';
		}
	}

	//=======

	return {
		getBook: function (name, isbn, genre, description) {
			return Object.create(book)
				.init(name, isbn, genre, description);
		},

		getMedia: function (name, rating, duration, description) {
			return Object.create(media)
				.init(name, rating, duration, description);
		},

		getBookCatalog: function (name) {
			return Object.create(bookCatalog)
				.init(name);
		},

		getMediaCatalog: function (name) {
			// return a media catalog instance
		}
	};
}

module.exports = solve;
