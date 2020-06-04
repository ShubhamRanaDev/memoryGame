//#region declaration
let imgsrc = [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0]
];
let random;
let check = [];
let checkobj = [];
let pairs = 0;
let x, score = 0;




//#endregion

//#region RandomImg
for (let i = 0; i < 16; i++) {
    random = Math.floor(Math.random() * 8);
    if (imgsrc[random][1] < 2) {
        $(".back img:eq(" + i + ")").attr("src", "image/" + imgsrc[random][0] + ".jpg");

        imgsrc[random][1]++;
    } else {
        i--;
    }
}
//#endregion

//#region checkingcard
$(".flipper").click(function () {
    check.push($(this).find(".back img").attr("src"));
    checkobj.push($(this));
    if (check.length == 2) {
        if (check[0] === check[1]) {
            checkobj[0].prop("onclick", null).off("click");
            checkobj[1].prop("onclick", null).off("click");
            check = [];
            checkobj = [];
            pairs++;
            score += 10;
            $("#pairs").attr("value", pairs);
            if (pairs == 8) {

                clearInterval(x);
                $("#score").attr("value", score);
                alert("New high score");


            }

        } else {
            score--;
            fliprev(checkobj[0], checkobj[1]);
            check = [];
            checkobj = [];
        }
        $("#score").attr("value", score);
    }

});




function fliprev(flipcard1, flipcard2) {
    setTimeout(function () {
        flipcard1.toggleClass('flipped');
        flipcard2.toggleClass('flipped');
    }, 800);
}
//#endregion

//#region timer

var countDownDate = (new Date().getTime()) + 120000;
x = setInterval(function () {

    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $("#time").attr("value", minutes + "Mins : " + seconds + " Secs");
    if (distance < 0) {
        clearInterval(x);
        alert("Time's UP!!!!");
        location.reload();
    }

}, 1000);
//#endregion


//#region onload

$(document).ready(function () {

    $(".flipper").click(function (e) {
        $(this).toggleClass('flipped');

    });

    function show() {
        setTimeout(function () {
            $(".flipper").toggleClass('flipped');
        }, 3000);
    }
    $(".flipper").toggleClass('flipped');
    show();
    // console.log($("#start_button").text())
    // $("#start_button").html("STOP");
    // console.log($("#start_button").text())
});

//#endregion

$("#start_button").click(function () {
    if ($("#start_button").text() == "START") {
        $("#start_button").html("STOP");
        location.reload();
    } else {

        $("#start_button").html("START");
        $(".flipper").prop("onclick", null).off("click");
        clearInterval(x);

    }

});