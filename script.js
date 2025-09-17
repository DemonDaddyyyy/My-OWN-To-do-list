
const form = document.getElementById ("form-todo");
const imgAprovado = '<img src="./images/logo.png" alt="Logotipo Undraw" />';
const corpoTabela = document.querySelector('tbody');
const nome = [];
const numero = [];

// Código abaixo feito com ajuda do CHATGPT para colocar as tarefas concluídas no fim da lista

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const inputTask = document.getElementById("task");

  // cria linha
  const linha = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = inputTask.value;
  linha.appendChild(td);

  // evento de clique para riscar e mandar pro fim
  linha.addEventListener("click", function() {
    linha.classList.toggle("completed");
    if (linha.classList.contains("completed")) {
      corpoTabela.appendChild(linha); // manda para o fim
    }
  });

  // adiciona ao tbody
  corpoTabela.appendChild(linha);

  inputTask.value = "";
});


