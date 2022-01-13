import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './add-stock/add-stock.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { SellStockComponent } from './sell-stock/sell-stock.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [

  //default path
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  //signUp routes
  {
    path: 'signUp',
    component: SignUpComponent
  },
  //login routes
  {
    path: 'login',
    component: LoginComponent
  },

  //home routes
  {
    path: 'home',
    component: HomeComponent
  },
  
  //portfolio routes
  {
    path: 'portfolio',
    component: MyPortfolioComponent
  },

  //add a stock component
  {
    path: 'addAStock',
    component: AddStockComponent
  },

  //sell a stock component
  {
    path: 'sellAStock',
    component: SellStockComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
