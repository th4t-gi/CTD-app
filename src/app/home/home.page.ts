import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController} from '@ionic/angular';
import { DetailPopoverComponent } from '../detail-popover/detail-popover.component';

declare var google;
var soda = require('soda-js');
var consumer;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public popoverController: PopoverController) {
    consumer = new soda.Consumer('data.coloradosprings.gov')

  }

  ionViewDidEnter(){
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat:  38.8461271, lng: -104.800644},
      zoom: 15
    });
    this.getdata();
  }

  async showDetails(ev: any) {
    const popover = await this.popoverController.create({
      component: DetailPopoverComponent,
      event: ev,
      mode: "ios",
      cssClass: 'detail-popover'
    });
    return await popover.present();
  }

  getdata() {
    consumer.query()
      .withDataset('sas5-6mn5')
      .getRows()
      .on('success', function(rows: any) {
        console.log(rows);
        let map = this.map
        rows.forEach(
          function (row) {
              let lat = row.geocoded_column.coordinates[1]
              let lon = row.geocoded_column.coordinates[0]
              let latLng = new google.maps.LatLng(lat, lon);

              let marker = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: latLng
              });

              //this.markers.push(marker);
          }
          )
      })
      .on('error', function(error: any) { console.error(error); });
  }

  // plotProvider(row: any) {
  //
  // }

  // addMarker(lat: number, lng: number): void {
  //
  //
  //   }
}
