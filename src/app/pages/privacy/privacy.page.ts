import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule, FormsModule, TranslatePipe ]
})
export default class PrivacyPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("privacy works");

  }

}
