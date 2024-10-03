import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { PerfilService } from 'src/app/services/perfil.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('menu') menu: any;
  presentingElement: any = null;
  seleccion: any;
  storage: any

  isLoading = true;
  selectedMovie: any;
  popular: any[] = [];
  estreno: any[] = [];
  proximamente: any[] = [];
  mejorValoradas: any[] = [];
  tendencia: any[] = [];
  genero: any[] = [];
  popularAnime: any[] = [];
  comedia: any[] = [];
  suspenso: any[] = [];
  terror: any[] = [];
  series: any[] = [];
  romance: any[] = [];
  accion: any[] = [];
  colombianas: any[] = [];

  constructor(
    private _dataPerfil: PerfilService,
    private menuCtrl: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private tmdbService: TmdbService
  ) {}

  ngOnInit() {
    const storedData = localStorage.getItem('seleccion');
    if (storedData) {
      this.storage = JSON.parse(storedData);
    }
    this._dataPerfil.seleccion$.subscribe((data) => {
      this.seleccion = data;
      localStorage.setItem('seleccion', JSON.stringify(data));
    });
    this.loadAllData();
  }

  loadAllData() {
    Promise.all([
      this.loadMostPopularMovieDetails(),
      this.loadPopularMovies(),
      this.loadEstreno(),
      this.loadValoradas(),
      this.loadTendencia(),
      this.loadAnime(),
      this.loadColombia(),
      this.loadComedia(),
      this.loadSuspenso(),
      this.loadTerror(),
      this.loadRomance(),
      this.loadAccion(),
      this.loadProximo(),
    ]).then(() => {
      this.isLoading = false;
    });
  }
  loadMostPopularMovieDetails(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getMostPopularMovie().subscribe(
        (popularMovie) => {
          const movieId = popularMovie.id;
          this.tmdbService.getMovieDetails(movieId).subscribe(
            (movieDetails) => {
              this.selectedMovie = movieDetails;
              resolve();
            },
            (error) => {
              console.error('Error loading movie details', error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error('Error loading most popular movie', error);
          reject(error);
        }
      );
    });
  }

  loadPopularMovies(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularMovies().subscribe(
        (response) => {
          this.popular = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading popular movies', error);
          reject(error);
        }
      );
    });
  }

  loadEstreno(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPeliculasEstreno().subscribe(
        (response) => {
          this.estreno = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading estreno movies', error);
          reject(error);
        }
      );
    });
  }

  loadValoradas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getMejorValoradas().subscribe(
        (response) => {
          this.mejorValoradas = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading best rated movies', error);
          reject(error);
        }
      );
    });
  }

  loadTendencia(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getTendencia().subscribe(
        (response) => {
          this.tendencia = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading trending movies', error);
          reject(error);
        }
      );
    });
  }

  loadAnime(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularAnime().subscribe(
        (response) => {
          this.popularAnime = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading popular anime', error);
          reject(error);
        }
      );
    });
  }

  loadColombia(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularColombianMovies().subscribe(
        (response) => {
          this.colombianas = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading Colombian movies', error);
          reject(error);
        }
      );
    });
  }

  loadComedia(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularComedyMovies().subscribe(
        (response) => {
          this.comedia = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading comedy movies', error);
          reject(error);
        }
      );
    });
  }

  loadSuspenso(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularSuspenseMovies().subscribe(
        (response) => {
          this.suspenso = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading suspense movies', error);
          reject(error);
        }
      );
    });
  }

  loadTerror(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularHorrorMovies().subscribe(
        (response) => {
          this.terror = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading horror movies', error);
          reject(error);
        }
      );
    });
  }

  loadRomance(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularRomanceMovies().subscribe(
        (response) => {
          this.romance = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading romance movies', error);
          reject(error);
        }
      );
    });
  }

  loadAccion(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getPopularActionMovies().subscribe(
        (response) => {
          this.accion = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading action movies', error);
          reject(error);
        }
      );
    });
  }

  loadProximo(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tmdbService.getProximamente().subscribe(
        (response) => {
          this.proximamente = response.results;
          resolve();
        },
        (error) => {
          console.error('Error loading upcoming movies', error);
          reject(error);
        }
      );
    });
  }

  async cerrarSesion() {
    await this.menu?.close();
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  changeProfile() {
    this.router.navigate(['/perfil']);
  }
  openMenu() {
    this.menuCtrl.open('end');
  }
  async openMovieSynopsis(movie: any) {
    const modal = await this.modalCtrl.create({
      component: MovieSynopsisComponent,
      componentProps: {
        movie: movie,
      },
    });
    return await modal.present();
  }
}
