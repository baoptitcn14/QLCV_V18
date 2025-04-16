import { TableModule } from 'primeng/table';
import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notify-search',
  standalone: true,
  imports: [
    ToolbarModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './notify-search.component.html',
  styleUrl: './notify-search.component.scss'
})
export class NotifySearchComponent {
  onRefresh =  { emit: () => console.log('Làm mới') };
  onReport  =  { emit: () => console.log('Xuất Excel') };
    
}

