var studentCount = 1;
var focused = 0;

var deleteStudent = function(elem) {

  let clickedRow;
  if (elem != null) {
    clickedRow = getClickedRow(elem);
  } else {
    clickedRow = studentCount - 1;
  };

  $("div.num-" + clickedRow).remove();
  for (let i = clickedRow; i < studentCount - 1; i++) {
    $("div.num-" + (i + 1) + ",button.num-" + (i + 1))
    .removeClass("num-" + (i + 1))
    .addClass("num-" + i)
    .find("strong")
    .html("Student #" + i);
  };
  studentCount--;
}

var debug = function() {
  for (let i = 1; i < studentCount; i++) {
    $("div.num-" + i)
    .find("strong")
    .html("class = " + i);
  }
}
var studentFactory = function() {
  $(`<div class="person num-` + studentCount + `"><strong>Student #` + studentCount + `</strong><br>
  <input type="text" class="name" data-toggle="tooltip" title="Enter the name" value="Name"></input></div>
  <div class="grades num-` + studentCount + `">
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 1 (type 1 or click)" class="grade but-bad">1</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 2 (type 2 or click)" class="grade but-bad">2</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 3 (type 3 or click)" class="grade but-bad">3</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 4 (type 4 or click)" class="grade but-bad">4</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 5 (type 5 or click)" class="grade but-mediocre">5</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 6 (type 6 or click)" class="grade but-mediocre">6</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 7 (type 7 or click)" class="grade but-good">7</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 8 (type 8 or click)" class="grade but-good">8</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 9 (type 9 or click)" class="grade but-great">9</button></div>
  <div class="grade grade-buttons"><button data-toggle="tooltip" title="Add grade of 10 (type 0 or click)" class="grade but-great">10</button></div></div>
  <div class="controls num-` + studentCount + `" data-toggle="tooltip" title="Add new student"><button class="plus num-` + studentCount + `">+</button>
  <button class="delete num-` + studentCount + `" data-toggle="tooltip" title="Delete student">×</button></div>`).appendTo(".container");
  giveClickListeners();
  focused = studentCount;
  studentCount++;
}

var getClickedRow = function(elem) {
  let classes = elem.className.split(' ');

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].indexOf('num-') == 0) {
      return parseFloat(classes[i].substr(4));
    };
  };
  return -1;
}

var giveClickListeners = function() {

  // input field for name of students
  $(".person.num-" + studentCount + " .name").focus(function() {
    if (this.value === "Name") {
      this.select();
    };
  }).keypress(function(event) {
  // enter
    if (event.which === 13) {
      $(this).blur();
      return;
    };
    // not type in digits (from 0 through 9)
    for (let i = 0; i < 10; i++) {
      if (event.which === i + 48) {
        event.preventDefault();
      };
    };

  });
  // 'student' and 'grades' divs
  $(".person, .grades, .controls").filter(".num-" + studentCount).click(function(event) {
    // get the row clicked
    let clickedRow = getClickedRow(this)
    let rowClass = '.num-' + clickedRow;
    // put out everything else
    $(".person, .grades, .controls").not(rowClass).css("background-color", "unset");

    // change bg to green
    $(rowClass).css("background-color", "rgb(117, 227, 125)");
    // register the color change
    focused = clickedRow;
    // prevent the window's event listener's actions
    // that could put out the new bg right away
    event.stopPropagation();

  }).mouseenter(function() {
    if (focused != getClickedRow(this)) {
      $(this).css("background-color", "rgb(254, 255, 191)");
    };

  }).mouseleave(function() {
    if (focused != getClickedRow(this)) {
      $(this).css("background-color", "unset");
    };
  });

  // "delete" button
  $(".num-" + studentCount + ".delete").click(function() {
    if (studentCount === 2) {return};
    deleteStudent(this);
  });

  // "create" button
  $(".num-" + studentCount + ".plus").click(function(event) {
    studentFactory();
    $("div.person.num-" + focused).trigger("click");
    $("div.num-" + focused + " .name").focus();
    event.stopPropagation();
  });
}
