import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'distribution-ceneter',
  templateUrl: './distrubution-center.component.html',

})
export class DistributionCenterComponent implements OnInit {
  activatedroute : any;
  currentpage: any;
  constructor(private activateroute: ActivatedRoute, private route : Router) {
    this.activatedroute = this.activateroute;
    this.currentpage = {};
    this.currentpage.name = "VOLUNTEERS";
    this.setSalestabActive();
  }

  setSalestabActive (){
    let url = this.route.url;
    let index = url.split("/");
    console.log(index);
    switch (index[3]){
      case "volunteers" :
         this.currentpage.name = "VOLUNTEERS";
      break;

      // case "request-cards" :
      //    this.currentpage.name = "REQUEST";
      // break;
      //
      // case "add-cards" :
      //    this.currentpage.name = "ADD";
      // break;
    }
}

  ngOnInit() {
  }

}
