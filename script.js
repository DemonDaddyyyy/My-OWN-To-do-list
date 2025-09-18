const form = document.getElementById("form-todo");
const corpoTabela = document.querySelector("tbody");

// 🔵 Função que cria uma linha completa da tabela
function criarLinhaTask(texto, completed = false) {
  const linha = document.createElement("tr");

  // coluna texto
  const td = document.createElement("td");
  td.textContent = texto;
  linha.appendChild(td);

  // botão delete
  const tdBtn = document.createElement("td");
  const btn = document.createElement("button");
  btn.classList.add("delete-btn");
  btn.innerHTML = '<img src="./images/lixeira.png" alt="Remover" />';
  btn.addEventListener("click", function(e) {
    e.stopPropagation(); // evita ativar clique da linha
    linha.remove();
    saveTasks();
  });
  tdBtn.appendChild(btn);
  linha.appendChild(tdBtn);

  // marca como concluído se necessário
  if (completed) {
    linha.classList.add("completed");
  }

  // evento de clique para riscar e mandar pro fim
  linha.addEventListener("click", function() {
    linha.classList.toggle("completed");
    if (linha.classList.contains("completed")) {
      corpoTabela.appendChild(linha);
    }
    saveTasks();
  });

  // adiciona linha ao tbody
  corpoTabela.appendChild(linha);
}

// 🔵 Submit do form
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const inputTask = document.getElementById("task");

  criarLinhaTask(inputTask.value); // cria linha completa

  inputTask.value = "";
  saveTasks();
});

// 🔵 Função para salvar tarefas no localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("tbody tr").forEach(linha => {
    tasks.push({
      text: linha.querySelector("td").textContent,
      completed: linha.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔵 Função para carregar tarefas salvas
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    criarLinhaTask(task.text, task.completed);
  });
}

// 🔵 Carregar tarefas assim que a página abrir
window.onload = loadTasks;
