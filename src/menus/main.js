import { isCancel, outro, select } from "@clack/prompts"; // Importa funções de interação do pacote @clack/prompts
import { createTaskMenu } from "../menus/create.js";      // Importa o menu de criação de tarefas
import { listTasksMenu } from "./list.js";                // Importa o menu de listagem de tarefas

// Função assíncrona que exibe o menu principal
export async function mainMenu() {
    // Exibe as opções do menu principal e aguarda a seleção do usuário
    const option = await select({
        message: "Selecione uma opção", // Mensagem do menu
        // Lista de opções disponíveis
        options: [
            { value: "create", label: "Adicionar tarefa" }, // Opção para adicionar tarefa
            { value: "list", label: "Listar tarefas" },     // Opção para listar tarefas
            { value: "exit", label: "Sair" },               // Opção para sair do programa
        ]
    });

    if (isCancel(option)) return; // Verifica se o usuário cancelou a operação

    // Executa uma ação baseada na opção selecionada
    switch (option) {
        // Caso a opção seja criar tarefa
        case "create":
            createTaskMenu(); // Chama o menu de criação
            break;            // Encerra o case
        // Caso a opção seja listar tarefas
        case "list":
            listTasksMenu(); // Chama o menu de listagem
            break;           // Encerra o case
        // Caso a opção seja sair
        case "exit":
            // Encerra o case (o programa terminará naturalmente)
            break;
        // Caso padrão (não deve ocorrer com select, mas por segurança)
        default:
            outro("Opção Invalida!"); // Exibe mensagem de opção inválida
            break;                    // Encerra o case
    }
}