import { isCancel, log, text } from "@clack/prompts"; // Importa funções de interação do pacote @clack/prompts
import { taskManager } from "../manager/tasks.js";    // Importa o gerenciador de tarefas
import { mainMenu } from "./main.js";                 // Importa a função do menu principal

// Função assíncrona para exibir o menu de criação de tarefas
export async function createTaskMenu() {
    let name; // Declara a variável para armazenar o nome da tarefa
    // Loop para garantir que o nome da tarefa seja único
    do {
        // Solicita ao usuário o nome da tarefa
        name = await text({
            message: "Digite o nome da tarefa", // Mensagem exibida ao usuário
        });
        // Verifica se já existe uma tarefa com esse nome
        if (taskManager.tasks.has(name)) {
            log.error("Tarefa ja existe!"); // Exibe mensagem de erro se a tarefa já existir
        }
    } while (taskManager.tasks.has(name)); // Continua o loop enquanto o nome da tarefa já existir

    // Verifica se o usuário cancelou a operação
    if (isCancel(name)) {
        mainMenu(); // Retorna ao menu principal
        return;     // Encerra a função
    }

    let description; // Declara a variável para armazenar a descrição da tarefa
    // Loop para garantir que a descrição da tarefa seja única
    do {
        // Solicita ao usuário a descrição da tarefa
        description = await text({
            message: "Digite a descrição da tarefa", // Mensagem exibida ao usuário
        });
        // Verifica se já existe uma tarefa com essa descrição
        if (taskManager.tasks.has(description)) {
            log.error("Descrição ja existe!"); // Exibe mensagem de erro se a descrição já existir
        }
    } while (taskManager.tasks.has(description)); // Continua o loop enquanto a descrição da tarefa já existir

    // Verifica se o usuário cancelou a operação
    if (isCancel(description)) {
        createTaskMenu(); // Retorna ao menu de criação
        return;           // Encerra a função
    }

    // Cria o objeto da nova tarefa
    const task = {
        name,                                  // Nome da tarefa
        description,                           // Descrição da tarefa
        status: "em andamento",                // Status inicial da tarefa
        createdAt: new Date().toISOString()    // Data de criação da tarefa
    }

    taskManager.create(task);                  // Adiciona a tarefa ao gerenciador
    log.success("Tarefa criada com sucesso!"); // Exibe mensagem de sucesso
    setTimeout(() => mainMenu(), 1000);        // Retorna ao menu principal após 1 segundo
}
