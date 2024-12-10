import { effect, inject, Injectable, signal } from '@angular/core';
import { DataLocalService } from './data-local.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  public currentLang = signal<string>("");

  private dataLocal = inject(DataLocalService);
  private translate = inject(TranslateService);
  private http = inject(HttpClient);

  constructor() {
    this.initLang();
    this.translate.addLangs(['es', 'en']);

    effect(() => {
      if ( this.currentLang() ){
        document.documentElement.lang = this.currentLang();
        this.translate.setDefaultLang('es');
        this.translate.use(this.currentLang());
      } else {
        document.documentElement.lang = "es";
        this.translate.setDefaultLang('es');
        this.translate.use('es');
      }
    })
  }

  /**
   * Inicializa el idioma de la aplicación
   */
  private async initLang () {
    const theme =  await this.dataLocal.getValue("lang");
    this.currentLang.set(theme);
  }


  /**
   * Cambia el idioma de la aplicación
   */
  public changeLang ( lang: string ) {
    this.currentLang.set( lang );
    this.dataLocal.setValue( "lang", this.currentLang() );
  }

  /**
   * Cambia archivos de traducción
   */
  public changeLangFiles ( url: string ) {
    this.translate.setDefaultLang(this.currentLang());
    const translateLoader = new TranslateHttpLoader(
      this.http,
      url,
      '.json'
    );
    this.translate.setTranslation(this.currentLang(), translateLoader, true);
    this.translate.use(this.currentLang());
  }

  // private loadTranslations(loader: TranslateHttpLoader): Observable<any> {
  //   Obtenemos las traducciones usando el loader
  //   return this.http.get(loader.getTranslationPath(this.currentLang()));
  // }
}

