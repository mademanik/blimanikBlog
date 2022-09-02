import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { QuillModule } from "ngx-quill";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCommonModule } from "@core/common.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { AddBlogComponent } from "./add-blog.component";

const routes: Routes = [
  {
    path: "addBlog",
    component: AddBlogComponent,
    data: { animation: "table" },
  },
  {
    path: "editBlog/:id",
    component: AddBlogComponent,
    data: { animation: "table" },
  },
];

@NgModule({
  declarations: [AddBlogComponent],
  imports: [
    RouterModule.forChild(routes),
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    CardSnippetModule,
    CoreCommonModule,
    QuillModule.forRoot(),
  ],
})
export class AddBlogModule {}
