
const botaoAdicionar = document.querySelector('.button-add-task');
const campoDeEntrada = document.querySelector('.input-task');
const listaDeTarefas = document.querySelector('.list-tasks');


let tarefas = [];


function adicionarTarefa() {
  
  if (campoDeEntrada.value.trim() !== '') {
   
    tarefas.push({
      descricao: campoDeEntrada.value,
      concluida: false,
    });

    
    campoDeEntrada.value = '';

   
    atualizarListaDeTarefas();
  }
}


function atualizarListaDeTarefas() {
  let elementosLi = '';

  
  tarefas.forEach((tarefa, indice) => {
    elementosLi += `
      <li class="task ${tarefa.concluida ? 'done' : ''}">
        <img src="./img/checked.png" alt="Marcar tarefa como concluída" onclick="alternarConclusaoTarefa(${indice})">
        <p>${tarefa.descricao}</p>
        <img src="./img/trash.png" alt="Remover tarefa" onclick="removerTarefa(${indice})">
      </li>
    `;
  });

  
  listaDeTarefas.innerHTML = elementosLi;

 
  localStorage.setItem('lista', JSON.stringify(tarefas));
}


function alternarConclusaoTarefa(indice) {

  tarefas[indice].concluida = !tarefas[indice].concluida;


  atualizarListaDeTarefas();
}


function removerTarefa(indice) {
 
  tarefas.splice(indice, 1);

 
  atualizarListaDeTarefas();
}

function carregarTarefasSalvas() {
 
  const tarefasSalvas = localStorage.getItem('lista');

  
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
    atualizarListaDeTarefas();
  }
}


carregarTarefasSalvas();
botaoAdicionar.addEventListener('click', adicionarTarefa);

