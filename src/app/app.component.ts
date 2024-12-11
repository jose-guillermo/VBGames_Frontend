import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './shared/services/theme.service';
import { TranslatorService } from './shared/services/translator.service';
import { UserService } from './shared/services/user.service';
import { FileService } from './shared/services/file.service';
import { RealtimeDatabaseService } from './shared/services/realtime-database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  private userService = inject(UserService);
  private themeService = inject(ThemeService);
  private translatorService = inject(TranslatorService);
  private FileService = inject(FileService);
  private realtimeDatabase = inject(RealtimeDatabaseService)

  constructor() {
    this.realtimeDatabase.writeData('users/1', { username: 'test', score: 100 });

    // this.realtimeDatabase.writeData('users/1', { username: 'test', score: 100 });
    // this.realtimeDatabase.loadData("users/1");
    // this.realtimeDatabase.listenForChanges('users');
    // this.realtimeDatabase.writeData('users/1', { username: 'test', score: 200 });
    // this.realtimeDatabase.writeData('users/1', { username: 'test', score: 300 });
    // this.realtimeDatabase.writeData('users/1', { username: 'test', score: 400 });
    // this.realtimeDatabase.writeData('users/1', { username: 'test', score: 500 });
    this.realtimeDatabase.listenForChanges("users");
    this.realtimeDatabase.listenUsersConected();
  }
}
