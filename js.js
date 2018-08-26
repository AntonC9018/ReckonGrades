$(document).ready(function() {
  studentFactory();
  studentFactory();
  studentFactory();

  $(window).click(function() {
    $(".person, .grades, .controls").css("background-color", "unset");
    focused = 0;
  });

  $(window).keypress(function(event) {
    switch (event.which) {
      case '0':
        $("div.num-" + focused).find("button")[9].click();
        break;
      default:
        console.log("pressed");
    };
  });

});
