
function windowJustLoaded() {
    $('#predictionResultText').css('visibility', 'hidden');
}

function submitButtonIsPressed() {
    var age = $("#age").val();
    var bmi = $("#bmi").val();
    var children = $("#children").val();
    var smoker = $("#smoker").val();
    var gender = $("#gender").val();
    var region = $("#region").val();


    input = { 'age': age, 'bmi': bmi, 'children': children, 'smoker': smoker, 'gender': gender, 'region': region }
    console.log(input)

    console.log(input);

    $(window).scrollTop(0);
    $.post('http://127.0.0.1:5000/result', input, function (data, status) {
        resultElement = document.querySelector("#predictionResultText");
        resultElement.style.visibility = "visible";
        resultElement.innerText = `Your Insurance Predicted Price: $${data}`;
    })

}


window.onload = windowJustLoaded;