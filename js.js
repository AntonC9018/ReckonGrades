$(document).ready(function() {
  studentFactory();
  studentFactory();
  studentFactory();

  $(window).click(function() {
    $(".person, .grades, .controls").css("background-color", "unset");
    $("button.grade.minus, input.grade").hide();
    focused = 0;
  });

  $(window).keypress(function(event) {
    if (focused === 0) return;
    for (let i = 0; i < 10; i++) {
      if (event.which === i + 48) {
        $("div.num-" + focused + " .grade-buttons")
          .find("button")
          .not(".minus")
          .get( (i === 0) ? 9 : i-1)
          .click();
        };
      };
  });

  $(".submit").click(submit);
});
