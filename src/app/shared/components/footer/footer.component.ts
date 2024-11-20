import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IonFooter, IonToolbar, IonLabel, IonButton } from "@ionic/angular/standalone";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ IonButton, IonLabel, IonFooter, IonToolbar, RouterModule ],
  standalone: true,
})
export class FooterComponent {

  public privacyRoute = signal("/privacy");
  public version = signal("0.0.1")
  constructor() {
    console.log(this.privacyRoute());

  }

}
