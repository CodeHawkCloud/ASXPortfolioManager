import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { Stock } from '../stock.=model';

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

  //Holdings
  holdingsData: any = []
  stockTickerSet= new Set<String> ()
  stockTicker:String[] = []
  stockTickerWithoutAX:String[] = []
  currentFinancialDataAndSymbol: any = []
  filteredPrices: number[] = []
  stockTickerAndPrice: Stock[] = []
  totalProfitOrLoss:number = 0

  //Purchases
  purchasesData: any = []

  //Sales data
  salesData: any = []

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {

    //store username
    this.userData.username = localStorage.getItem("username")

    //call for the get Holdings
    this.portfolioService.getHoldings(this.userData).subscribe(

      res=>{
        this.holdingsData = res
        
        //set the ticker names to the stockTicker object
        this.setTickerNames()

        //call to get prices of the tickers
        this.portfolioService.getPricesOfAllStocks(this.stockTicker).subscribe(

          res=>{

            this.currentFinancialDataAndSymbol = res

            //call the fucntion to get the prices
            this.filterPrices()

            //combine tickers and prices to one array

            for(let i = 0; i < this.filteredPrices.length; i++){

              //remove .AX from the tickers
              this.stockTickerWithoutAX[i] = this.stockTicker[i].replace(".AX", "");

              let s1 = new Stock()

              s1.ticker = this.stockTickerWithoutAX[i]
              s1.price = this.filteredPrices[i]

              this.stockTickerAndPrice.push(s1)


            }
    

          },
          error=>alert("Unable to get current prices, please try again later !")
        )

      }
        ,
      error=>alert("Unable to load holdings, please try again later !")
    )

    //call for getSales
    this.portfolioService.getSales(this.userData).subscribe(

      res=>this.salesData = res,
      error=>alert("Unable to load sales, please try again later !")
    )

    //call for getPurchases
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

    // let tempStock: any = {}
    // tempStock.symbol = ticker

    // this.portfolioService.getCurrentPrice(tempStock).subscribe(
    //   res => {
    //     this.stockData = res

    //   }, error=>{

    //   }
      
    // )

    // return this.stockData.financialData.currentPrice

    
  }
  
  //get sale value
  getSaleValue(price:number, units: number){
    return price * units
  }

  //get profit or loss
  getPOrL(saleValue:number, cost:number){

    return saleValue - cost
  }

  //loop through holdings and assing stock names to a string array
  setTickerNames(){

    for(let i = 0; i < this.holdingsData.holdings.length; i++){

      this.stockTickerSet.add(this.holdingsData.holdings[i].ticker)

    }

    //add the tickers to stockTicker String object and .AX at the end
    let k = 0;
    for(let tempTicker of this.stockTickerSet){

      //add to the string object
      this.stockTicker[k] = tempTicker

      //add .AX at the end
      this.stockTicker[k] = this.stockTicker[k] + ".AX"
      
      //increment k
      k++
    
    }
    
  }

  //filter current prices
  filterPrices(){

    let k = 0
    for(let i  in this.currentFinancialDataAndSymbol){
   
        this.filteredPrices[k] = this.currentFinancialDataAndSymbol[i].financialData.currentPrice
        
        k++
    }

  }
  

}
