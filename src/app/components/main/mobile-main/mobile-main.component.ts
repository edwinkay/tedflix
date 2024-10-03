import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-mobile-main',
  templateUrl: './mobile-main.component.html',
  styleUrls: ['./mobile-main.component.scss'],
})
export class MobileMainComponent implements OnInit {
  @ViewChild('menu') menu: any;
  presentingElement: any = null;

  populares: any[] = [];
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
    private menuCtrl: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private tmdbService: TmdbService
  ) {}

  ngOnInit() {
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
  }

  loadPopularMovies() {
    this.tmdbService.getPopularMovies().subscribe((response) => {
      this.populares = response.results;
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
        this.populares = response.results;
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
      componentProps: { movie },
    });
    return await modal.present();
  }
}
