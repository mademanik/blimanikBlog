import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { FakeDbService } from "@fake-db/fake-db.service";

import "hammerjs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr"; // For auth after login toast

import { CsvModule } from "@ctrl/ngx-csv";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";

import { CoreModule } from "@core/core.module";
import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule, CoreThemeCustomizerModule } from "@core/components";

import { coreConfig } from "app/app-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { httpInterceptorProviders } from "../_helpers/http.interceptor";
import { AppRoutingModule } from "./app-routing.module";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { HomeComponent } from "./home/home.component";

import { BlogsModule } from "./blogs/blogs.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { BerandaModule } from "./beranda/beranda.module";
import { AkunModule } from "./akun/akun.module";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true,
    }),
    AppRoutingModule,
    TranslateModule.forRoot(),
    CommonModule,
    CsvModule,
    NgxDatatableModule,
    NgSelectModule,
    CardSnippetModule,
    CoreModule,
    CoreCommonModule,
    ContentHeaderModule,
    CoreThemeCustomizerModule,
    CoreSidebarModule,
    LayoutModule,
    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    FormsModule,
    BlogsModule,
    AuthenticationModule,
    BerandaModule,
    AkunModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
