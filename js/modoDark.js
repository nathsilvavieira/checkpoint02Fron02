let btn = document.querySelector(".tema");
let contador = 1;
let circulo = document.querySelector(".circulo");
let circuloWhite = document.querySelector("#noturno");
//let form = document.getElementById('formulario');
let secaoTarefas = document.querySelector("#secao-tarefas");
/* bacground API */
let bckgVideoApi = document.getElementById('bckg-api-video');

btn.addEventListener("click", (event) => {
    event.preventDefault();
    contador++;
    
    if(contador % 2 == 0){ //modo dark
        corSite = document.body.style.background = "rgb(40, 44, 52)";
        title = document.body.style.color = "white";
        secaoTarefas.style.backgroundOpacity = "0";
        circulo.style.animation = "deslizar-1 0.3s ease forwards";
        btn.style.background = "white";
        //form.style.backgroundColor = "rgb(40, 44, 52)";
        circuloWhite.classList.add("circulo-2");
        bckgVideoApi.style.opacity = "0";
        
    } else{ //modo light
        corSite = document.body.style.background = "#FFFFFF";
        title = document.body.style.color = "#FF6B6B";
        secaoTarefas.style.backgroundOpacity = "1";
        circulo.style.animation = "deslizar-2 0.3s ease forwards";
        btn.style.background = "rgb(44, 6, 80)";
       // form.style.backgroundColor = "#FF6B6B";
        circuloWhite.classList.remove("circulo-2");
        bckgVideoApi.style.opacity = "1";
        
    }

})