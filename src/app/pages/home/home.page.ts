import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { MenuComponent } from "../../shared/components/menu/menu.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [IonContent, MenuComponent, FooterComponent, RouterModule],
})
export default class HomePage {

  constructor(){
  }

}
