import { taskManager } from "../manager/tasks.js";
import { log, select, isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { listTasksMenu } from "./list.js";

export async function updateTaskMenu(taskName) {
    const task = taskManager.tasks.get(taskName);

    const formatedDate = new Date(task.createdAt).toLocaleString();
    const status = taskManager.colorStatus(task.status);

    log.info([
        `Tarefa: ${task.name}`,
        `Descrição: ${task.description}`,
        `Status: ${status}`,
        `Criada em: ${chalk.bgGrey(formatedDate)}`
    ].join("\n"));

    const selected = await select({
        message: "Selecione uma opção",
        options: [
            { label: "Alterar nome", value: "name" },
            { label: "Alterar descrição", value: "description" },
            { label: "Alterar status", value: "status" },
            { label: "Excluir tarefa", value: "delete" },
            { label: "Voltar ao menu principal", value: "back" }
        ]
    });

    if (isCancel(selected)) {
        setTimeout(() => listTasksMenu(), 1000);
        return;
    }

    switch (selected) {
        case "name": {
            const oldTaskName = task.name;
            const newTaskName = await text({
                message: "Digite o novo nome da tarefa",
                validate(input) {
                    if (taskManager.tasks.has(input)) {
                        return "Já existe uma tarefa com esse nome";
                    }
                }
            });

            if (isCancel(newTaskName)) {
                updateTaskMenu(oldTaskName);
                return;
            }

            taskManager.tasks.delete(oldTaskName);
            const updatedTask = { ...task, name: newTaskName };
            taskManager.tasks.set(newTaskName, updatedTask);
            taskManager.save();
            updateTaskMenu(newTaskName);
            return;
        }

        case "description": {
            const oldTaskDescription = task.description;
            const newTaskDescription = await text({
                message: "Digite a nova descrição da tarefa",
                validate(input) {
                    if (taskManager.tasks.has(input)) {
                        return "Essa descrição não mudou";
                    }
                }
            });

            if (isCancel(newTaskDescription)) {
                updateTaskMenu(oldTaskDescription);
                return;
            }

            taskManager.tasks.delete(oldTaskDescription);
            const updatedTask = { ...task, description: newTaskDescription };
            taskManager.tasks.set(newTaskDescription, updatedTask);
            taskManager.save();
            updateTaskMenu(newTaskDescription);
            return;
        }

        case "status": {
            const taskStatus = [
                "em andamento",
                "concluida",
                "cancelada"
            ]
            const options = taskStatus
                .filter(status => status !== task.status)
                .map(status => ({
                    label: status,
                    value: status
                }));

            const status = await select({
                message: "Selecione o novo status",
                options
            });

            if (isCancel(status)) {
                updateTaskMenu(taskName);
                return;
            }

            taskManager.tasks.set(taskName, { ...task, status });
            taskManager.save();
            updateTaskMenu(taskName);
            return;
        }

        case "delete": {
            taskManager.tasks.delete(taskName);
            taskManager.save();
        }

        case "back":
            setTimeout(() => listTasksMenu(), 1000);
            break;
    }
}   