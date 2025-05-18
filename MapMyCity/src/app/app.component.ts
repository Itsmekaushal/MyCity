import { Component } from '@angular/core';

interface State {
  name: string;
  capital: string;
  lat: number;
  lng: number;
  knownFor: string;
}

interface Country {
  name: string;
  selected: boolean;
  states: State[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  center = { lat: 20.5937, lng: 78.9629 };
  zoom = 4;

  countries: Country[] = [
    {
      name: 'India',
      selected: false,
      states: [
        { name: 'Maharashtra', capital: 'Mumbai', lat: 19.076, lng: 72.8777, knownFor: 'Bollywood & Finance' },
        { name: 'West Bengal', capital: 'Kolkata', lat: 22.5726, lng: 88.3639, knownFor: 'Culture & Literature' }
      ]
    },
    {
      name: 'USA',
      selected: false,
      states: [
        { name: 'California', capital: 'Sacramento', lat: 38.5816, lng: -121.4944, knownFor: 'Tech Hub' },
        { name: 'Texas', capital: 'Austin', lat: 30.2672, lng: -97.7431, knownFor: 'Music Capital' }
      ]
    }
  ];

  selectedCapitals: State[] = [];

  toggleCountry(country: Country) {
    country.selected = !country.selected;
    this.updateSelectedCapitals();
  }

  updateSelectedCapitals() {
    this.selectedCapitals = this.countries
      .filter(c => c.selected)
      .flatMap(c => c.states);
  }
}
