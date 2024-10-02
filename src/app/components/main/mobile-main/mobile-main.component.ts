import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-mobile-main',
  templateUrl: './mobile-main.component.html',
  styleUrls: ['./mobile-main.component.scss'],
})
export class MobileMainComponent implements OnInit {
  @ViewChild('menu') menu: any;
  presentingElement: any = null;
  seleccion: any;

  users: any[] = [];
  categorias: any[] = [];
  newFeatures: any[] = [];
  tendencias: any[] = [];
  filteredNewFeatures: any[] = [];
  filteredNewFeaturesm: any[] = [];
  filteredTendencias: any[] = [];
  filteredTendenciasm: any[] = [];

  selectedMovie: any;

  slideOpts: any;
  busqueda = false;

  searchTerm: string = '';
  filteredMovies: any[] = [];

  displayedPhotos: any[] = [];
  currentIndex: number = 0;

  constructor(
    private _dataPerfil: PerfilService,
    private _movies: MoviesService,
    private menuCtrl: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this._dataPerfil.seleccion$.subscribe((data) => {
      this.seleccion = data;
      this.loadMovies();
    });
  }
  scan() {
    this.busqueda = !this.busqueda;
  }

  filterMovies() {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();

      // Filtrar Nuevos lanzamientos
      this.filteredNewFeaturesm = this.newFeatures.filter((movie) =>
        movie.title.toLowerCase().includes(searchTermLower)
      );

      // Filtrar Tendencias
      this.filteredTendenciasm = this.tendencias.filter((movie) =>
        movie.title.toLowerCase().includes(searchTermLower)
      );
    } else {
      // Si no hay término de búsqueda, mostrar todas las películas
      this.filteredNewFeaturesm = [...this.newFeatures];
      this.filteredTendenciasm = [...this.tendencias];
    }
  }
  filterMovies2() {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();

      // Filtrar Nuevos lanzamientos
      this.filteredNewFeatures = this.newFeatures.filter((movie) =>
        movie.title.toLowerCase().includes(searchTermLower)
      );

      // Filtrar Tendencias
      this.filteredTendencias = this.tendencias.filter((movie) =>
        movie.title.toLowerCase().includes(searchTermLower)
      );
    } else {
      // Si no hay término de búsqueda, mostrar solo las primeras 7 películas
      this.filteredNewFeatures = this.newFeatures.slice(0, 7);
      this.filteredTendencias = this.tendencias.slice(0, 7);
    }
  }

  loadMovies() {
    this._movies.getMovies().subscribe((mov) => {
      this.categorias = mov;
      const nl = mov[0].categorias['Nuevos lanzamientos'].movies;
      this.newFeatures = nl;
      const td = mov[0].categorias['tendencias'].movies;
      this.tendencias = td;

      this.filteredNewFeatures = nl.slice(0, 7);
      this.filteredNewFeaturesm = nl;
      this.filteredTendencias = td.slice(0, 7);
      this.filteredTendenciasm = td;

      this.currentIndex = 0;
    });
  }

  nextPhoto() {
    if (this.newFeatures.length > 7) {
      this.currentIndex = (this.currentIndex + 1) % this.newFeatures.length;
      this.filteredNewFeatures = this.newFeatures.slice(
        this.currentIndex,
        this.currentIndex + 7
      );

      // Si llegamos al final de la lista, regresamos al inicio
      if (this.filteredNewFeatures.length < 7) {
        this.filteredNewFeatures = this.filteredNewFeatures.concat(
          this.newFeatures.slice(0, 7 - this.filteredNewFeatures.length)
        );
      }
    }
  }

  prevPhoto() {
    if (this.newFeatures.length > 7) {
      this.currentIndex =
        (this.currentIndex - 1 + this.newFeatures.length) %
        this.newFeatures.length;
      this.filteredNewFeatures = this.newFeatures.slice(
        this.currentIndex,
        this.currentIndex + 7
      );

      // Si llegamos al principio de la lista, volvemos al final
      if (this.filteredNewFeatures.length < 7) {
        this.filteredNewFeatures = this.newFeatures.slice(-7);
      }
    }
  }

  nextPhotoTendencias() {
    if (this.tendencias.length > 7) {
      this.currentIndex = (this.currentIndex + 1) % this.tendencias.length;
      this.filteredTendencias = this.tendencias.slice(
        this.currentIndex,
        this.currentIndex + 7
      );

      // Si llegamos al final de la lista, regresamos al inicio
      if (this.filteredTendencias.length < 7) {
        this.filteredTendencias = this.filteredTendencias.concat(
          this.tendencias.slice(0, 7 - this.filteredTendencias.length)
        );
      }
    }
  }

  prevPhotoTendencias() {
    if (this.tendencias.length > 7) {
      this.currentIndex =
        (this.currentIndex - 1 + this.tendencias.length) %
        this.tendencias.length;
      this.filteredTendencias = this.tendencias.slice(
        this.currentIndex,
        this.currentIndex + 7
      );

      // Si llegamos al principio de la lista, volvemos al final
      if (this.filteredTendencias.length < 7) {
        this.filteredTendencias = this.tendencias.slice(-7);
      }
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
