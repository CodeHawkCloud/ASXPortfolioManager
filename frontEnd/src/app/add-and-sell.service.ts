import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddAndSellService {

  //add Stock URL
  private addStockURL = "http://localhost:3002/api/addStock"

  //sell Stock URL
  private sellStockURL = "http://localhost:3002/api/addSale"

  //remove from holdings URL
  private removeFromHoldingsURL = "http://localhost:3002/api/removeFromHoldings"

  //update holdings URL
  private updateHoldingsURL = "http://localhost:3002/api/updateHoldings"

  //check holdings URL
  private checkHoldingsURL = "http://localhost:3002/api/checkHolding"

  //check units URL
  private checkUnitsURL = "http://localhost:3002/api/checkUnits"

  constructor(private http: HttpClient) {}

  //add stock function
  addStock(purchaseInfo: any){
    return this.http.post(this.addStockURL, purchaseInfo)
  }

  //sell stock function
  sellStock(saleInfo: any){
    return this.http.post(this.sellStockURL, saleInfo, {responseType: "text"})
  }

  //check holdings
  checkHoldings(holdingInfo: any){
    return this.http.post(this.checkHoldingsURL, holdingInfo)
  }

  //update holdings
  updateHoldings(holdingsInfo: any){
    return this.http.post(this.updateHoldingsURL, holdingsInfo)
  }

  //remove holdings
  removeHoldings(holdingsInfo: any){
    return this.http.post(this.removeFromHoldingsURL, holdingsInfo, {responseType: "text"})
  }

  //check units
  checkUnits(info:any){
    return this.http.post(this.checkUnitsURL, info)
  }

}
