import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CsvModule } from "@ctrl/ngx-csv";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from "@core/common.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { HomeComponent } from "./home/home.component";

import { AddBlogModule } from './blogs/add-blog/add-blog.module';
import { BlogsListModule } from './blogs/blogs-list/blogs-list.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

const routes = [
  {
    path: "home",
    component: HomeComponent,
    data: { animation: "home" },
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    AddBlogModule,
    BlogsListModule,
    AuthenticationModule,
    MiscellaneousModule
  ],
  exports: [HomeComponent],
})
export class MainModule {}
