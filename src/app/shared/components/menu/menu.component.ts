import { ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import { IonButtons, IonButton, IonIcon, IonLabel, IonSelect, IonSelectOption, IonItem } from '@ionic/angular/standalone';
import { DownloadButtonComponent } from '../download-button/download-button.component';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';
import { ThemeService } from '../../services/theme.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslatorService } from '../../services/translator.service';

@Component({
  selector: 'shared-component-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [ IonIcon,  IonButton, IonButtons, DownloadButtonComponent, IonicStorageModule, IonSelect, IonSelectOption, ],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  public themeIcon = computed(() => this.themeService.currentTheme() === "theme-dark" ? "moon" : "sunny")
  public selectedLang = computed(() => this.translatorService.currentLang())

  private themeService = inject(ThemeService);
  private translatorService = inject(TranslatorService)

  constructor() {
    addIcons({ moon, sunny });
  }

  changeTheme() {
    this.themeService.changeTheme();
  }

  changeLanguage( event: CustomEvent ) {
    console.log(event);
    this.translatorService.changeLang( event.detail.value )
  }

}
