import { computed, inject, Injectable, signal } from '@angular/core';
import { DataLocalService } from './data-local.service';
import { Achievement } from '../Interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  private dataLocal = inject(DataLocalService);
  public achievements = signal<Achievement | null>(null);
  public favouriteAchievement = signal<Achievement | null>(null);

  constructor() { }



  getAchievements () {
    
  }
}
