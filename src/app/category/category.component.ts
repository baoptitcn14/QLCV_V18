import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TreeTable, TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { Column } from '../shared/interfaces';
import {
  CategoryGuidGetDto,
  CategoryOutputDto,
  CriteriaRequestDto,
  Qlcv_CategoryServiceProxy,
} from '../shared/service-proxies/qlcv-service-proxies';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [TreeTableModule, CommonModule, ButtonModule, TagModule, InputTextModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  cols: Column[] = [
    { field: 'name', name: 'Tên danh mục' },
    { field: 'index', name: 'Vị trí', width: 120, styleClass: 'text-center' },
    {
      field: 'status',
      name: 'Trạng thái',
      width: 120,
      styleClass: 'text-center',
    },
    { field: '', name: '', width: 60, styleClass: 'text-center' },
  ];
  groupCode!: string | null;
  data!: TreeNode<CategoryOutputDto>[];
  title!: string | null;
  filterMode = 'lenient';
  isLoading = false;

  @ViewChild('tt') tt!: TreeTable;

  constructor(
    private qlcvCategoryService: Qlcv_CategoryServiceProxy,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.groupCode = this.activatedRoute.snapshot.params['groupCode'];
    this.title = this.activatedRoute.snapshot.params['title'];

    if (this.groupCode) {
      this.getListCategory().subscribe((res) => {
        const data = res.map((item) => ({
          key: item.id,
          label: item.name,
          data: item,
          children: this.getChildren(item, res).map((child) => ({
            key: child.id,
            label: child.name,
            data: child,
          })),
        }));

        this.data = data.filter((item) => !item.data.parentId);
      }, error => {}, () => this.isLoading = false);
    }
      
  }

  onSearchGolbal(event: any) {
    if (this.tt) {
      this.tt.filterGlobal(event.value, 'contains');
    }
  }

  private getChildren(
    category: CategoryOutputDto,
    listData: CategoryOutputDto[]
  ) {
    return listData.filter((item) => item.parentId === category.id);
  }

  private getListCategory() {
    this.isLoading = true;

    let input = new CategoryGuidGetDto();
    input.criterias = [];

    if (this.groupCode)
      input.criterias.push(
        new CriteriaRequestDto({
          propertyName: 'groupCode',
          operation: 0,
          value: this.groupCode,
        })
      );

    input.sorting = 'index asc';

    return this.qlcvCategoryService.getList(input);
  }
}