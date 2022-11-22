import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public localStorageforPlanets:any = [];
  public localStorageforMovies: any = [];

  public planetsUrl = 'https://swapi.dev/api/planets/';
  public moviesUrl = 'https://swapi.dev/api/films/';

  constructor(private http: HttpClient) {}

  public getPlanetsApiDetails() {
    return this.http.get(this.planetsUrl);
  }

  public getMoviesApiDetails() {
    return this.http.get(this.moviesUrl);
  }

  public addPlanetToLocalStorage(savedPlanet: any) {
    for (let i = 0; i < savedPlanet.length; i++) {
      localStorage.setItem('Planet' + [i + 1], JSON.stringify(savedPlanet[i]));
    }

    this.localStorageforPlanets=[]
    for(let i=0; i<savedPlanet.length;i++){
      this.localStorageforPlanets.push(
        JSON.parse(localStorage.getItem('Planet' + (i + 1)) || '{}')
      );
    }

    console.log(this.localStorageforPlanets);
    

  }

  public addMovieToLocalStorage(savedMovie: any) {
    for (let i = 0; i < savedMovie.length; i++) {
      localStorage.setItem('Movie'+[i + 1], JSON.stringify(savedMovie[i]));
    }

    this.localStorageforMovies = []
    for (let i = 0; i < savedMovie.length; i++) {
      this.localStorageforMovies.push(
        JSON.parse(localStorage.getItem('Movie' + (i + 1)) || '{}')
      );
    }

    
    console.log(this.localStorageforMovies);
  }
}
