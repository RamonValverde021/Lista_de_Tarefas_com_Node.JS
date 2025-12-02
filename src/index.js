import { intro }  from "@clack/prompts";
import chalk from "chalk";
import { mainMenu } from "./menus/main.js";

intro(`${chalk('📋 Lista de Tarefas')}`);
mainMenu();

