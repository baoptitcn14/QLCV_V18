import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent implements OnInit {

  constructor(
    // private readonly dashboardService:DashboardService
  ){}

  listGroup:any = [];

  ngOnInit(): void {
    // this.listGroup = this.dashboardService.listGroup
    var a = this.checkArr(0,[])
    console.log(a)
  }
  checkArr(index: number = 0, arr: any[]):any[] {
    if (index > 5) {
      return arr; // Điều kiện dừng, trả về mảng khi index > 5
    }
    arr.push(index)
    index++; // Tăng chỉ số lên 
    return this.checkArr(index, arr); // Gọi đệ quy
  }
}
