import { Injectable, signal } from '@angular/core';

import { Achievement } from '../../Interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  public achievements = signal<Achievement | null>(null);
  // public favouriteAchievement = signal<Achievement | null>(null);
  public favouriteAchievement = signal<Achievement>(
    {
      id: '12345',
      game: 'Virtual Chess',
      coins: 150,
      level: 'Gold',
      name: 'Master Strategist'
    }
  );

  constructor() { }

  getAchievements () {

  }
}
