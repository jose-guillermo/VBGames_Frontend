import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonImg, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonRow, IonCol, IonIcon, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { UserService } from 'src/app/shared/services/user.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ImagePipe } from 'src/app/shared/pipes/image.pipe';
import { UserCardComponent } from "../../shared/components/user-card/user-card.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, FormsModule, TranslatePipe, ImagePipe, UserCardComponent]
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
