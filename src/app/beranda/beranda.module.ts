import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

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
  },
];

@NgModule({
  declarations: [BerandaComponent, ReadBlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ContentHeaderModule,
  ],
})
export class BerandaModule {}
