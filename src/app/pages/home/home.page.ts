import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [IonContent, FooterComponent, RouterModule, HeaderComponent],
})
export default class HomePage {

  constructor(){
  }

}
