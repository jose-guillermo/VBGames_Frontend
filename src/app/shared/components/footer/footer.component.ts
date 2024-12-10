import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IonFooter, IonToolbar, IonLabel, IonButton, IonItem, IonButtons } from "@ionic/angular/standalone";
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'shared-component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButtons,  IonButton, IonLabel, IonFooter, IonToolbar, RouterModule, TranslatePipe ],
  standalone: true,
})
export class FooterComponent {
  private userService = inject(UserService);

  public privacyRoute = signal("/privacy");
  public version = signal("0.2.1")
  public userLogin = computed<boolean>(() => this.userService.user() ? true : false)

  public isAdmin = computed<boolean>(() => {
    if(this.userService.user()) {
      return this.userService.user()!.rol === "admin" ? true : false;
    }
    return false;
  })
  constructor() {

  }

}
