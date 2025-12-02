import { taskManager } from "../manager/tasks.js";            // Importa o gerenciador de tarefas
import { log, select, isCancel, text } from "@clack/prompts"; // Importa funções de interação do pacote @clack/prompts
import chalk from "chalk";                                    // Importa a biblioteca chalk para estilização
import { listTasksMenu } from "./list.js";                    // Importa o menu de listagem de tarefas

// Função assíncrona para exibir o menu de atualização de uma tarefa específica
export async function updateTaskMenu(taskName) {
    const task = taskManager.tasks.get(taskName);                   // Obtém a tarefa pelo nome
    const formatedDate = new Date(task.createdAt).toLocaleString(); // Formata a data de criação para uma string legível
    const status = taskManager.colorStatus(task.status);            // Obtém o status colorido da tarefa

    // Exibe as informações da tarefa
    log.info([
        `Tarefa: ${task.name}`,
        `Descrição: ${task.description}`,
        `Status: ${status}`,
        `Criada em: ${chalk.bgGrey(formatedDate)}`
    ].join("\n"));

    // Exibe o menu de opções de atualização
    const selected = await select({
        message: "Selecione uma opção", // Mensagem do menu
        options: [                      // Opções disponíveis
            { label: "Alterar nome", value: "name" },
            { label: "Alterar descrição", value: "description" },
            { label: "Alterar status", value: "status" },
            { label: "Excluir tarefa", value: "delete" },
            { label: "Voltar ao menu principal", value: "back" }
        ]
    });

    // Verifica se o usuário cancelou a operação
    if (isCancel(selected)) {
        setTimeout(() => listTasksMenu(), 1000); // Retorna ao menu de listagem após 1 segundo
        return;                                  // Encerra a função
    }

    // Executa a ação selecionada
    switch (selected) {
        // Caso a opção seja alterar o nome
        case "name": {
            const oldTaskName = task.name;   // Armazena o nome antigo
            // Solicita o novo nome
            const newTaskName = await text({ 
                message: "Digite o novo nome da tarefa",
                // Valida se o nome já existe
                validate(input) {            
                    if (taskManager.tasks.has(input)) {
                        return "Já existe uma tarefa com esse nome";
                    }
                }
            });

            // Se cancelado, volta ao menu da tarefa com o nome antigo
            if (isCancel(newTaskName)) {
                updateTaskMenu(oldTaskName);
                return;
            }

            taskManager.tasks.delete(oldTaskName);              // Remove a tarefa antiga
            const updatedTask = { ...task, name: newTaskName }; // Cria o objeto atualizado com o novo nome
            taskManager.tasks.set(newTaskName, updatedTask);    // Adiciona a tarefa atualizada
            taskManager.save();                                 // Salva as alterações
            updateTaskMenu(newTaskName);                        // Recarrega o menu com o novo nome
            return;                                             // Encerra a função

        }

        // Caso a opção seja alterar a descrição
        case "description": {
            const oldTaskDescription = task.description; // Armazena a descrição antiga
            // Solicita a nova descrição
            const newTaskDescription = await text({             
                message: "Digite a nova descrição da tarefa",
                // Valida a entrada
                validate(input) {
                    if (taskManager.tasks.has(input)) {
                        return "Essa descrição não mudou";
                    }
                }
            });

            // Se cancelado, volta ao menu
            if (isCancel(newTaskDescription)) {
                updateTaskMenu(oldTaskDescription);
                return;
            }

            taskManager.tasks.delete(oldTaskDescription);                     // Remove a tarefa antiga usando a descrição (código original)
            const updatedTask = { ...task, description: newTaskDescription }; // Atualiza a descrição
            taskManager.tasks.set(newTaskDescription, updatedTask);           // Adiciona a tarefa usando a descrição como chave (código original)
            taskManager.save();                                               // Salva as alterações
            updateTaskMenu(newTaskDescription);                               // Recarrega o menu
            return;                                                           // Encerra a função
        }

        // Caso a opção seja alterar o status
        case "status": {
            // Lista de status possíveis
            const taskStatus = [
                "em andamento",
                "concluida",
                "cancelada"
            ]
            // Filtra o status atual e cria as opções
            const options = taskStatus
                .filter(status => status !== task.status)
                .map(status => ({
                    label: status,
                    value: status
                }));

            // Solicita o novo status
            const status = await select({
                message: "Selecione o novo status",
                options
            });

            // Se cancelado, volta ao menu
            if (isCancel(status)) {
                updateTaskMenu(taskName);
                return;
            }

            taskManager.tasks.set(taskName, { ...task, status }); // Atualiza o status da tarefa
            taskManager.save();                                   // Salva as alterações
            updateTaskMenu(taskName);                             // Recarrega o menu
            return;                                               // Encerra a função
        }

        // Caso a opção seja excluir
        case "delete": {
            taskManager.tasks.delete(taskName); // Remove a tarefa
            taskManager.save();                 // Salva as alterações
        }

        // Caso a opção seja voltar
        case "back":
            setTimeout(() => listTasksMenu(), 1000); // Volta ao menu de listagem após 1 segundo
            break;                                   // Encerra o case
    }
}