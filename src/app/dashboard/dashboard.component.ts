import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    SplitButtonModule
  ],  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listLevel: any[] = [
    { name: '0', code: 'NY' },
    { name: '1', code: 'NY' },
    { name: '2', code: 'RM' },
    { name: '3', code: 'LDN' },
    { name: '4', code: 'IST' },
    { name: '5', code: 'PRS' }
  ]; 
  listViewLevel: any[] = [
    { name: 'Xem đến bậc 0', code: '1' },
    { name: 'Xem đến bậc 1', code: '1' },
    { name: 'Xem đến bậc 2', code: '2' },
    { name: 'Xem đến bậc 3', code: '3' },
    { name: 'Xem đến bậc 4', code: '4' },
    { name: 'Xem đến bậc 5', code: '5' }
  ] ;
  items:any = [
    { label: 'Update', icon: 'pi pi-refresh', command: () => { this.update(); } },
    { label: 'Delete', icon: 'pi pi-times', command: () => { this.delete(); } },
    { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
    { label: 'Router', icon: 'pi pi-upload', routerLink: ['/fileupload'] }
  ];
  selectedCity: any | undefined;

  ngOnInit() {
  }
  update(){

  }
  delete(){

  }
}
