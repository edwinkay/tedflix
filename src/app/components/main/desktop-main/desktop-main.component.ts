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

  titulo: any = 'Genero';

  view: string = 'all';

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
  generos: any[] = [];

  genres = [
    { id: 28, name: 'Acción' },
    { id: 35, name: 'Comedia' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Terror' },
    { id: 16, name: 'Animación' },
    { id: 10749, name: 'Romance' },
    { id: 80, name: 'Crimen' },
    { id: 99, name: 'Documental' },
    { id: 14, name: 'Fantasía' },
    { id: 36, name: 'Historia' },
    { id: 10402, name: 'Música' },
    { id: 9648, name: 'Misterio' },
    { id: 10751, name: 'Familia' },
    { id: 878, name: 'Ciencia Ficción' },
    { id: 10770, name: 'Película de TV' },
    { id: 53, name: 'Suspenso' },
    { id: 37, name: 'Western' },
    { id: 12, name: 'Aventura' },
    { id: 10752, name: 'Bélica' },
    { id: 10762, name: 'Niños' },
    { id: 10763, name: 'Noticias' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Fantasía y Ciencia Ficción' },
    { id: 10766, name: 'Telenovela' },
    { id: 10767, name: 'Talk Show' },
    { id: 10768, name: 'Guerra y Política' },
  ];

  busqueda = false;
  ver = false;
  hid = true

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
  showSeries() {
    this.hid = false
    this.ver = false;
    this.view = 'series';
  }

  showMovies() {
    this.hid = false;
    this.ver = false;
    this.view = 'movies';
  }
  showTendencia() {
    this.hid = false;
    this.ver = false;
    this.view = 'tendencia';
  }

  showAll() {
    this.hid = true;
    this.ver = false;
    this.view = 'all';
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
  filterByGenre(event: any) {
    const id = event.detail.value;
    const name = this.genres.find((name) => name.id === id);
    if (name) {
      this.ver = true;
      this.hid = false;
      this.titulo = name.name;
    }
    this.tmdbService.getPorGenero(id).subscribe((response) => {
      this.generos = response.results;
    });
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
      this.hid = true;
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
      this.hid = false;
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
