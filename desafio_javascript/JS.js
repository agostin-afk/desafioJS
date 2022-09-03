var GtiQuestions = "https://quiz-trainee.herokuapp.com/questions";
var request = new XMLHttpRequest();
request.open("GET", GtiQuestions);
var pontos = 0; var i = -1; var questionario;
var x = document.getElementsByTagName("input");
request.onreadystatechange = function(){
    if (request.readyState === 4){
        if(request.status === 200)
        questionario = JSON.parse(request.responseText);
    }
}
request.send(null);

function mostrarQuestao() {
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("listaRespostas").style.display = "block"
    if (i === -1 || x[0].checked != false || x[1].checked != false || x[2].checked != false || x[3].checked != false) {
        if (i != -1) {
            for (var j = 0; j < questionario[i].options.length; j++) {
                pontos += x[j].checked * questionario[i]['options'][j]['value']
            }
        }
        document.getElementById("confirmar").innerHTML = "Próximo";
        i++;
    }
    if (i == -1) {
        document.getElementById("titulo").classList.remove('hide');
        document.getElementById("subtitulo").classList.remove('hide');
        
        document.getElementById("resultado").remove('hide');
    }

    if (i < questionario.length) {
        document.getElementById("titulo").innerHTML = questionario[i].title;
        document.getElementById("subtitulo").innerHTML = 'Pensa bem';
        for (var j = 0; j < questionario[i].options.length; j++) {
            if (x[j].checked === true) {
                x[j].checked = false;
            }
            document.getElementsByTagName("span")[j].innerHTML = questionario[i].options[j].answer
            x[j].value = questionario[i].options[j].value
        }
    } 
    else {
        console.log(questionario[i - 1].options.length)
        finalizarQuiz();
    }
}
function finalizarQuiz() {
    var resultado = 3 * (questionario[i - 1].options.length + 1);
    document.getElementById("listaRespostas").style.display = "none";
    document.getElementById("confirmar").innerHTML = "Refazer quiz";
    document.getElementById("titulo").innerHTML = "QUIZ DA GTI :D";
    document.getElementById("resultado").innerHTML = "Sua pontuação: " + (pontos * 100 / resultado).toFixed(2) + "%";
}