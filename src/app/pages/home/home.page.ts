import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton } from "@ionic/angular/standalone";

import { RealtimeDatabaseService } from 'src/app/shared/services/realtime-database.service';
import { UserCardComponent } from "../../shared/components/user-card/user-card.component";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [IonButton, RouterModule, UserCardComponent],
})
export default class HomePage {

  private realtimeDb = inject(RealtimeDatabaseService);
  constructor(){
  }

  onClick() {
    const randomNumber = Math.random();
    this.realtimeDb.writeData('users/2', { name: 'test5', score: randomNumber });

  }
}
