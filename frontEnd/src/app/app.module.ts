import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SignUpService } from './sign-up.service';
import { LoginService } from './login.service';
import { HomeComponent } from './home/home.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { SellStockComponent } from './sell-stock/sell-stock.component';
import { AddAndSellService } from './add-and-sell.service';
import { PortfolioService } from './portfolio.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    MyPortfolioComponent,
    AddStockComponent,
    SellStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SignUpService,
    LoginService,
    AddAndSellService,
    PortfolioService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
