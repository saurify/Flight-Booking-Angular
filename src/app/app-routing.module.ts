import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchConsoleComponent } from './home-page/search-console/search-console.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '', component:LoginPageComponent
  },
  {
    path: 'home', component:HomePageComponent
  },
  {
    path: 'temp-dev', component:SearchConsoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
