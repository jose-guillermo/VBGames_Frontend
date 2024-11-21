import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { DownloadButtonComponent } from '../download-button/download-button.component';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';
import { ThemeService } from '../../services/theme.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@Component({
  selector: 'shared-component-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [ IonIcon,  IonButton, IonButtons, DownloadButtonComponent, IonicStorageModule ],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  public themeIcon = computed(() => this.themeService.currentTheme() === "theme-dark" ? "moon" : "sunny")

  private themeService = inject(ThemeService);

  constructor() {
    addIcons({ moon, sunny });
  }

  changeTheme() {
    this.themeService.changeTheme();
  }

}
