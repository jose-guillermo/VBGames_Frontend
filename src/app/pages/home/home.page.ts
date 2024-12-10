import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonInput } from "@ionic/angular/standalone";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [ RouterModule ],
})
export default class HomePage {

  constructor(){
  }

}
