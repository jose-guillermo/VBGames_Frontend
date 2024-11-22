import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { IonIcon, IonHeader, IonToolbar, IonImg } from "@ionic/angular/standalone";
import { ThemeService } from '../../services/theme.service';
import { MenuComponent } from "../menu/menu.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonHeader, IonToolbar, IonImg, MenuComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderComponent {

  public logo = computed(() => this.themeService.currentTheme() === "theme-dark" ? "logo-oscuro.png" : "logo-claro.png")

  private themeService = inject(ThemeService);

  constructor() { }


}
