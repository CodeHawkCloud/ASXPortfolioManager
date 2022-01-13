import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class PortfolioService {

//get holdings URL
private getHoldingsURL = "http://localhost:3002/api/getHoldings"

//get sales URL
private getSalesURL = "http://localhost:3002/api/getSales"

//get purchases URL
private getPurchasesURL = "http://localhost:3002/api/getPurchases"

//get current price URL
private getCurrentPriceURL = "http://localhost:3002/api/getCurrentPrice"

  constructor(private http: HttpClient) { 
  }

  //get Holdings
  getHoldings(user:any){
    return this.http.post(this.getHoldingsURL, user)
  }

  //get Sales
  getSales(user:any){
    return this.http.post(this.getSalesURL, user)
  }

  //get Purchases
  getPurchases(user:any){
    return this.http.post(this.getPurchasesURL, user)
  }

  //get current price
  getCurrentPrice(stock: any){
    return this.http.post(this.getCurrentPriceURL, stock)
  }
}
