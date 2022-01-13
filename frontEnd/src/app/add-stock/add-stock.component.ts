import { Component, OnInit } from '@angular/core';
import { AddAndSellService } from '../add-and-sell.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  //binding of html data
  stockData: any = {}

  constructor(private addAndSellService: AddAndSellService) { }

  ngOnInit(): void {
  }

  //add Stock function
  addStock(){

    this.stockData.username = localStorage.getItem("username")

    this.addAndSellService.addStock(this.stockData).subscribe(

      //if successful
      res => alert("Stock Added to your portfolio successfully !"),
      //if unsuccessful
      error =>alert("Stock addition failed, Please try again !")


    )
  }

}
