import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  countries: any[] = [];
  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 20, lng: 77 },
      zoom: 3
    });
    this.infoWindow = new google.maps.InfoWindow();
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/countries.json').subscribe(data => {
      this.countries = data;
    });
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
