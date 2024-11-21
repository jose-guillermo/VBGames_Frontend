import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonApp, IonRouterOutlet,],
})
export class AppComponent {

  private themeService = inject(ThemeService);
  // private translateService = inject(TranslateService);

  constructor() {
    // this.translateService.setDefaultLang('en');
  }

  changeLanguage(lang: string){
    // this.translateService.use(lang);
  }
}
