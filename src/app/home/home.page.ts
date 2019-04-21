import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController} from '@ionic/angular';
import { DetailPopoverComponent } from '../detail-popover/detail-popover.component';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public popoverController: PopoverController) {

  }

  ionViewDidEnter(){
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645},
      zoom: 15
    });
  }
}
