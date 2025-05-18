import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
export function makeController(name) {
    const names = name.charAt(0).toUpperCase() + name.slice(1);
    const controllerName = `${names}Controller.ts`;
    const controllerDir = path.join(process.cwd(), 'src', 'controllers');
    const controllerPath = path.join(controllerDir, controllerName);
    const template = `import { Request, Response } from 'express';
    import { ResponseApiType } from "../types/api_types";
    import { handlerAnyError } from "../errors/api_errors";

    export async function ${names}Controller(req: Request, res: Response<ResponseApiType>) {
        try {
            return res.status(200).json({
                success: true,
                message: "Hello from ${names}"
            })
        } catch (error) {
            return handlerAnyError(error, res)
        }
    }`;
    fs.mkdirSync(controllerDir, { recursive: true });
    fs.writeFileSync(controllerPath, template);
    console.log(chalk.green(`✅ Controller ${controllerName}`));
}
