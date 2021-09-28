// DECLARANDO AS VARIÁVEIS

let botaoSalvar = document.getElementById('btn-salvar'); /* PEGANDO ELEMENTOS PELO ID CORRESPONDENTE */
let form = document.getElementById('formulario');
let sectionTarefas = document.getElementById('secao-tarefas');

/* gerando data atual */
let data = new Date(); /**INSTANCIANDO UM OBJETO DO TIPO DATA */
let dia = String(data.getDate()).padStart(2, '0'); /** metodo pega data transformando data em string e passando metodo padStart para receber caracteres */
let mes = String(data.getMonth() + 1).padStart(2, '0'); /**metodo pega mes */
let ano = data.getFullYear(); /** metodo que pega todo ano */
let dataAtual = ano + '-' + mes + '-' + dia; /**concatenando elementos */

const localStorageTarefas = JSON.parse(localStorage.getItem('arrayTarefas')); /** trasnformando json em js, acessando local storage  e pegando arrayTarefas */
const minhasTarefas = localStorage.getItem('arrayTarefas') !== null ? localStorageTarefas : []; /**verificando se arrayTarefas é vazio  */

const localStorageIdTarefas = JSON.parse(localStorage.getItem('idsTarefas')); /** trasnformando json em js, acessando local storage  e pegando idsTarefas */
let indexTarefas = localStorage.getItem('idsTarefas') !== null ? localStorageIdTarefas : []; /**verificando se idsTarefas é vazio  */
/**LENDO ITENS DO LOCALSTORAGE */
for (objTarefa of minhasTarefas) {/**for que percorre elementos minhasTarefas */
    let novoTarefa = criarTarefa(objTarefa.dataCriacao, objTarefa.dataLimite, objTarefa.descricao, objTarefa.idTarefa); /** alocando elementos dentro do objTarefas */
    sectionTarefas.appendChild(novoTarefa); /**adicionando objTarefas filho dentro da sectionTarefas  */
}
/**ICONES CLICAVEIS */
let iconsChecked = document.querySelectorAll('[data-click-checked]'); /**pegando elemento */
iconsChecked.forEach(el => el.addEventListener('click', (e) => { /**percorre elemento e escuta evento click */
    e.preventDefault();/**previnindo comportamento padrao do elemento */
    let divInput = el.parentElement;
    let artigo = divInput.parentElement
    let paragrafo = divInput.parentElement.children[2].children[0];
    paragrafo.classList.toggle('tachado'); /**adicionando classe tachado */
    artigo.classList.toggle('artigo-checked'); /**adicionando artigo-checked */
}))

/**APLICANDO BACKGROUND DE MULTIPLAS CORES */
function aplicarBackground(el, article) { /**função que recebe dois parametros  */
    let paletaCores = article.children[1]; /**definindo elemento da paleta */
    let input = article.children[0].children[1]; /**definindo input das cores */
   
        return function () { /**chmando a função anonima que seta as cores */
            article.style.backgroundColor = el.value; /**background-color receberar valor do el que será alterado no css */
            paletaCores.removeChild(paletaCores.firstChild); /**removendo cor anterior */
            input.disabled = false; /**desabilitando input  */
        }
}

var cores = ["#FFFCE8", "#DEDBD8", "#D8FFDD", "#CCFFFF","#E5FCFF", "#CCCCFF"]; /**criando paleta de cores */
function criarPaleta(artigo) { /**FUNÇÃO QUE CRIA PALETA DE CORES */
    let divPaleta = document.createElement('div'); /**pegando elemento div */
    divPaleta.setAttribute('class', 'child-paleta'); /**setando atributos na div */
    cores.forEach(function (cor) { /**percorrendo divPaleta e aplicando atributos e valores dinamicamente  */
        var button = document.createElement('button');
        button.setAttribute('class', 'btn-cor');
        button.value = cor;
        button.type = 'button';
        button.style.backgroundColor = cor;
        button.addEventListener('click', aplicarBackground(button, artigo));/**criando evento escutador que iniciará quando clicado */
        divPaleta.appendChild(button); /**inserindo elemento filho no html */
    });
    return divPaleta; /**pedindo para retornar divPaleta */
}

let iconsColor = document.querySelectorAll('[data-click-color]');
iconsColor.forEach(el => el.addEventListener('mouseover', (e) => {
    e.preventDefault();
    let divInput = el.parentElement;
    let article = divInput.parentElement;
    let paletaCores = article.children[1];
    paletaCores.appendChild(criarPaleta(article));
    paletaCores.classList.remove('escolhas-none');
    el.disabled = true;
}))

let iconsLixeira = document.querySelectorAll('[data-click-lixeira]');
iconsLixeira.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    let idTarefa = parseInt(el.id);
    let indexTarefa = indexTarefas.indexOf(idTarefa);
    console.log(indexTarefa)
    let confirmacao = confirm("Você quer mesmo excluir essa tarefa?");
    if (confirmacao) {
        minhasTarefas.splice(indexTarefa, 1);
        indexTarefas.splice(indexTarefa, 1);//removendo um elemento do indexCards para manter o sincronismo com o index de meusCards
        location.reload();
    } else
        e.stopPropagation();

    localStorage.setItem('arrayTarefas', JSON.stringify(minhasTarefas));//atualização do localStorage
    localStorage.setItem('idsTarefas', JSON.stringify(indexTarefas));//atualização do localStorage
}))

function objetoTarefa() {
    let tarefa = {};
    tarefa.dataCriacao = dataAtual;
    tarefa.dataLimite = form.dataLimite.value;
    tarefa.descricao = form.descricao.value;
    tarefa.checked = false;
    tarefa.idTarefa = idGenerator();
    return tarefa;
}

function idGenerator() {//função para gerar ids
    return Math.round(Math.random() * 10000);
}


function criarTarefa(dataCriacao, dataLimite, descricao, id) {
    const artigo = document.createElement('article');
    artigo.innerHTML =
        `
    <div class="section__box-icons">
        <input data-click-checked id="${id}" type="image" src="./midias/check.png" alt="checked">
        <input data-click-color id="${id}" type="image" src="./midias/color-palette.png" alt="cor">
        <input data-click-lixeira id="${id}" type="image" src="./midias/bin.png" alt="lixeira">
    </div>
    <div class="escolhas-flex paleta"></div>
    <div class="section__box-paragrafo">
         <p>${descricao}</p>
    </div>
    <div class="section__box-datas">
        <p>Data de criação: ${dataCriacao}</p>
        <p>Data limite: ${dataLimite}</p>
    </div>
    `
    return artigo;
}

botaoSalvar.addEventListener('click', (e) => {
    e.preventDefault();

    if (form.dataLimite.value === '' || form.descricao.value === '') {//alerta de campos vazios
        alert("Os campos de Data Limite e Descrição não podem estar vazios!");
        return;
    } else if (form.dataLimite.value < dataAtual) {
        alert("A Data Limite deve ser igual ou superior à data atual!");
        return
    } else {
        const objTarefa = objetoTarefa();
        let novaTarefa = criarTarefa(objTarefa.dataCriacao, objTarefa.dataLimite, objTarefa.descricao, objTarefa.idTarefa);

        form.dataLimite.value = "";
        form.descricao.value = "";

        minhasTarefas.push(objTarefa);
        indexTarefas.push(objTarefa.idTarefa);
        localStorage.setItem('arrayTarefas', JSON.stringify(minhasTarefas));
        localStorage.setItem('idsTarefas', JSON.stringify(indexTarefas));
        sectionTarefas.appendChild(novaTarefa);
        location.reload();
    }
})