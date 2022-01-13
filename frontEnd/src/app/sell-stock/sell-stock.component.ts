import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { AddAndSellService } from '../add-and-sell.service';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent implements OnInit {

  sellData: any = {}
  checkUnitsData: any = {}

  constructor(private addAndSellService: AddAndSellService) { }

  ngOnInit(): void {
  }

  addSale(){

    //assign username
    this.sellData.username = localStorage.getItem("username")

    //check for holdings
    this.addAndSellService.checkHoldings(this.sellData).subscribe(

      (res:any)=>{

        //access the res and check whether to delete or update the holdings
        let unitsRemainingAfterSale = res.units - this.sellData.units

        //fill in other data needed for the sellData
        this.sellData.companyName = res.companyName
        this.sellData.industry = res.industry
        this.sellData.purchasePrice = res.purchasePrice
        this.sellData.brokerageFeePurchase = res.brokerageFeePurchase
        this.sellData.dateBought = res.dateBought
        this.sellData.id = res._id
        this.sellData.remainingUnits = unitsRemainingAfterSale

        if(unitsRemainingAfterSale === 0){

          //if units are equal to the entire transaction remove from holdings
          this.addAndSellService.removeHoldings(this.sellData).subscribe(
            res=>{
              
              this.addAndSellService.sellStock(this.sellData).subscribe(
                res=>{
                  alert("Sale has been added !")
                },error=>{
                  alert("Sale has not been added !")
                }
              )

            }
          )

        }else{

          //if units are less than the units in holdings update holdings and add to sale
          this.addAndSellService.updateHoldings(this.sellData).subscribe(
            res=>{

              this.addAndSellService.sellStock(this.sellData).subscribe(
                res=>{
                  alert("Sale has been added !")
                },error=>{
                  alert("Sale has not been added !")
                }
              )
              
            }
          )
        }

      },
      error=>{
        
        if(error.error == "Not Found"){
          //if not enough units send error message
          alert("Invalid ticker or you don't have stock of this company")
        }else {
          //if incorrect ticker send error message

          alert("You only have " + error.error + " stocks in the first transaction")

        }
      }
    )
      
      


  }

  checkUnits(){

    this.checkUnitsData.username = localStorage.getItem("username")

    this.addAndSellService.checkUnits(this.checkUnitsData).subscribe(

      res=>alert("You have " + res + " units of " + this.checkUnitsData.ticker),
      error =>alert("Error finding Stock!")

      )
    
  }

}
