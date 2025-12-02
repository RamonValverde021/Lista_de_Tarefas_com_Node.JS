import { isCancel, outro, select } from "@clack/prompts";
import { createTaskMenu } from "../menus/create.js";

export async function mainMenu() {

    const option = await select({
        message: "Selecione uma opção",
        options: [
            { value: "create", label: "Adicionar tarefa" },
            { value: "list", label: "Listar tarefas" },
            { value: "exit", label: "Sair" },
        ]
    });

    if (isCancel(option)) return;
    //console.log(option);

    switch (option) {
        case "create":
            createTaskMenu();
            break;
        case "list":
            break;
        case "exit":
            break;
        default:
            outro("Opção Invalida!");
            break;
    
    }   
}