import { Injectable, signal } from '@angular/core';

import { Achievement } from '../../Interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  public achievements = signal<Achievement | null>(null);
  public favouriteAchievement = signal<Achievement | null>(null);

  constructor() { }

  getAchievements () {

  }
}
