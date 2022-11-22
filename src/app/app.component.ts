import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'StarWars';
  public planetDetails: any = [];
  public movieDetails: any=[]
  public searchedPlanet: any = [];
  public searchedMovie: any = [];
  public localStorageforPlanets = [];
  public localStorageforMovies = [];
  public selectedTab: string = 'planets';
  public contentLoaded: boolean = false


  public selectTab(tab: string) {
    this.selectedTab = tab;
    if(this.movieDetails.length == 0 && tab=='movies'){
      this.contentLoaded = false;
    } else if (this.planetDetails.length == 0 && tab == 'planets') {
      this.contentLoaded = false;
    } else {
      this.contentLoaded = true;
    }
  }

  constructor(private apiService: ApiService) {
    // Planets
    this.contentLoaded = false;
    this.apiService.getPlanetsApiDetails().subscribe(
      (next: any) => {
        this.planetDetails = next;
        this.contentLoaded = true;
        this.searchedPlanet = this.planetDetails.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
    // Movies
    this.apiService.getMoviesApiDetails().subscribe(
      (next: any) => {
        this.movieDetails = next;
        this.contentLoaded = true;
        this.searchedMovie = this.movieDetails.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.localStorageforPlanets = this.apiService.localStorageforPlanets;
    this.localStorageforMovies = this.apiService.localStorageforMovies;
  }

  ngOnInit(): void {
    this.localStorageforMovies = this.apiService.localStorageforPlanets;
  }

  // Planet Search Functionality
  public searchPlanet(planetName: any) {
    if (!planetName) {
      console.log('empty');
      this.searchedPlanet = this.planetDetails.results;
    } else {
      this.searchedPlanet = [];
      for (let i = 0; i < this.planetDetails.results.length; i++) {
        if (
          this.planetDetails.results[i].name
            .toString()
            .toLowerCase()
            .includes(planetName.toLowerCase())
        ) {
          this.searchedPlanet.push(this.planetDetails.results[i]);
        }
      }
    }
  }

  // Movie Search Functionality
  public searchMovie(movieName: any) {
    if (!movieName) {
      this.searchedMovie = this.movieDetails.results;
    } else {
      this.searchedMovie = [];

      for (let i = 0; i < this.movieDetails.results.length; i++) {
        if (
          this.movieDetails.results[i].title
            .toString()
            .toLowerCase()
            .includes(movieName.toLowerCase())
        ) {
          this.searchedMovie.push(this.movieDetails.results[i]);
        }
      }
    }
  }

  public addedPlanet: any[] = [];
  // Add Planets
  public addPlanet(planet: any) {
    this.addedPlanet.push(planet);
    this.apiService.addPlanetToLocalStorage(this.addedPlanet);
    this.getLocalStorageDetailsForPlanets();
  }

  // Add Movie
  public addedMovie: any[] = [];
  public addMovie(movie: any) {
    this.addedMovie.push(movie);
    this.apiService.addMovieToLocalStorage(this.addedMovie);
    this.getLocalStorageDetailsForMovies();
  }

  getLocalStorageDetailsForPlanets() {
    this.localStorageforPlanets = this.apiService.localStorageforPlanets;
    return this.localStorageforPlanets;
  }
  getLocalStorageDetailsForMovies() {
    this.localStorageforMovies = this.apiService.localStorageforMovies;
    return this.localStorageforMovies;
  }
}
