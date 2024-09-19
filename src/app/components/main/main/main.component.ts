import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('menu') menu: any;
  presentingElement: any = null;
  seleccion: any;

  users: any[] = [];
  categorias: any[] = [];
  isEditing = false;
  editingIndex: number | null = null;
  isManaging = false;
  id: any;
  uid: any;
  idUser: any;
  comprobar = false;

  selectedMovie: any;
  private userVerified = false;

  ocultar = true;
  slideOpts: any;
  busqueda = false;

  searchTerm: string = '';
  filteredMovies: any[] = [];

  private currentIndexes: { [key: string]: number } = {};
  private visibleCount: { [key: string]: number } = {};
  private loadIncrement = 8;

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
      console.log('Datos recibidos del padre:', this.seleccion);
      this.loadMovies();
    });
  }
  scan() {
    this.busqueda = !this.busqueda;
  }
  searchMovies(event: any) {
    const searchTerm = event.detail.value.toLowerCase();
    this.filteredMovies = this.categorias.map((category: any) => {
      return {
        ...category,
        categorias: Object.keys(category.categorias).reduce(
          (acc: any, key: string) => {
            acc[key] = {
              ...category.categorias[key],
              movies: category.categorias[key].movies.filter((movie: any) =>
                movie.title.toLowerCase().includes(searchTerm)
              ),
            };
            return acc;
          },
          {}
        ),
      };
    });
  }

  loadMovies() {
    this._movies.getMovies().subscribe((mov) => {
      this.categorias = mov;
    });
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  getTransform(category: any, key: string): string {
    const currentIndex = this.currentIndexes[`${category.id}-${key}`] || 0;
    return `translateX(-${currentIndex * 100}%)`;
  }

  prevSlide(category: any, key: string) {
    const indexKey = `${category.id}-${key}`;
    const visibleMovies = this.getVisibleMovies(category, key);
    this.currentIndexes[indexKey] =
      this.currentIndexes[indexKey] > 0
        ? this.currentIndexes[indexKey] - 1
        : visibleMovies.length - 1;
  }

  nextSlide(category: any, key: string) {
    const indexKey = `${category.id}-${key}`;
    const visibleMovies = this.getVisibleMovies(category, key);
    if (this.currentIndexes[indexKey] < visibleMovies.length - 1) {
      this.currentIndexes[indexKey] = (this.currentIndexes[indexKey] || 0) + 1;
    } else {
      // Cargar más películas si estamos en la última película visible
      this.loadMore(category, key);
      this.currentIndexes[indexKey] = 0; // Resetear al primer índice después de cargar más
    }
  }

  getVisibleMovies(category: any, key: string): any[] {
    const movies = this.filteredMovies.length
      ? this.filteredMovies.find((cat) => cat.id === category.id)?.categorias[
          key
        ]?.movies || []
      : category.categorias[key].movies;
    const count = this.visibleCount[`${category.id}-${key}`] || 8; // Mostrar inicialmente
    return movies.slice(0, count);
  }

  loadMore(category: any, key: string) {
    const indexKey = `${category.id}-${key}`;
    const currentCount = this.visibleCount[indexKey] || 4;
    if (currentCount < category.categorias[key].movies.length) {
      this.visibleCount[indexKey] = Math.min(
        currentCount + this.loadIncrement,
        category.categorias[key].movies.length
      );
    }
  }
  async cerrar() {
    await this.menu.close(); // Cerrar el menú
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

