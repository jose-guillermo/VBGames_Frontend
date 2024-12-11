import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const FILEURL="assets/i18n/";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private http = inject(HttpClient);

  constructor() {
    this.loadTranslation();
    this.readFile("en.json")
  }

  loadTranslation() {
    this.http.get('assets/i18n/en.json').subscribe(
      data => {
        console.log(data); // Aquí procesas el contenido
      },
      error => {
        console.error('Error al cargar el archivo', error);
      }
    );
  }

  // Leer un archivo JSON desde el sistema de archivos
  private async readFile(fileName: string): Promise<any> {
    try {
      console.log(`assets/i18n/en.json`);

      const file = await Filesystem.readFile({
        path: `https://res.cloudinary.com/dkwordgbe/raw/upload/en_hbfizz.json`,
        directory: Directory.Data,  // Usamos el directorio 'Data' para almacenamiento persistente
        encoding: Encoding.UTF8
      });

      // return JSON.parse(file.data); // Parseamos el contenido como JSON
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return null;
    }
  }

  // Escribir un archivo JSON en el sistema de archivos
  private async writeFile(fileName: string, data: any): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);  // Convertir el objeto a JSON
      await Filesystem.writeFile({
        path: fileName,
        data: jsonData,
        directory: Directory.Data,  // Usamos el directorio 'Data' para almacenamiento persistente
        encoding: Encoding.UTF8
      });
    } catch (error) {
      console.error('Error al escribir en el archivo:', error);
    }
  }

  // Modificar un archivo JSON: leer, modificar y volver a escribir
  async modifyJsonFile(fileName: string, newData: any): Promise<void> {
    try {
      const currentData = await this.readFile(fileName);  // Leer el archivo actual
      if (currentData) {
        // Modificar los datos según sea necesario
        Object.assign(currentData, newData); // Por ejemplo, fusionar los nuevos datos
        await this.writeFile(fileName, currentData);  // Escribir los datos modificados
      }
    } catch (error) {
      console.error('Error al modificar el archivo JSON:', error);
    }
  }
}
