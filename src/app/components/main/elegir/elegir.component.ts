import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss'],
})
export class ElegirComponent implements OnInit {
  @ViewChild('menu') menu: any;
  images = [
    'https://i.pinimg.com/564x/3c/e6/72/3ce67241681dc17a8be9632f14728cf9.jpg',
    'https://i.pinimg.com/564x/c6/99/31/c699318ead25a55a908e0cd2f1c2a5f7.jpg',
    'https://i.pinimg.com/originals/89/51/35/89513597910ab6ce4285402ab7c0e591.jpg',
    'https://i.pinimg.com/564x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg',
  ];

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

  seleccion: any;

  private currentIndexes: { [key: string]: number } = {};
  private visibleCount: { [key: string]: number } = {};
  private loadIncrement = 8;

  constructor(
    private afAuth: AngularFireAuth,
    private _user: UsersService,
    private _movies: MoviesService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.loadUsers();
        this.loadMovies();
      }
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
    const movies = category.categorias[key].movies;
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

  loadUsers() {
    this._user.getUsers().subscribe((users) => {
      this.users = users;
      this.comprobar = users.some((uso: any) => {
        return uso.idUser === this.uid;
      });
      this.verificar();
    });
  }

  hide(obj: any) {
    this.seleccion = obj;
    this.ocultar = false;
  }
  changeProfile() {
    this.ocultar = true;
  }

  async cerrar() {
    await this.menu.close(); // Cerrar el menú
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  verificar() {
    if (!this.comprobar && !this.userVerified) {
      this.userVerified = true;
      this.createUser();
    }
  }

  createUser() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        const dato = [
          {
            name: user.displayName,
            image: this.images[this.users.length % this.images.length],
          },
        ];

        const data = {
          idUser: user.uid,
          perfil: dato,
        };

        this._user
          .addUserInfo(data)
          .then(() => {
            console.log('Usuario creado');
          })
          .catch((error) => {
            console.error('Error al crear usuario:', error);
          });
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }
  getProfileCount(): number {
    return this.users.reduce((count, user) => count + user.perfil.length, 0);
  }

  onAddProfile() {
    const currentUser = this.users.find((user) => user.idUser === this.uid);

    if (currentUser && currentUser.perfil.length < 4) {
      const newIndex = currentUser.perfil.length;

      const newProfile = {
        name: `Usuario ${newIndex + 1}`,
        image: this.images[newIndex % this.images.length],
      };

      currentUser.perfil.push(newProfile);

      this._user
        .updateUser(currentUser, currentUser.id)
        .then(() => {})
        .catch((error) => {
          console.error('Error al agregar el perfil:', error);
        });
    }
  }

  toggleManaging() {
    if (this.isManaging && this.isEditing) {
      this.finishEditing(this.editingIndex!);
    }
    this.isManaging = !this.isManaging;
  }

  startEditing(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
  }

  finishEditing(profileIndex: number) {
    this.isEditing = false;
    this.editingIndex = null;

    const user = this.users.find((user) =>
      user.perfil.some((_: any, index: number) => index === profileIndex)
    );
    if (user) {
      const profile = user.perfil[profileIndex];
      this._user
        .updateUser(user, user.id)
        .then(() => {
          console.log('Perfil actualizado');
        })
        .catch((error) => {
          console.error('Error al actualizar el perfil:', error);
        });
    }
  }

  removeProfile(profileIndex: number, userIndex: number) {
    // No se puede eliminar el perfil principal
    if (profileIndex === 0) {
      return;
    }

    const user = this.users[userIndex];
    user.perfil.splice(profileIndex, 1);

    this._user
      .updateUser(user, user.id)
      .then(() => {
        console.log('Perfil eliminado');
      })
      .catch((error) => {
        console.error('Error al eliminar el perfil:', error);
      });
  }

  openMenu() {
    this.menuCtrl.open('end');
  }
}
