import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  public currentLang = signal<string>("");

  constructor() { }
}
