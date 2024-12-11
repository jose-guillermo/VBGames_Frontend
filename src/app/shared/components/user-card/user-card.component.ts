import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { IonLabel, IonCard, IonAvatar, IonImg, IonItem } from "@ionic/angular/standalone";
import { ImagePipe } from '../../pipes/image.pipe';
import { AchievementService } from '../../services/backend/achievement.service';
import { UserService } from '../../services/backend/user.service';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslatorService } from '../../services/translator.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

export function ComponentLoaderFactory(http: HttpClient): TranslateHttpLoader {
  console.log("cambiando traducción");

  return new TranslateHttpLoader(http, './assets/achievement/', '.json');
}
@Component({
  selector: 'shared-component-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ IonItem, IonImg, IonAvatar, IonCard, IonLabel, ImagePipe, TranslateModule ],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: ComponentLoaderFactory,
      deps: [HttpClient],
    },
    TranslateService, // Asegúrate de proveer el servicio
  ],
})
export class UserCardComponent  implements OnInit {

  private achievementService = inject(AchievementService);
  private userService = inject(UserService);
  private translate = inject(TranslateService);
  private translatorService = inject(TranslatorService);

  // public achievement = computed<string | null>(() => {
  //   if(this.translatorService.currentLang()) {
  //     return this.achievementService.favouriteAchievement() ? this.achievementService.favouriteAchievement()!.name : this.translate.instant("NO_FAVOURITE_ACHIEVEMENT");
  //   }
  // });

  public achievement = computed<string | null>(() => {
    if(this.translatorService.currentLang()) {
      if(true){
        console.log(this.translate.instant("TITLE"));

        return this.translate.instant("TITLE");
      } else {
        return this.translate.instant("NO_FAVOURITE_ACHIEVEMENT")
      }
    }
  });
  public userName = computed<string | null>(() => this.userService.user()!.userName)

  constructor() {
  }

  ngOnInit() {

  }

}
