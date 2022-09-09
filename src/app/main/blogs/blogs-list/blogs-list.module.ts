import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { BlogsListComponent } from './blogs-list.component';
import { BlogsService } from '../blogs.service';

const routes: Routes = [
  {
    path: 'blogs',
    component: BlogsListComponent,
    resolve: {
      datatables: BlogsService
    },
    data: { animation: 'blogs' }
  }
];

@NgModule({
  declarations: [BlogsListComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule
  ],
  providers: [BlogsService]
})
export class BlogsListModule {}
