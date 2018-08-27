var studentFactory = function() {
  let numClass = 'num-' + studentCount;

  // create person div
  $('<div class="person ' + numClass + '"/>')
    .html('<strong>Student #' + studentCount + '</strong><br>')
    .append(
      $('<input>')
      .attr({type: "text",
              dataToggle : "tooltip",
              title: "Enter the name"})
      .val("Name")
      .addClass('name'))
    .appendTo('.container');

  // create and fill div for grades
  let gradesDiv = $('<div class="grades ' + numClass + '"/>');
  let gradeEls = [];
  let qualClasses = ["but-bad",      "but-bad",
                   "but-bad",      "but-bad",
                   "but-mediocre", "but-mediocre",
                   "but-good",     "but-good",
                   "but-great",    "but-great"];

  for (let i = 0; i < 10; i++) {
    gradeEls[i] = $('<div class="grade grade-buttons"/>');

    // add grade button
    $('<button>')
      .attr({
        dataToggle: "tooltip",
        title: '"Add grade of ' + (i+1) + ' (type ' + (i+1) + ' or click)',
      })
      .addClass("grade " + qualClasses[i])
      .html(i+1)
      .appendTo(gradeEls[i])
      .click(function() {
        $(this).siblings().filter("input").get(0).value++;
      });

    // add input that shows number of grades
    $('<input>')
      .attr({
        dataToggle: "tooltip",
        title: "Number of grades of the value" + (i+1),
      })
      .addClass("grade grade" + (i+1))
      .appendTo(gradeEls[i])
      .hide()
      .val("0");

    // add a minus button
    $('<button>')
      .attr({
        dataToggle: "tooltip",
        title: "Decrement"
      })
      .addClass("grade grade" + (i+1) + " minus")
      .html("-")
      .appendTo(gradeEls[i])
      .hide()
      .click(function() {
        let u = $(this).siblings().filter("input").get(0);
        if (u.value > 0) {
          u.value--;
        };
      });

    // append the element to gradesDiv
    gradeEls[i].appendTo(gradesDiv);
  };
  gradesDiv.appendTo(".container");

  // controls
  let controlsDiv = $("<div>");
  controlsDiv.addClass("controls " + numClass);
  $('<button>')
    .addClass("plus " + numClass)
    .html("+")
    .attr({
      dataToggle: "tooltip",
      title: "Add student"
    })
    .appendTo(controlsDiv);

    $('<button>')
      .addClass("delete " + numClass)
      .html("×")
      .attr({
        dataToggle: "tooltip",
        title: "Delete student"
      })
      .appendTo(controlsDiv);

  controlsDiv.appendTo(".container");

  giveClickListeners();
  focused = studentCount;
  studentCount++;
}
