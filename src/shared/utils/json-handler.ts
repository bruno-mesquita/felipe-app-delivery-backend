/**

 * @fileoverview Classe para manipulação de arquivo JSON

 *

 * @author Bruno Mesquita

 */

import { readFileSync, writeFileSync, existsSync } from 'fs';

class JsonHandler<T = any> {
  json: T[];

  path: string;

  constructor(path: string) {
    if (!existsSync(path)) writeFileSync(path, JSON.stringify([]));

    this.path = path;

    this.json = JSON.parse(readFileSync(path, 'utf-8'));
  }

  private save(): void {
    writeFileSync(this.path, JSON.stringify(this.json));
  }

  public add(item: T): void {
    this.json.push(item);

    this.save();
  }
}

export default JsonHandler;
