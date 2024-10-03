import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { PerfilService } from 'src/app/services/perfil.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-desktop-main',
  templateUrl: './desktop-main.component.html',
  styleUrls: ['./desktop-main.component.scss'],
})
export class DesktopMainComponent implements OnInit {
  @ViewChild('menu') menu: any;

  presentingElement: any = null;
  seleccion2: any;
  storage2: any;

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

  busqueda = false;

  constructor(
    private _dataPerfil: PerfilService,
    private menuCtrl: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private tmdbService: TmdbService
  ) {}

  ngOnInit() {
    const storedData = localStorage.getItem('seleccion2');
    if (storedData) {
      this.storage2 = JSON.parse(storedData);
    }
    this._dataPerfil.seleccion$.subscribe((data) => {
      this.seleccion2 = data;
      localStorage.setItem('seleccion2', JSON.stringify(data));
    });



    this.loadPopularMovies();
    this.loadMostPopularMovieDetails();
    this.loadEstreno();
    this.loadValoradas();
    this.loadTendencia();
    this.loadAnime();
    this.loadColombia();
    this.loadComedia();
    this.loadSuspenso();
    this.loadTerror();
    this.loadRomance();
    this.loadAccion();
    this.loadProximo();
  }
  loadMostPopularMovieDetails() {
    this.tmdbService.getMostPopularMovie().subscribe(
      (popularMovie) => {
        const movieId = popularMovie.id;
        this.tmdbService.getMovieDetails(movieId).subscribe((movieDetails) => {
          this.selectedMovie = movieDetails;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadPopularMovies() {
    this.tmdbService.getPopularMovies().subscribe((response) => {
      this.popular = response.results;
    });
  }
  loadEstreno() {
    this.tmdbService.getPeliculasEstreno().subscribe((response) => {
      this.estreno = response.results;
    });
  }
  loadValoradas() {
    this.tmdbService.getMejorValoradas().subscribe((response) => {
      this.mejorValoradas = response.results;
    });
  }
  loadTendencia() {
    this.tmdbService.getTendencia().subscribe((response) => {
      this.tendencia = response.results;
    });
  }
  loadAnime() {
    this.tmdbService.getPopularAnime().subscribe((response) => {
      this.popularAnime = response.results;
    });
  }
  loadColombia() {
    this.tmdbService.getPopularColombianMovies().subscribe((response) => {
      this.colombianas = response.results;
    });
  }
  loadComedia() {
    this.tmdbService.getPopularComedyMovies().subscribe((response) => {
      this.comedia = response.results;
    });
  }
  loadSuspenso() {
    this.tmdbService.getPopularSuspenseMovies().subscribe((response) => {
      this.suspenso = response.results;
    });
  }
  loadTerror() {
    this.tmdbService.getPopularHorrorMovies().subscribe((response) => {
      this.terror = response.results;
    });
  }
  loadRomance() {
    this.tmdbService.getPopularRomanceMovies().subscribe((response) => {
      this.romance = response.results;
    });
  }
  loadAccion() {
    this.tmdbService.getPopularActionMovies().subscribe((response) => {
      this.accion = response.results;
    });
  }
  loadProximo() {
    this.tmdbService.getProximamente().subscribe((response) => {
      this.proximamente = response.results;
    });
  }

  searchMovies(query: any) {
    if (!query || query.trim() === '') {
      this.loadPopularMovies();
      this.loadEstreno();
      this.loadValoradas();
      this.loadTendencia();
      this.loadAnime();
      this.loadColombia();
      this.loadComedia();
      this.loadSuspenso();
      this.loadTerror();
      this.loadRomance();
      this.loadAccion();
      this.loadProximo();
    } else {
      this.tmdbService.searchMovies(query).subscribe((response) => {
        this.popular = response.results;
      });

      this.tmdbService.searchEstrenos(query).subscribe((response) => {
        this.estreno = response.results;
      });

      this.tmdbService.searchMejorValoradas(query).subscribe((response) => {
        this.mejorValoradas = response.results;
      });

      this.tmdbService.searchTendencia(query).subscribe((response) => {
        this.tendencia = response.results;
      });

      this.tmdbService.searchAnime(query).subscribe((response) => {
        this.popularAnime = response.results;
      });

      this.tmdbService.searchColombianas(query).subscribe((response) => {
        this.colombianas = response.results;
      });

      this.tmdbService.searchComedia(query).subscribe((response) => {
        this.comedia = response.results;
      });

      this.tmdbService.searchSuspenso(query).subscribe((response) => {
        this.suspenso = response.results;
      });

      this.tmdbService.searchTerror(query).subscribe((response) => {
        this.terror = response.results;
      });

      this.tmdbService.searchRomance(query).subscribe((response) => {
        this.romance = response.results;
      });

      this.tmdbService.searchAccion(query).subscribe((response) => {
        this.accion = response.results;
      });

      this.tmdbService.searchProximamente(query).subscribe((response) => {
        this.proximamente = response.results;
      });
    }
  }

  scan() {
    this.busqueda = !this.busqueda;
  }
  scrollLeft(scroll: any) {
    scroll.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight(scroll: any) {
    const scrollAmount = 250;

    scroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    if (scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth) {
      setTimeout(() => {
        scroll.scrollTo({ left: 0, behavior: 'smooth' });
      }, 300);
    }
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
