import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  DynamicFormComponent,
  IControl,
} from '../../dynamic-form/dynamic-form.component';
import { FormGroup } from '@angular/forms';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [DynamicFormComponent, ButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  ngOnInit(): void {
    this.setTemplatePassword();
    this.setTemplateSelectButton();
  }

  @ViewChild('passwordFooter', { static: true })
  passwordFooter!: TemplateRef<any>;

  @ViewChild('passwordHeader', { static: true })
  passwordHeader!: TemplateRef<any>;

  @ViewChild('selectButtonTemplate', { static: true })
  selectButtonTemplate!: TemplateRef<any>;

  form = new FormGroup({});

  controls: IControl[] = [
    {
      key: 'text',
      type: 'text',
      label: 'Text',
      order: 1,
      value: '',
      cssClass: 'col-12 col-md-6',
      placeholder: '@ abc',
      required: true,
      pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
    },
    {
      key: 'number',
      type: 'number',
      label: 'Number',
      cssClass: 'col-12 col-md-6',
      order: 2,
      value: undefined,
      max: 100,
      min: 0,
      // incrementButtonIcon: 'pi pi-plus',
      // decrementButtonIcon: 'pi pi-minus',
    },
    {
      key: 'textArea',
      type: 'textarea',
      label: 'textArea',
      cssClass: 'col-12 col-md-6',
      order: 3,
      value: '',
      cols: 30,
      placeholder: 'asc',
    },
    {
      key: 'switch',
      type: 'switch',
      label: 'Switch',
      cssClass: 'col-12 col-md-6',
      order: 3,
      value: false,
      inline: true,
      onChange: (data) => this.form.patchValue({ number: 66 }),
    },
    {
      key: 'input_mask',
      type: 'input-mask',
      label: 'input_mask',
      cssClass: 'col-12 col-md-6',
      mask: '9a99-9999-9999',
      order: 3,
      value: '',
      onComplete: (data) => console.log(data),
    },
    {
      key: 'currency',
      type: 'currency',
      label: 'Currency',
      cssClass: 'col-12 col-md-6',
      order: 3,
      value: 20,
      disabled: true,
    },
    {
      key: 'checkbox1',
      type: 'checkbox',
      label: 'Checkbox 1',
      cssClass: 'col-12 col-md-6',
      order: 3,
      value: true,
    },
    {
      key: 'multiple_checkbox',
      type: 'multiple-checkbox',
      label: 'Multiple Checkbox',
      cssClass: 'col-12 col-md-6',
      order: 3,
      options: [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
        { id: '3', name: 'Option 3' },
      ],
      value: ['1', '2'],
    },
    {
      key: 'date_picker',
      type: 'date-picker',
      label: 'Date picker',
      cssClass: 'col-12 col-md-6',
      order: 3,
      value: '',
      view: 'year',
      dateFormat: 'yy',
    },
    {
      key: 'time_picker',
      type: 'time-picker',
      cssClass: 'col-12 col-md-6',
      label: 'Time picker',
      order: 3,
      value: '',
    },
    {
      key: 'chip',
      type: 'chip',
      cssClass: 'col-12 col-md-6',
      label: 'Chip',
      order: 3,
      value: [],
    },
    {
      key: 'select',
      type: 'select',
      cssClass: 'col-12 col-md-6',
      label: 'Select',
      virtualScroll: true,
      options: [],
      order: 3,
      value: '18',
      filter: true,
      filterBy: 'name',
      loading: false,
      onLazyLoad: (event: { first: number; last: number }) =>
        this.loadOptions(event),
    },
    {
      key: 'editor',
      type: 'editor',
      cssClass: 'col-12 col-md-12',
      label: 'Editor',
      order: 3,
      value: null,
    },
    {
      key: 'slider',
      type: 'slider',
      cssClass: 'col-12 col-md-6',
      label: 'Slider',
      order: 3,
      min: 0,
      value: null,
      max: 100,
    },
    {
      key: 'radio',
      type: 'radio',
      label: 'Radio',
      cssClass: 'col-12 col-md-6',
      order: 3,
      options: [
        { id: 'r_1', name: 'Option 1' },
        { id: 'r_2', name: 'Option 2' },
        { id: 'r_3', name: 'Option 3' },
      ],
      value: ['1', '2'],
    },

    {
      key: 'rating',
      type: 'rating',
      cssClass: 'col-12 col-md-6',
      label: 'Rating',
      order: 3,
      value: 0,
      templateIconOff: '<i class="pi pi-star"></i>',
      templateIconOn: '<i class="pi pi-star-fill"></i>',
    },
    {
      key: 'multi_select',
      type: 'multi-select',
      cssClass: 'col-12 col-md-6',
      label: 'Multi select',
      options: [
        {
          id: 'r_1',
          name: 'Option 1',
          items: [
            { id: 'i_11', name: 'Item 11' },
            { id: 'i_12', name: 'Item 12' },
          ],
        },
        {
          id: 'r_2',
          name: 'Option 2',
          items: [
            { id: 'i_21', name: 'Item 21' },
            { id: 'i_22', name: 'Item 22' },
          ],
        },
        {
          id: 'r_3',
          name: 'Option 3',
          items: [
            { id: 'i_31', name: 'Item 31' },
            { id: 'i_32', name: 'Item 32' },
          ],
        },
      ],
      order: 3,
      value: '',
      filter: true,
      group: true,
      display: 'comma',
    },
    {
      key: 'cascade_select',
      type: 'cascade-select',
      cssClass: 'col-12 col-md-6',
      label: 'Cascade select',
      order: 3,
      value: null,
      optionValue: 'code',
      optionLabel: 'name',
      optionGroupLabel: 'name',
      optionGroupChildren: ['states', 'cities'],
      options: [
        {
          name: 'Australia',
          code: 'AU',
          states: [
            {
              name: 'New South Wales',
              cities: [
                { name: 'Sydney', code: 'A-SY' },
                { name: 'Newcastle', code: 'A-NE' },
                { name: 'Wollongong', code: 'A-WO' },
              ],
            },
            {
              name: 'Queensland',
              cities: [
                { name: 'Brisbane', code: 'A-BR' },
                { name: 'Townsville', code: 'A-TO' },
              ],
            },
          ],
        },
        {
          name: 'Canada',
          code: 'CA',
          states: [
            {
              name: 'Quebec',
              cities: [
                { name: 'Montreal', code: 'C-MO' },
                { name: 'Quebec City', code: 'C-QU' },
              ],
            },
            {
              name: 'Ontario',
              cities: [
                { name: 'Ottawa', code: 'C-OT' },
                { name: 'Toronto', code: 'C-TO' },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'chip',
      type: 'chip',
      cssClass: 'col-12 col-md-6',
      label: 'Chip',
      order: 3,
      value: null,
    },
    {
      key: 'auto_complete',
      type: 'autocomplete',
      cssClass: 'col-12 col-md-6',
      label: 'Auto complete',
      order: 3,
      field: 'name',
      value: null,
      dropdown: true,
      lazy: true,
      options: [],
      onSearch: (event: any) => {
        const control = this.controls.find((c) => c.key === 'auto_complete');

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
          const { query } = event;
          const items = [...(control!.options || [])];

          for (let i = 0; i < 10; i++) {
            items[i] = { name: `Option ${i}`, id: i + '' };
          }

          control!.options = items;
        }, Math.random() * 1000 + 250);
      },
    },
    {
      key: 'keyfilter',
      type: 'keyfilter',
      cssClass: 'col-12 col-md-6',
      label: 'Key Filter',
      order: 3,
      value: null,
      keyFilter: 'num',
    },
    {
      key: 'password',
      type: 'password',
      cssClass: 'col-12 col-md-6',
      label: 'Password',
      order: 3,
      feedback: true,
      value: null,
      valueMatchFrom: 'confirm_password',
    },
    {
      key: 'confirm_password',
      type: 'password',
      cssClass: 'col-12 col-md-6',
      label: 'Confirm Password',
      order: 3,
      value: null,
      valueMatchWith: 'password',
      valueMatchMode: 'equals',     
      valueMatchFrom: 'confirm_password_1',

    },
    {
      key: 'confirm_password_1',
      type: 'password',
      cssClass: 'col-12 col-md-6',
      label: 'Confirm Password 1',
      order: 3,
      value: null,
      valueMatchWith: 'confirm_password',
      valueMatchMode: 'equals',
    },
    {
      key: 'listbox',
      type: 'listbox',
      cssClass: 'col-12 col-md-6',
      label: 'List box',
      order: 3,
      value: null,
      multiple: true,
      group: true,
      filter: true,
      options: [
        {
          id: 'r_1',
          name: 'Option 1',
          items: [
            { id: 'i_11', name: 'Item 11' },
            { id: 'i_12', name: 'Item 12' },
          ],
        },
        {
          id: 'r_2',
          name: 'Option 2',
          items: [
            { id: 'i_21', name: 'Item 21' },
            { id: 'i_22', name: 'Item 22' },
          ],
        },
        {
          id: 'r_3',
          name: 'Option 3',
          items: [
            { id: 'i_31', name: 'Item 31' },
            { id: 'i_32', name: 'Item 32' },
          ],
        },
      ],
    },
    {
      key: 'selectbutton',
      type: 'select-button',
      cssClass: 'col-12 col-md-6',
      label: 'Select button',
      order: 3,
      value: null,
      optionValue: 'iicon',
      options: [
        { iicon: 'pi pi-align-left', justify: 'Left' },
        { iicon: 'pi pi-align-right', justify: 'Right' },
        { iicon: 'pi pi-align-center', justify: 'Center' },
        { iicon: 'pi pi-align-justify', justify: 'Justify' },
      ],
    },
    {
      key: 'toggle_button',
      type: 'toggle-button',
      cssClass: 'col-12 col-md-6',
      label: 'Toggle button',
      order: 3,
      styleClass: 'w-auto',
      value: null,
    },
    {
      key: 'treeselect',
      type: 'tree-select',
      cssClass: 'col-12 col-md-6',
      label: 'Tree select',
      order: 3,
      value: null,
      selectionModeTreeSelect: 'multiple',
      metaKeySelection: false,
      options: [
        {
          label: 'Documents',
          data: 'Documents Folder',
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [
            {
              label: 'Work',
              data: 'Work Folder',
              expandedIcon: 'pi pi-folder-open',
              collapsedIcon: 'pi pi-folder',
              children: [
                {
                  label: 'Expenses.doc',
                  icon: 'pi pi-file',
                  data: 'Expenses Document',
                },
                {
                  label: 'Resume.doc',
                  icon: 'pi pi-file',
                  data: 'Resume Document',
                },
              ],
            },
            {
              label: 'Home',
              data: 'Home Folder',
              expandedIcon: 'pi pi-folder-open',
              collapsedIcon: 'pi pi-folder',
              children: [
                {
                  label: 'Invoices.txt',
                  icon: 'pi pi-file',
                  data: 'Invoices for this month',
                },
              ],
            },
          ],
        },
        {
          label: 'Pictures',
          data: 'Pictures Folder',
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [
            {
              label: 'barcelona.jpg',
              icon: 'pi pi-image',
              data: 'Barcelona Photo',
            },
            { label: 'logo.jpg', icon: 'pi pi-file', data: 'PrimeFaces Logo' },
            { label: 'primeui.png', icon: 'pi pi-image', data: 'PrimeUI Logo' },
          ],
        },
        {
          label: 'Movies',
          data: 'Movies Folder',
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [
            {
              label: 'Al Pacino',
              data: 'Pacino Movies',
              children: [
                {
                  label: 'Scarface',
                  icon: 'pi pi-video',
                  data: 'Scarface Movie',
                },
                {
                  label: 'Serpico',
                  icon: 'pi pi-file-video',
                  data: 'Serpico Movie',
                },
              ],
            },
            {
              label: 'Robert De Niro',
              data: 'De Niro Movies',
              children: [
                {
                  label: 'Goodfellas',
                  icon: 'pi pi-video',
                  data: 'Goodfellas Movie',
                },
                {
                  label: 'Untouchables',
                  icon: 'pi pi-video',
                  data: 'Untouchables Movie',
                },
              ],
            },
          ],
        },
      ] as TreeNode[],
    },
    {
      key: 'knob',
      type: 'knob',
      cssClass: 'col-12 col-md-6',
      label: 'Knob',
      order: 3,
      value: 70,
    },
    {
      key: 'fileupload',
      type: 'file-upload',
      cssClass: 'col-12 col-md-12',
      label: 'File upload',
      order: 3,
      value: [],
      required: true,
    },
  ];

  readonly skipCount = 3;

  private setTemplatePassword() {
    const control = this.controls.find((c) => c.key === 'password');

    control!.passwordFooterTemplate = this.passwordFooter;
    control!.passwordHeaderTemplate = this.passwordHeader;
  }

  private setTemplateSelectButton() {
    const control = this.controls.find((c) => c.key === 'selectbutton');

    control!.selectButtonTemplate = this.selectButtonTemplate;
  }

  loadLazyTimeout?: any;

  private loadOptions(event: { first: number; last: number }) {
    const control = this.controls.find((c) => c.key === 'select');

    control!.loading = true;

    if (this.loadLazyTimeout) {
      clearTimeout(this.loadLazyTimeout);
    }

    //imitate delay of a backend call
    this.loadLazyTimeout = setTimeout(() => {
      const { first, last } = event;
      const items = [...(control!.options || [])];

      for (let i = last; i < last + this.skipCount; i++) {
        items[i] = { name: `Option ${i}`, id: i + '' };
      }

      control!.options = items;

      control!.loading = false;
    }, Math.random() * 1000 + 250);
  }

  onSubmit() {
    console.log(this.form);

  }
}
