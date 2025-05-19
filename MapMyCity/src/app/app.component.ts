import { Component, AfterViewInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  map: any;

  countries = [
    {
      id: 'IN',
      name: 'India',
      selected: false,
      states: [
        {
          name: 'Maharashtra',
          capitals: [
            {
              name: 'Mumbai',
              lat: 19.076,
              lng: 72.8777,
              selected: false,
              knownFor: 'Bollywood'
            }
          ]
        }
      ]
    },
    {
      id: 'US',
      name: 'United States',
      selected: false,
      states: [
        {
          name: 'California',
          capitals: [
            {
              name: 'Sacramento',
              lat: 38.575764,
              lng: -121.478851,
              selected: false,
              knownFor: 'Tech industry'
            }
          ]
        }
      ]
    },
    {
      id: 'FR',
      name: 'France',
      selected: false,
      states: [
        {
          name: 'Île-de-France',
          capitals: [
            {
              name: 'Paris',
              lat: 48.8566,
              lng: 2.3522,
              selected: false,
              knownFor: 'Eiffel Tower'
            }
          ]
        }
      ]
    }
  ];

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([20.0, 77.0], 2.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  onCountrySelect(country: any) {
    // Just for triggering re-render
  }

  onCapitalSelect(capital: any) {
    if (capital.selected) {
      L.marker([capital.lat, capital.lng])
        .addTo(this.map)
        .bindPopup(`<b>${capital.name}</b><br>${capital.knownFor}`)
        .openPopup();
    }
  }

  goToCapital(capital: any) {
    this.map.setView([capital.lat, capital.lng], 6);
    L.popup()
      .setLatLng([capital.lat, capital.lng])
      .setContent(`<b>${capital.name}</b><br>${capital.knownFor}`)
      .openOn(this.map);
  }
}
