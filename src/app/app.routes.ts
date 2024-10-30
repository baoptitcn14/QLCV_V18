import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo/demo.component';
import { DialogComponent } from './demo/dialog/dialog.component';
import { FormComponent } from './demo/form/form.component';
import { HomeComponent } from './home/home.component';
import { SetTokenComponent } from './shared/components/set-token/set-token.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'category/:groupCode/:title',
    component: CategoryComponent,
  },
  {
    path: 'account/setToken',
    component: SetTokenComponent,
  },
  {
    path: 'demo',
    component: DemoComponent,
    data: {
      breadcrumb: 'Demo',
    },
    children: [
      {
        path: 'form',
        component: FormComponent,
        data: {
          breadcrumb: 'Form',
        },
      },
      {
        path: 'dialog',
        component: DialogComponent,
        data: {
          breadcrumb: 'Dialog',
        },
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];