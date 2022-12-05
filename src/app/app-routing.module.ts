import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    data: { animation: "home" },
  },
  { path: "", redirectTo: "beranda", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
