import { effect, inject, Injectable, signal } from '@angular/core';
import { DataLocalService } from './data-local.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  public currentLang = signal<string>("");

  private dataLocal = inject(DataLocalService);
  private translate = inject(TranslateService);

  constructor() {
    this.initLang();
    this.translate.addLangs(['es', 'en']);

    effect(() => {
      if ( this.currentLang() ){
        console.log(this.currentLang());

        document.documentElement.lang = this.currentLang();
        this.translate.setDefaultLang('es');
        this.translate.use(this.currentLang());
      }
      else{
        document.documentElement.lang = "es";
        this.translate.setDefaultLang('es');
        this.translate.use('es');
      }
    })
  }

  /**
   * Inicializa el tema de la aplicación
   */
  private async initLang () {
    const theme =  await this.dataLocal.getLang();
    this.currentLang.set(theme);
  }


  /**
   * Cambia el tema de la aplicación
   */
  public changeLang ( lang: string ) {
    this.currentLang.set( lang );
    this.dataLocal.updateLang(this.currentLang());
  }
}
