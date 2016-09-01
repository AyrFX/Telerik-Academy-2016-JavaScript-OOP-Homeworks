/* Task Description */
/*
 ---*	Create a module for working with books
 ---*	The module must provide the following functionalities:
 ---*	Add a new book to category
 ---*	Each book has unique title, author and ISBN
 ---*	It must return the newly created book with assigned ID
 ---*	If the category is missing, it must be automatically created
 ---*	List all books
 ---*	Books are sorted by ID
 ---*	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 ---*	Add validation everywhere, where possible
 ---*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 ---*	Author is any non-empty string
 ---*	Unique params are Book title and Book ISBN
 ---*	Book ISBN is an unique code that contains either 10 or 13 digits
 ---*	If something is not valid - throw Error
 */
function solve() {
	var library = (function () {
		var books = [],
			categories = [],
			i;

		function listBooks() {
			var tempArray = [],
				criteriaBook = arguments[0];

			books.sort(function (a, b) {
				return a.id - b.id;
			});

			if (arguments.length > 0) {
				if (criteriaBook.author !== undefined) {
					tempArray = books.filter(function (currentBook) {
						if (currentBook.author == criteriaBook.author) {
							return true;
						} else {
							return false;
						}
					});
					return tempArray;
				} else if (criteriaBook.category !== undefined) {
					tempArray = books.filter(function (currentBook) {
						if (currentBook.category == criteriaBook.category) {
							return true;
						} else {
							return false;
						}
					});
					return tempArray;
				}
			}
			return books;
		}

		function addBook(book) {
			book.ID = books.length + 1;

			validateString(book.title, 'title');
			validateString(book.category, 'category');
			if (book.author == '') {
				throw 'Each book needs to have an author!';
			}
			validateIsbn(book.isbn);
			checkForSameTitle(book.title);
			checkForSameIsbn(book.isbn);

			books.push(book);

			if (!sameCategoryExists(book.category)) {
				categories.push(book.category);
			}

			return book;
		}

		function listCategories() {
			categories = categories.sort(function (a, b) {
				return a - b;
			});
			return categories;
		}

		//=======

		function validateString(title, field) {
			if (typeof title !== 'string') {
				throw `The ${field} should be a string!`;
			}

			if (title.length < 2 || title.length > 100) {
				throw `The ${field} can be between 2 and 100 characters long!`;
			}

			for (i = 0; i < title.length; i += 1) {
				if (title.charCodeAt(i) < 32 || title.charCodeAt(i) > 126) {
					throw `The ${field} should contain only letters, digits and special characters!`;
				}
			}
		}

		function validateIsbn(isbn) {
			if (isbn < 1000000000 ||
				(isbn > 9999999999) && (isbn < 1000000000000) ||
				isbn > 9999999999999) {
				throw 'The ISBN should have 10 or 13 digits!';
			}
		}

		function checkForSameTitle(title) {
			for (i = 0; i < books.length; i += 1) {
				if (books[i].title == title) {
					throw 'Book with the same title already exists in the library!';
				}
			}

		}

		function checkForSameIsbn(isbn) {
			for (i = 0; i < books.length; i += 1) {
				if (books[i].isbn == isbn) {
					throw 'Book with the same isbn already exists in the library!';
				}
			}

		}

		function sameCategoryExists(category) {
			for (i = 0; i < categories.length; i += 1) {
				if (categories[i] == category) {
					return true;
				}
			}
			return false;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());
	return library;
}
module.exports = solve;
