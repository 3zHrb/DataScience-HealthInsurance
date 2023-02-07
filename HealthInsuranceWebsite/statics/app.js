//[age, bmi, children, no(smoker), male(sex), northeast(region), northwest(region), southeast(region)]
function windowJustLoaded() {
    $('#predictionResultText').css('visibility', 'hidden');
}

// var regionsValue = [0, 0, 0]
// var regionsName = ['northeast', 'northwest', 'southeast']

// input = {}

function submitButtonIsPressed() {
    var age = $("#age").val();
    var bmi = $("#bmi").val();
    var children = $("#children").val();
    var smoker = $("#smoker").val();
    var gender = $("#gender").val();
    var region = $("#region").val();

    // $.post('')

    input = { 'age': age, 'bmi': bmi, 'children': children, 'smoker': smoker, 'gender': gender, 'region': region }
    console.log(input)

    console.log(input);

    $(window).scrollTop(0);
    $.post('http://127.0.0.1:5000/result', input, function (data, status) {
        $("#predictionResultText").css('visibility', 'visible');
        $("#predictionResultText").text(`Your Insurance Predicted Price: $${data}`);
    })

}


window.onload = windowJustLoaded;