/* Função para carregamento da Janela */
function carregandoJanela() {
    tempo = 0;
    let loading = document.getElementById('loading'); /* pegando id  */
    console.log(loading)

    setTimeout(() => { /* função que será setada após tempo indicado e aplicará função que retirará o elemento do layout da tela */
        loading.style.display = 'none';
    }, 2000);
}

let sectionTarefas = document.getElementById('secao-tarefas'); /* pegando id  */
/* Função que cria tarefas */
function criarTarefa(descricao, id) { /* passando parametros da função */
    const artigo = document.createElement('article'); /* criando elemento article */
    artigo.setAttribute('id', 'visualizar'); /* adicionando atributos na tag article */
    artigo.innerHTML = /* adicionando elementos dentro da tag article no html */
     ` 
    <div class="section__box-icons">
    </div>
    <div class="section__box-paragrafo">
         <p>${descricao}</p>
    </div>     
        <div class="section__box-datas">
            <p>Id: ${id}</p>
        </div>
    
    `
    return artigo; /* retornando tag article criada */
}

/* Funcao assincrona para requisitar tarefas na API */
async function requisitarTarefas() {
    try { /* pedindo para função tentar executar os comandos  */
        const resquisicao = await (await fetch('https://jsonplaceholder.typicode.com/todos/')).json(); /* pausa na função assincrona para depois retornar a ela novamente */
        for (let i = 0; i < resquisicao.length; i++) { /* looping de repetição para executar enquanto houver itens no requisição */
            let novaTarefa = criarTarefa(resquisicao[i].title, resquisicao[i].id) /* criando nova tarefa */
            if(resquisicao[i].completed == true) { /* se valor da requisição for true retornará bloco de tarefas */
                novaTarefa.children[1].children[0].classList.toggle('tachado'); /* criando card e adicionando classe */
                novaTarefa.style.opacity = "0.87"; /*definindo opacidade do card */
                novaTarefa.style.filter = "grayscale(0.75)"; /* aplicando filtro */
            }
            sectionTarefas.appendChild(novaTarefa); /*adicionando dinamicamente elemento filho dentro do elemento pai no html */
        }
    } catch (erro) { /* tratamento de erros para evitar que programa para em tempo de execução */
        console.log(erro.name); /* mostra no console erro */
        return alert(Error("Falha em requisitar os dados. \n Verifique sua conexão com a Internet ou tente novamente mais tarde")); /* mensagem de erro para usuario */
    }
}

requisitarTarefas(); /**chamando função requisitarTarefas */