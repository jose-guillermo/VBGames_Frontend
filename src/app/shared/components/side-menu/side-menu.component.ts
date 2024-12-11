import { Component, computed, inject, OnInit } from '@angular/core';
import { IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonContent, IonMenu, IonMenuToggle, IonButtons, IonButton, IonIcon, IonCol, IonRow, IonBadge, IonFooter } from '@ionic/angular/standalone';
import { UserService } from '../../services/user.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { settings } from 'ionicons/icons';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../Interfaces/response.interface';

@Component({
  selector: 'shared-component-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [ IonItem, IonTitle, IonToolbar, IonHeader,  IonContent, IonMenu, IonMenuToggle, TranslatePipe, RouterModule, IonButton, IonIcon, IonBadge, IonFooter ],
})
export class SideMenuComponent {

  private userService = inject(UserService);
  private messagesService = inject(MessagesService);

  public numNoReadMessages = computed<number>(() => {
    if(this.messagesService.messages()){
      const noReadMessages = this.messagesService.messages()!.filter( (message: Message) => !message.read);
      return noReadMessages.length;
    } else {
      return 1;
    }
  });

  public isAdmin = computed<boolean>(() => {
    if(this.userService.user()) {
      return this.userService.user()!.rol === "admin" ? true : false;
    }
    return false;
  })

  constructor() {
    addIcons({ settings });

  }

  logout() {
    this.userService.logout();
    
  }

}
