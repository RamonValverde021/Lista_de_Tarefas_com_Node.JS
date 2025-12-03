import chalk from "chalk";                  // Importa a biblioteca chalk para colorir o texto
import { intro } from "@clack/prompts";     // Importa a função intro do pacote @clack/prompts
import { mainMenu } from "./menus/main.js"; // Importa a função mainMenu do arquivo local ./menus/main.js
 
intro(`${chalk('📋 Lista de Tarefas')}`);  // Exibe a introdução do programa com o título colorido
mainMenu();                                 // Chama a função do menu principal para iniciar a aplicação