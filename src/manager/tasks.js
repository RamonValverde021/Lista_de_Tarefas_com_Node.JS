
import { existsSync, readFileSync, writeFileSync } from "fs"; // Importa funções do módulo fs para manipulação de arquivos
import path from "path";                                      // Importa o módulo path para manipulação de caminhos de arquivos
import chalk from "chalk";                                    // Importa a biblioteca chalk para estilização de texto no terminal

const filePath = path.join("./tasks.json");                   // Define o caminho do arquivo onde as tarefas serão salvas
if (!existsSync(filePath)) {                                  // Verifica se o arquivo de tarefas não existe
    writeFileSync(filePath, JSON.stringify([]), "utf-8");     // Se não existir, cria o arquivo com um array vazio
}

const data = readFileSync(filePath, "utf-8");                 // Lê o conteúdo do arquivo de tarefas - Retorna uma String
const parsed = JSON.parse(data);                              // Faz o parse do conteúdo JSON para um objeto JavaScript
const tasks = new Map(parsed.map(task => [task.name, task])); // Cria um Map com as tarefas, usando o nome da tarefa como chave

// Exporta o objeto taskManager com métodos para gerenciar tarefas
export const taskManager = {
    // A coleção de tarefas
    tasks,  // tasks:tasks
    // Método para salvar as tarefas no arquivo
    save() {
        const data = this.toArray();                                     // Converte o Map de tarefas para um array
        writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8"); // Escreve os dados no arquivo JSON formatados com indentação
    },
    // Método para criar uma nova tarefa
    create(task) {
        tasks.set(task.name, task); // Adiciona a tarefa ao Map
        this.save();                // Salva as alterações no arquivo
    },
    // Método para converter o Map de tarefas em um array
    toArray() {
        return Array.from(tasks.values()); // Retorna um array com os valores do Map
    },
    // Método para colorir o status da tarefa
    colorStatus(status) {
        // Verifica o status da tarefa
        switch (status) {
            // Se o status for "em andamento"
            case "em andamento": 
                return chalk.bgHex("#FFC107")(` ${status} `); // Retorna o status com fundo amarelo
            // Se o status for "concluida"
            case "concluida":
                return chalk.bgGreen(` ${status} `); // Retorna o status com fundo verde
            // Se o status for "cancelada"
            case "cancelada":
                return chalk.bgRed(` ${status} `); // Retorna o status com fundo vermelho
            // Para qualquer outro status
            default:
                return chalk.bgWhite(` ${status} `); // Retorna o status com fundo branco
        }
    }
}