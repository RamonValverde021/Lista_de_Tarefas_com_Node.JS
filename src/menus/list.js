import { taskManager } from "../manager/tasks.js";      // Importa o gerenciador de tarefas
import { log, select, isCancel } from "@clack/prompts"; // Importa funções de interação do pacote @clack/prompts
import { mainMenu } from "./main.js";                   // Importa a função do menu principal
import { updateTaskMenu } from "./update.js";           // Importa a função do menu de atualização de tarefas
import chalk from "chalk";                              // Importa a biblioteca chalk para estilização

// Função assíncrona para listar as tarefas
export async function listTasksMenu() {
    // Verifica se não há tarefas cadastradas
    if (taskManager.tasks.size < 1) {
        log.warn("Nenhuma tarefa encontrada!"); // Exibe aviso se não houver tarefas
        setTimeout(() => mainMenu(), 1000);     // Retorna ao menu principal após 1 segundo
        return;                                 // Encerra a função
    }

    // Exibe um menu de seleção com as tarefas
    const selected = await select({
        message: "Selecione uma tarefa", // Mensagem exibida ao usuário
        // Opções do menu
        options: [
            // Mapeia as tarefas para o formato de opções do menu
            ...taskManager.toArray().map(({ name, status }) => ({
                label: `${taskManager.colorStatus(status)} ${chalk.white.underline(name)}`, // Define o rótulo da opção com status colorido e nome sublinhado
                value: name                                                                 // Define o valor da opção como o nome da tarefa
            })), {
                label: "Menu principal", // Opção para voltar ao menu principal
                value: "main"            // Valor da opção de voltar
            }
        ]
    });

    // Verifica se o usuário cancelou ou selecionou voltar ao menu principal
    if (isCancel(selected) || selected === "main") {
        setTimeout(() => mainMenu(), 1000); // Retorna ao menu principal após 1 segundo
        return;                             // Encerra a função
    }

    updateTaskMenu(selected); // Abre o menu de atualização para a tarefa selecionada
}