/* Task Description */
/*
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
	let studentIdCounter = 0,
		homeworkIdCounter = 0,
		coursePresentations = [],
		courseStudents = [];
	var Course = {
		init: function (title, presentations) {
			let i;

			if (title[0] == ' ') {
				throw 'The title of the presentation can not begin with space!';
			}
			if (title[title.length - 1] == ' ') {
				throw 'The title of the presentation can not end with space!';
			}
			this.title = title;

			if (presentations.length === 0) {
				throw 'There are no presentations in the course!';
			};
			for (i = 0; i < presentations.length; i += 1) {
				if (presentations[i] == '') {
					throw 'The title of the presentation can not be empty!';
				}
				if (presentations[i].indexOf('  ') > -1) {
					throw 'The title of the presentation can not contain consecutive spaces!';
				}
			}
			coursePresentations = presentations;
		},
		addStudent: function (name) {
			if (typeof name != 'string') {
				throw 'The name of the student must be a string!';
			}
			if (name.split(' ').length !== 2) {
				throw 'The student should have two names exactly!';
			}
			checkNames(name);
			studentIdCounter++;
			let firstName = name.split(' ')[0],
				lastName = name.split(' ')[1];
			courseStudents.push({
				firstName: firstName,
				lastName: lastName,
				id: studentIdCounter
			});
			return studentIdCounter;
		},
		getAllStudents: function () {
			return courseStudents;
		},
		submitHomework: function (studentID, homeworkID) {
			if (studentID < 1 || studentID > studentIdCounter) {
				throw 'Invalid student ID!';
			}
			if (studentID % 1 !== 0) {
				throw 'The student ID should be a integer!';
			}

			if (homeworkID < 1 || homeworkID > coursePresentations.length) {
				throw 'Invalid Homework ID!';
			}
		},
		pushExamResults: function (results) {},
		getTopStudents: function () {}
	};

	function checkNames(name) {
		let names = name.split(' '),
			i,
			j;

		for (i = 0; i < names.length; i += 1) {
			if (names[i].charCodeAt(0) < 65 || names[i].charCodeAt(0) > 90) {
				throw 'The names of the student should begin with capital letter!';
			}
			for (j = 1; j < names[i].length; j += 1) {
				if (names[i].charCodeAt(j) < 97 || names[i].charCodeAt(j) > 122) {
					throw 'All letters of each name except the first can be only small letters!';
				}
			}
		}

	}

	return Course;
}


module.exports = solve;
