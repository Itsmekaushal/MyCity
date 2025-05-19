import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;

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
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 20, lng: 77 },
      zoom: 3
    });

    this.infoWindow = new google.maps.InfoWindow();
  }

  onCapitalSelect(capital: any) {
    if (capital.selected) {
      const marker = new google.maps.Marker({
        position: { lat: capital.lat, lng: capital.lng },
        map: this.map,
        title: capital.name
      });

      marker.addListener('click', () => {
        this.infoWindow.setContent(`<b>${capital.name}</b><br>${capital.knownFor}`);
        this.infoWindow.open(this.map, marker);
      });
    }
  }

  goToCapital(capital: any) {
    this.map.setZoom(6);
    this.map.setCenter({ lat: capital.lat, lng: capital.lng });
    this.infoWindow.setContent(`<b>${capital.name}</b><br>${capital.knownFor}`);
    this.infoWindow.setPosition({ lat: capital.lat, lng: capital.lng });
    this.infoWindow.open(this.map);
  }
}
