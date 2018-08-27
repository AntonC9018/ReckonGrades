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
  let numClass = ".num-" + studentCount;

  // input field for name of students
  $(".person" + numClass + " .name").focusin(function() {
    if (this.value === "Name") {
      this.select();
    };
    $(this).parent().click();
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
  $(".person, .grades, .controls").filter(numClass).click(function(event) {
    // get the row clicked
    let clickedRow = getClickedRow(this)
    let rowClass = '.num-' + clickedRow;

    // put out everything else
    $(".person, .grades, .controls").not(rowClass).css("background-color", "unset");

    // change bg to green
    $(rowClass).css("background-color", "rgb(117, 227, 125)");
    // register the color change
    focused = clickedRow;

    // hide minuses and input boxes
    $("button.grade.minus, input.grade").hide();
    // light up minuses and input boxes
    $(rowClass + " button.grade.minus, " + rowClass + " input.grade")
      .toggle();

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
  $(numClass + ".delete").click(function() {
    // don't do anything if there is only one student left
    if (studentCount === 2) {return};
    $("button.grade.minus, input.grade").hide();
    deleteStudent(this);
  });

  // "create" button
  $(numClass + ".plus").click(function(event) {
    studentFactory();
    $("div.person.num-" + focused).trigger("click");
    $("div.num-" + focused + " .name").focus();
    event.stopPropagation();
  });

  $(".grades" + numClass + " .grade.grade-buttons input").keypress(function(event) {
    if (event.which >= 48 && event.which <= 58) {
      event.stopPropagation();
    } else {
      event.preventDefault();
    };
  }).on('blur', (function() {
    if (this.value === '') {
      this.value = 0;
    };
  }));
}
