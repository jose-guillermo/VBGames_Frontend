import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './shared/services/theme.service';
import { TranslatorService } from './shared/services/translator.service';
import { UserService } from './shared/services/user.service';
import { FileService } from './shared/services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  private userService = inject(UserService);
  private themeService = inject(ThemeService);
  private translatorService = inject(TranslatorService);
  private FileService = inject(FileService);
}
