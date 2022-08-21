import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { DatatablesComponent } from './datatables.component';
import { DatatablesService } from './datatables.service';

const routes: Routes = [
  {
    path: 'blogs',
    component: DatatablesComponent,
    resolve: {
      datatables: DatatablesService
    },
    data: { animation: 'blogs' }
  }
];

@NgModule({
  declarations: [DatatablesComponent],
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
  providers: [DatatablesService]
})
export class DatatablesModule {}
