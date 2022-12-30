import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { BerandaComponent } from "app/beranda/beranda.component";

import { ReadBlogComponent } from "./read-blog/read-blog.component";

const routes: Routes = [
  {
    path: "beranda",
    component: BerandaComponent,
  },
  {
    path: "readBlog/:id",
    component: ReadBlogComponent,
    pathMatch : "full"
  },
];

@NgModule({
  declarations: [BerandaComponent, ReadBlogComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ContentHeaderModule,
    CardSnippetModule,
  ],
})
export class BerandaModule {}
