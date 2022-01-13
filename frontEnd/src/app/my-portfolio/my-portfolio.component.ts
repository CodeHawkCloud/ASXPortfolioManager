import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnInit {
  
  //div activation
  activateDivision = {

    holdingsDiv : true,
    salesDiv : false,
    purchasesDiv : false

  }

  //user data
  userData: any = {}
  //Holdings data
  holdingsData: any = []
  //Purchases data
  purchasesData: any = []
  //Sales data
  salesData: any = []

  //stockData
  stockData: any = []
  
  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {

    //store username
    this.userData.username = localStorage.getItem("username")

    //call for the get Holdings, get Sales, and get Purchases and assign in the relevant objects
    this.portfolioService.getHoldings(this.userData).subscribe(

      res=>{
        this.holdingsData = res
        console.log(this.holdingsData)
      }
        ,
      error=>alert("Unable to load holdings, please try again later !")
    )

    this.portfolioService.getSales(this.userData).subscribe(

      res=>this.salesData = res,
      error=>alert("Unable to load sales, please try again later !")
    )

    this.portfolioService.getPurchases(this.userData).subscribe(

      res=>this.purchasesData = res,
      error=>alert("Unable to load purchases, please try again later !")
    )

    
  }

  //calculate total cost
  getTotalCost(units: number, pp: number, brokeragePurchase: number, brokerageSale: number){

    let tempTotalCost: number

    tempTotalCost = (units * pp) + brokeragePurchase + brokerageSale

    return tempTotalCost

   }

   //get the current prices
   getCurrentPrice(ticker:string){

    let tempStock: any = {}
    tempStock.symbol = ticker

    this.portfolioService.getCurrentPrice(tempStock).subscribe(
      res => {
        this.stockData = res

      }, error=>{

      }
      
    )

    return this.stockData.financialData.currentPrice

    
  }
  
  //get sale value
  getSaleValue(price:number, units: number){
    return price * units
  }

  //get profit or loss
  getPOrL(saleValue:number, cost:number){

    return saleValue - cost
  }
  

}
