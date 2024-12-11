import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

import { UserService } from 'src/app/shared/services/backend/user.service';
import { UserCardComponent } from "../../shared/components/user-card/user-card.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, CommonModule, FormsModule, TranslatePipe, UserCardComponent]
})
export default class ProfilePage implements OnInit {

  private userService = inject(UserService);

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

  handleImageError( e: any) {

  }
}
