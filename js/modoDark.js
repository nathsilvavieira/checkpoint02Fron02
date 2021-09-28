/*CRIANDO VARIAVEIS PEGANDO ELEMENTOS DO CSS */
let btn = document.querySelector(".tema");
let contador = 1;
let circulo = document.querySelector(".circulo");
let circuloWhite = document.querySelector("#noturno");
let secaoTarefas = document.querySelector("#secao-tarefas");
/* BACKGROUND DA API */
let bckgVideoApi = document.getElementById('bckg-api-video');
/* CRIANDO EVENTO ESCUTADOR PARA ACÇÃO DE CLIQUE DO USUARIO */
btn.addEventListener("click", (event) => {
    event.preventDefault(); /* previnindo evento padrão */
    contador++; /* adiciona + 1 no contador setado acima */
    
    if(contador % 2 == 0){ //modo dark se contador for divisivel por 2 
        corSite = document.body.style.background = "rgb(40, 44, 52)"; /* alterando elementos do css para alterar cor de background */
        title = document.body.style.color = "white"; /*cor letra altera pra branco */
        secaoTarefas.style.backgroundOpacity = "0"; /** zerando opacidade ao background */
        circulo.style.animation = "deslizar-1 0.3s ease forwards"; /* animação para bolinha deslizar na intereção do usuario */
        btn.style.background = "white"; /** alterando estilo do background */
        circuloWhite.classList.add("circulo-2"); /**adicionando classe */
        bckgVideoApi.style.opacity = "0"; /** zera opacidade */
        
    } else{ //modo light se contador não doi divisivel por 2
        corSite = document.body.style.background = "#FFFFFF";
        title = document.body.style.color = "#FF6B6B";
        secaoTarefas.style.backgroundOpacity = "1"; /* adiciona opacidade */
        circulo.style.animation = "deslizar-2 0.3s ease forwards";
        btn.style.background = "rgb(44, 6, 80)";
        circuloWhite.classList.remove("circulo-2"); /* removendo classe */
        bckgVideoApi.style.opacity = "1"; /* adiciona opacidade */
        
    }

})