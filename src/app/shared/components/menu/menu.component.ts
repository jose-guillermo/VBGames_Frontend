import { ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import { IonMenuButton, IonButtons, IonButton, IonIcon, IonSelect, IonSelectOption, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moon, sunny, logIn, camera, settings } from 'ionicons/icons';
import { ThemeService } from '../../services/theme.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslatorService } from '../../services/translator.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Message, User } from '../../Interfaces/response.interface';
import { MessagesService } from '../../services/messages.service';
import { filter } from 'rxjs';

@Component({
  selector: 'shared-component-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [IonBadge,  IonIcon,  IonButton, IonButtons, IonicStorageModule, IonSelect, IonSelectOption, TranslatePipe, RouterModule, IonMenuButton ],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  private themeService = inject(ThemeService);
  private translatorService = inject(TranslatorService);
  private userService = inject(UserService);
  private messagesService = inject(MessagesService);

  public themeIcon = computed<string>(() => this.themeService.currentTheme() === "theme-dark" ? "moon" : "sunny");
  public selectedLang = computed<string>(() => this.translatorService.currentLang() || "es");
  public user = computed<User | null>(() => this.userService.user());
  public userLogin = computed<boolean>(() => this.userService.user() ? true : false);
  
  public isAdmin = computed<boolean>(() => {
    if(this.userService.user()) {
      return this.userService.user()!.rol === "admin" ? true : false;
    }
    return false;
  })

  public numNoReadMessages = computed<number>(() => {
    if(this.messagesService.messages()){
      const noReadMessages = this.messagesService.messages()!.filter( (message: Message) => !message.read);
      return noReadMessages.length;
    } else {
      return 1;
    }
  });

  constructor() {
    addIcons({logIn,settings,camera,moon,sunny});
  }

  changeTheme() {
    this.themeService.changeTheme();
  }

  changeLanguage( event: CustomEvent ) {
    this.translatorService.changeLang( event.detail.value )
  }

}
