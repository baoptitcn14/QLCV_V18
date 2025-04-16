import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    ButtonModule,
    InputIconModule,
    InputTextareaModule,
    InputTextModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

}
