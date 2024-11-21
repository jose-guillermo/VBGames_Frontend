import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  private _storage: Storage | null = null;

  private storage: Storage = inject(Storage);
  private toastCtrl: ToastController = inject(ToastController);

  constructor() {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  /**
   * Actualiza el tema actual en el almacenamieneto local
   * @param theme El tema que se va a actualizar
   */
  public async updateTheme(theme: string): Promise<void> {
    if (this._storage) await this._storage.set('theme', theme);
  }

  /**
   * Consigue el tema que está guardado en el almacenamiento local
   * @returns Devuelve una promesa con el tema del almacenamiento local
   */
  public async getTheme(): Promise<string> {
    let theme: string;

    if (!this._storage) {
      console.log('creando storage');
      await this.init();
    }
    theme = await this._storage!.get('theme');

    return theme;
  }

  /**
   * Actualiza el idioma actual en el almacenamieneto local
   * @param lang El idioma que se va a actualizar
   */
  public async updateLang(lang: string): Promise<void> {
    if (this._storage) await this._storage.set('theme', lang);
  }

  /**
   * Consigue el idioma que está guardado en el almacenamiento local
   * @returns Devuelve una promesa con el idioma del almacenamiento local
   */
  public async getLang(): Promise<string> {
    let lang: string;

    if (!this._storage) {
      await this.init();
    }

    lang = await this._storage!.get('lang');

    return lang;
  }

  // async cargarFavoritos(){
  //   const peliculas = await this._storage?.get("peliculas");

  //   this.peliculas.set( peliculas || [] );
  // }
}
