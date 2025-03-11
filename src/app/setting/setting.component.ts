import { Component } from '@angular/core';
import { DefineDateTimeComponent } from './define-date-time/define-date-time.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [DefineDateTimeComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {

}
