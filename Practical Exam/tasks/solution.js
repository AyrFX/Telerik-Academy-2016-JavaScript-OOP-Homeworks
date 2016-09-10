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

	return {
		getBook: function (name, isbn, genre, description) {
			/*var i,
				book = Object.create(item);

			book.id = idCounter++;
			checkItemName(name);
			book.name = name;
			checkBookIsbn(isbn);
			book.isbn = isbn;
			checkBookGenre(genre);
			book.genre = genre;
			checkItemDescription(description);
			book.description = description;*/

			return Object.create(book).init(name, isbn, genre, description);
		},

		getMedia: function (name, rating, duration, description) {
			// return a media instance
		},

		getBookCatalog: function (name) {
			// return a book catalog instance
		},

		getMediaCatalog: function (name) {
			// return a media catalog instance
		}
	};
}

module.exports = solve;
