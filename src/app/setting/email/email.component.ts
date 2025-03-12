import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
// import { Select } from 'primeng/select';

interface Category {
  key: string;
  name: string;
  children?: Category[];
}
interface Data {
  name: string;
  code: string;
}

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, CheckboxModule, TableModule, ButtonModule, DropdownModule,FormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
})
export class EmailComponent implements OnInit {

  onSave = { emit: () => console.log('Lưu dữ liệu') };
  onReload = { emit: () => console.log('Làm mới dữ liệu') };

  selectedEmailOption: string = 'work'; // Giá trị mặc định
  emailOptions = [
    { label: 'Công việc', value: 'work' },
    { label: 'Data', value: 'data' }
  ];

  selectedCategories: string[] = [];

  categories: Category[] = [
    {
      key: 'ilearn',
      name: 'ILEARN',
      children: [
        { key: 'analysis', name: 'Phân tích - Kiểm soát' },
        { key: 'sales', name: 'Sale - Marketing' },
        { key: 'legal', name: 'Pháp Lý - Pháp Chế' },
        {
          key: 'science',
          name: 'Bộ phận khoa học tự nhiên',
          children: [
            { key: 'physics', name: 'Bộ phận Lý' },
            { key: 'chemistry', name: 'Bộ phận Hóa' },
          ],
        },
        { key: 'hr', name: 'Nhân Sự' },
        { key: 'education', name: 'Giáo vụ' },
        { key: 'accounting', name: 'Kế toán' },
        { key: 'it', name: 'IT' },
        { key: 'maintenance', name: 'Kỹ Thuật - Bảo Trì Sửa Chữa' },
        { key: 'security', name: 'Bộ phận Bảo Vệ' },
        { key: 'elementary_math', name: 'Ban Chuyên Đề Toán Tiểu Học' },
        { key: 'math', name: 'Bộ phận Toán' },
        { key: 'elementary', name: 'Bộ phận Tiểu Học' },
      ],
    },
  ];

  ngOnInit() {
    this.selectedCategories = this.selectedCategories || [];
  }

  toggleParentCategory(category: Category) {
    if (!category.children) return;
  
    const allSelected = this.isParentSelected(category);
  
    if (allSelected) {
      // Bỏ chọn tất cả danh mục con
      this.selectedCategories = this.selectedCategories.filter(
        (key) => !category.children?.some((child) =>  child.key === key ||
        (child.children && child.children.some((subChild) => subChild.key === key)))
      );
    } else {
      // Chọn tất cả danh mục con nếu chưa chọn hết
      category.children.forEach((child) => {
        if (!this.selectedCategories.includes(child.key)) {
          this.selectedCategories.push(child.key);
        }
        // Nếu có danh mục con cấp 2, chọn luôn
        if (child.children) {
          child.children.forEach((subChild) => {
            if (!this.selectedCategories.includes(subChild.key)) {
              this.selectedCategories.push(subChild.key);
            }
          });
        }
      });
    }
  }
  
  /** Kiểm tra xem danh mục cha có được chọn hay không */
  isParentSelected(category: Category): boolean {
    if (!category.children) return false;
    return category.children.every((child) => this.selectedCategories.includes(child.key));
  }
  onCheckboxChange(key: string, event: any) {
    if (!Array.isArray(this.selectedCategories)) {
      this.selectedCategories = [];
    }
  
    if (event.checked) {
      this.selectedCategories.push(key);
    } else {
      this.selectedCategories = this.selectedCategories.filter(k => k !== key);
    }
  
    console.log("Updated selectedCategories:", this.selectedCategories);
  }
}
