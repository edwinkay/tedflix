import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '81a0095c1cb4c198851a851a487110e8';
  private apiReadToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWEwMDk1YzFjYjRjMTk4ODUxYTg1MWE0ODcxMTBlOCIsIm5iZiI6MTcyNzg5MDgxOC4xNjE5OSwic3ViIjoiNjZmZDgxYmNlODRlZWIzNWEwZjdhMDc5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.o8Z9lnqmbyAU1n1A_2V-hsy-h2hxbKItOPoZegdvrX0';

  constructor(private http: HttpClient) {}

  getMostPopularMovie(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http
      .get(
        `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=es-LA`,
        { headers }
      )
      .pipe(
        map((response: any) => response.results[0]) // Tomamos la primera película más popular
      );
  }

  getMovieDetails(movieId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&language=es-LA`,
      { headers }
    );
  }

  //películas populares
  getPopularMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=es-LA&region=CO`,
      { headers }
    );
  }
  //peliculas en estreno
  getPeliculasEstreno(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&language=es-LA&region=CO`,
      { headers }
    );
  }
  getProximamente(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&language=es-LA&region=CO`,
      { headers }
    );
  }
  getMejorValoradas(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&language=es-LA&region=CO`,
      { headers }
    );
  }
  getTendencia(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPorGenero(genreId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPopularAnime(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/tv?api_key=${this.apiKey}&language=es-LA&with_genres=16&region=CO`,
      { headers }
    );
  }
  getPopularComedyMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=35&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPopularSuspenseMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=53&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPopularHorrorMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=27&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPopularSeries(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/tv/popular?api_key=${this.apiKey}&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPopularRomanceMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=10749&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPopularActionMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=28&language=es-LA&region=CO`,
      { headers }
    );
  }
  getPopularColombianMovies(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=es-LA&with_origin_country=CO`,
      { headers }
    );
  }

  // Método para buscar películas por título
  searchMovies(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&api_key=${this.apiKey}`,
      { headers }
    );
  }

  // Método para buscar películas de estreno
  searchEstrenos(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&with_release_type=3|2&api_key=${this.apiKey}`,
      { headers }
    );
  }

  // Método para buscar películas mejor valoradas
  searchMejorValoradas(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&sort_by=vote_average.desc&api_key=${this.apiKey}`,
      { headers }
    );
  }

  // Método para buscar películas de tendencia
  searchTendencia(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&sort_by=popularity.desc&api_key=${this.apiKey}`,
      { headers }
    );
  }

  // Método para buscar películas de anime
  searchAnime(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&with_genres=16&api_key=${this.apiKey}`, // Género 16: Animación
      { headers }
    );
  }

  // Método para buscar películas colombianas
  searchColombianas(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&region=CO&api_key=${this.apiKey}`, // Región CO: Colombia
      { headers }
    );
  }

  // Método para buscar películas de comedia
  searchComedia(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&with_genres=35&api_key=${this.apiKey}`, // Género 35: Comedia
      { headers }
    );
  }

  // Método para buscar películas de suspenso
  searchSuspenso(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&with_genres=53&api_key=${this.apiKey}`, // Género 53: Suspenso
      { headers }
    );
  }

  // Método para buscar películas de terror
  searchTerror(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&with_genres=27&api_key=${this.apiKey}`, // Género 27: Terror
      { headers }
    );
  }

  // Método para buscar películas de romance
  searchRomance(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&with_genres=10749&api_key=${this.apiKey}`, // Género 10749: Romance
      { headers }
    );
  }

  // Método para buscar películas de acción
  searchAccion(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&with_genres=28&api_key=${this.apiKey}`, // Género 28: Acción
      { headers }
    );
  }

  // Método para buscar películas próximas a estrenarse
  searchProximamente(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });
    return this.http.get(
      `${this.apiUrl}/search/movie?query=${query}&release_date.gte=${
        new Date().toISOString().split('T')[0]
      }&api_key=${this.apiKey}`, // Películas con fecha de estreno futura
      { headers }
    );
  }
  searchSeries(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiReadToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.get(
      `${this.apiUrl}/search/tv?query=${query}&api_key=${this.apiKey}&language=es-LA&region=CO`,
      { headers }
    );
  }
}
