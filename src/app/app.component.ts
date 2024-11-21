import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './shared/services/theme.service';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";
import { TranslatorService } from './shared/services/translator.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {


  private themeService = inject(ThemeService);
  private translatorService = inject(TranslatorService);

}
