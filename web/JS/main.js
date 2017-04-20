window.setTimeout(setUp, 500);

function validateForm() {
	var name = document.getElementById("assignmentName");
	var description = document.getElementById("assignmentDescription");
	var assignDate = document.getElementById("assignDate");
	var dueDate = document.getElementById("dueDate");
	if (name.value == null || name.value=="" || description.value==null || description.value=="") {
		alert("Please Fill All Required Field");
	    return false;
	}
    else if (!Date.parse(assignDate.value) || !Date.parse(dueDate.value)) {
		alert("Please Fill All Required Field");
	    return false;
   	}
   	else {

    	return true;
   	}
}

function setUp () {
	var x = document.getElementById("courses");
	if (x.firstElementChild) {
		console.log(x.firstElementChild);
		console.log("hello");
		x.firstElementChild.click();
	}

}

/** Appends Courses to the Course section Expecting JSON:
{
	courseID: [
		{course: STRING,
		 department: STRING, 
		 courseNumber: STRING, 
		 year : integer, 
		 term : integer}
	],
}
**/

function openCourseItems(courseID, course_item_list){
	console.log('clicking on open courseItem');
	//document.getElementById("courseItemDescription").value = ""
	var elements = document.getElementsByClassName('courseItemDescription');
	var elements2 = document.getElementById('documents')
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    while (elements2.firstChild) {
   	 	elements2.removeChild(elements2.firstChild);
	}



	course = document.getElementById(courseID);

	var addClass = "highlight";

	$(".courses").removeClass(addClass);
	$("#" + courseID).addClass(addClass);

	// var courses = document.getElementsByClassName("courses");

	// for (var x=0; x<courses.length; x++){
	// 	courses[x].removeClass(addClass)
		
	// }
	console.log(courseID)

	course_items = course_item_list[courseID];
	//document.getElementById('courseid').value = courseID;
	//console.log(course_item_list)
	
	var correctedJSON;

	populateCourseItems(courseID,course_item_list);
	
	//course.addEventListener("click", populateCourseItems);

}

function populateCourses(courseJSON) {
	console.log(courseJSON)
	for (var i in courseJSON) {

		// Create tag
		var course = document.createElement('p');
		course.innerHTML = createCoursesString(courseJSON, i);
		course.id = i; // id is the courseID
		console.log('adding a listener')
		course.addEventListener("click", populateCourseItems);

		// Append to div
		var courseDiv = document.getElementById("courses");
		courseDiv.appendChild(course);
	}
}

/** 
DUMMY DATA
**/
// var courseItemJSON= {
// 	0: [{ courseItemId: 0, creator: "BOB", creationTime: "10/0/2017", name: "Assignment", body: "shared memory assignment", assigned_date: "10/2/2017", due_date: "10/25/2017"},
// 		{ courseItemId: 1, creator: "BOB0", creationTime: "10/0/2017", name: "Assignment0", body: "shared memory assignment", assigned_date: "10/2/2017", due_date: "10/25/2017"},
// 		{ courseItemId: 2, creator: "BOB00", creationTime: "10/0/2017", name: "Assignment00", body: "shared memory assignment", assigned_date: "10/2/2017", due_date: "10/25/2017"},
// 		{ courseItemId: 3, creator: "BOB000", creationTime: "10/0/2017", name: "Assignment000", body: "shared memory assignment", assigned_date: "10/2/2017", due_date: "10/25/2017"},
// 		{ courseItemId: 4, creator: "BOB0000", creationTime: "10/0/2017", name: "Assignment0000", body: "shared memory assignment", assigned_date: "10/2/2017", due_date: "10/25/2017"}
// 		],
// 	1: [{ courseItemId: 1, creator: "BOB1", creationTime: "10/1/2017", name: "Assignment1", body: "Linked Lists", assigned_date: "10/2/2017", due_date: "10/25/2017"}],
// 	2: [{ courseItemId: 2, creator: "BOB2", creationTime: "10/2/2017", name: "Assignment2", body: "eigen values", assigned_date: "10/2/2017", due_date: "10/25/2017"}],
// 	3: [{ courseItemId: 3, creator: "BOB3", creationTime: "10/3/2017", name: "Assignment3", body: "sheet reading", assigned_date: "10/2/2017", due_date: "10/25/2017"}],
// }

/** 
DUMMY DATA
**/
function populateCourseItems(aCourseID, courseItemJSON) {
	var courseID = aCourseID
	//console.log('Clicked on a course');
	document.getElementById('courseid').value = courseID;
	//console.log(document.getElementById('courseid').value)
	var courseItems;
	var courseItemDiv = document.getElementById("courseItems");

	// basically the table look up: courseItems = getTable(courseID)
	console.log("printing out the json part")
	console.log(courseItemJSON)

	for (var i in courseItemJSON) {
		//console.log("printing out the json part")
		//console.log(courseItemJSON[i])
		if (i == courseID) {
			courseItems = courseItemJSON[i];
			//console.log("courseItemJSON[i] ", courseItemJSON[i])
			break;
		}
	}
	//console.log('courseItems' + courseItems);
	// clear current list
	while (courseItemDiv.firstChild) {
   	 	courseItemDiv.removeChild(courseItemDiv.firstChild);
	}

	for (var i in courseItems) {
		console.log(courseItems);
		console.log(i);
		var correctedJSON = JSON.parse(courseItems[i]);
		console.log(correctedJSON)
		console.log(correctedJSON.name)

		console.log("printing courseitem in json")
		// Create tag
		var courseItemID = 0;
		var courseItemTag = document.createElement('p');
		courseItemTag.innerHTML = correctedJSON.name
		courseItemTag.id = courseID; // id is the courseID
		courseItemTag.class = correctedJSON.courseItemId;
		console.log("consolel loasdfad" + courseItemTag.class);
		

		// Append to div
		courseItemDiv.appendChild(courseItemTag);
		//console.log("test" , courseItemJSON[courseID])
		courseItemID = correctedJSON.courseItemId;

		(function(_courseItemID) {
			courseItemTag.addEventListener("click", function(){populateCourseItemDescription(courseID, courseItemJSON, _courseItemID)});	
		})(courseItemID);

		(function(_courseItemID) {
			courseItemTag.addEventListener("click", function(){populateDocuments(courseID, courseItemJSON, _courseItemID)});	
		})(courseItemID);
		
	}

	// Function in chat
	console.log("This is populating");
	getCourseItems();
}

function populateDocuments(courseID, courseItemJSON, aCourseItemID){
	console.log("hello from the otherside")
	var courseID = courseID
	var courseItemID = aCourseItemID
	var courseItems;
	var courseItemDes = document.getElementById("documents");
	document.getElementById("courseitemid").value = courseItemID;
	console.log("printing out all the fun stuff")
	console.log(document.getElementById(courseID.toString()).value)

	console.log(courseItemJSON)



	for (var i in courseItemJSON) {
		if (i == courseID) {
			console.log("enters courseiD secitons");
			for (var j in courseItemJSON[i]) {
				console.log(courseItemJSON[i][j])
				var prettyjson = JSON.parse(courseItemJSON[i][j])
				if (prettyjson.courseItemId == courseItemID){
					console.log("enters the deepest levels");
					courseItems = prettyjson;
					break;
				}

			}
			break;
		}
	}
	
	// clear current list
	while (courseItemDes.firstChild) {
   	 	courseItemDes.removeChild(courseItemDes.firstChild);
	}


	var assignmentname = courseItems.name

	for (var i in courseItems) {
		if(i == "documents"){
			var k = 1;
			for (var j in courseItems[i]){
				var res = courseItems[i][j].split(":");
				var courseItemTag = document.createElement('p');
				console.log(courseItems[i])
				courseItemTag.className += "documents"
				courseItemTag.innerHTML = courseItems[i]
				//courseItemDes.appendChild(courseItemTag);
				var link = document.createElement('a');
				link.textContent = res[0];
				link.href = 'http://localhost:8080/upload_view_document/' + res[1];
				courseItemDes.appendChild(link);
				linebreak = document.createElement("br")
				courseItemDes.appendChild(linebreak)
				k= k+1
			}




		}
		/*
		if(i == "courseItemId") {
			continue;
		}
		if(i == "documents"){
			continue;
		}
		// Create tag
		var courseItemTag = document.createElement('p');
		courseItemTag.innerHTML = i + ": " + courseItems[i];
		courseItemTag.className += "courseItemDescription"
		//console.log(courseItemTag.innerHTML)
		// Append to div
		courseItemDes.appendChild(courseItemTag);
		*/
		}







}


// Mostly just copy and pasted, logic should be relooked at
function populateCourseItemDescription(aCourseID, courseItemJSON, aCourseItemID) {
/*
	console.log(courseItemJSON)
	var courseItemDes = document.getElementById("courseItemDescriptions");
	document.getElementById("courseitemid").value = aCourseItemID;

	for (var i in courseItemJSON) {
		if(i == "courseItemId") {
			continue;
		}
		if(i == "documents"){
			continue;
		}
		// Create tag
		var courseItemTag = document.createElement('p');
		courseItemTag.innerHTML = i + ": " + courseItemJSON[i];
		courseItemTag.className += "courseItemDescription"
		//console.log(courseItemTag.innerHTML)
		// Append to div
		courseItemDes.appendChild(courseItemTag);
		}
*/


	//console.log(aCourseID + " " + aCourseItemID)
	var courseID = aCourseID
	var courseItemID = aCourseItemID
	var courseItems;
	var courseItemDes = document.getElementById("courseItemDescriptions");
	document.getElementById("courseitemid").value = courseItemID;

	console.log(courseItemJSON)

	for (var i in courseItemJSON) {
		if (i == courseID) {
			console.log("enters courseiD secitons");
			for (var j in courseItemJSON[i]) {
				console.log(courseItemJSON[i][j])
				var prettyjson = JSON.parse(courseItemJSON[i][j])
				if (prettyjson.courseItemId == courseItemID){
					console.log("enters the deepest levels");
					courseItems = prettyjson;
					break;
				}

			}
			break;
		}
	}
	
	// clear current list
	while (courseItemDes.firstChild) {
   	 	courseItemDes.removeChild(courseItemDes.firstChild);
	}



	for (var i in courseItems) {
		if(i == "courseItemId") {
			continue;
		}
		if(i == "documents"){
			continue;
		}
		// Create tag
		var courseItemTag = document.createElement('p');
		courseItemTag.innerHTML = i + ": " + courseItems[i];
		courseItemTag.className += "courseItemDescription"
		//console.log(courseItemTag.innerHTML)
		// Append to div
		courseItemDes.appendChild(courseItemTag);

		}


/*
	(function(_courseItemID) {
			courseItemTag.addEventListener("click", function(){populateCourseItemDescription(courseID, courseItemJSON, _courseItemID)});	
		})(courseItemID);
		
	}
*/

}

// Creates the string for the user
function createCoursesString(courseJSON, i) {
	var term;
	switch ( courseJSON[i][0].term) {
		case 0: 
			term = "Fall";
			break;
		case 1:
			term = "Spring"
			break;
		case 2:
			term = "Summer"
			break;
		default:
			console.log("invalid term number: " + term);
	}

	return courseJSON[i][0].department + " " + courseJSON[i][0].courseNumber + " " + courseJSON[i][0].course + " (" + courseJSON[i][0].year + " " + term + ")";
}

function createCourseItemString(courseItem, i) {
	console.log(courseItem)
	console.log(i)
	return courseItem[i].name;
}

// function teCourseItemDescriptionString(courseItems, i) {
// 	return courseItem[i].name;
// }