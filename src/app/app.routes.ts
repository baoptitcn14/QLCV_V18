import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo/demo.component';
import { DialogComponent } from './demo/dialog/dialog.component';
import { FormComponent } from './demo/form/form.component';
import { HomeComponent } from './home/home.component';
import { SetTokenComponent } from './shared/components/set-token/set-token.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileReportComponent } from './file-report/file-report.component';
import { DefineDateTimeComponent } from './setting/define-date-time/define-date-time.component';
import { ReportDataComponent } from './setting/report-data/report-data.component';
import { TemplateReportComponent } from './setting/template-report/template-report.component';
import { EmailComponent } from './setting/email/email.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'file-report',
    component: FileReportComponent,
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
    path: 'setting-time',
    component: DefineDateTimeComponent,
  },
  {
    path: 'setting-reportdata',
    component: ReportDataComponent,
  },
  {
    path: 'setting-templatereport',
    component: TemplateReportComponent,
  },
  {
    path: 'setting-email',
    component: EmailComponent,
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
