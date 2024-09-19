import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss'],
})
export class ElegirComponent implements OnInit {


  images = [
    'https://i.pinimg.com/564x/3c/e6/72/3ce67241681dc17a8be9632f14728cf9.jpg',
    'https://i.pinimg.com/564x/c6/99/31/c699318ead25a55a908e0cd2f1c2a5f7.jpg',
    'https://i.pinimg.com/originals/89/51/35/89513597910ab6ce4285402ab7c0e591.jpg',
    'https://i.pinimg.com/564x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg',
  ];

  categoriesx = [
    {
      name: 'Tendencias',
      movies: [
        {
          title: 'Película 1',
          image:
            'https://firebasestorage.googleapis.com/v0/b/tedflix-3dc61.appspot.com/o/movies%2F1.png?alt=media&token=0aeb22a2-87ad-4f13-8638-e834d9e410dc',
        },
        {
          title: 'Película 2',
          image:
            'https://firebasestorage.googleapis.com/v0/b/tedflix-3dc61.appspot.com/o/movies%2F2.png?alt=media&token=f5eb7b71-c94a-487c-901c-888fc8173286',
        },
        {
          title: 'Película 3',
          image:
            'https://firebasestorage.googleapis.com/v0/b/tedflix-3dc61.appspot.com/o/movies%2F3.png?alt=media&token=13917858-396d-4be4-b3e5-a2073c16d1b1',
        },
        {
          title: 'Película 4',
          image:
            'https://firebasestorage.googleapis.com/v0/b/tedflix-3dc61.appspot.com/o/movies%2F4.png?alt=media&token=219947e8-2bb2-4d25-baff-4e531eb42e0a',
        },
      ],
    },
    {
      name: 'Nuevos lanzamientos',
      movies: [
        {
          title: 'Película 5',
          image:
            'https://firebasestorage.googleapis.com/v0/b/tedflix-3dc61.appspot.com/o/movies%2F5.png?alt=media&token=f5bb2e66-dc4a-4920-b445-814b393a76ee',
        },
        {
          title: 'Película 6',
          image:
            'https://firebasestorage.googleapis.com/v0/b/tedflix-3dc61.appspot.com/o/movies%2F6.png?alt=media&token=3779bb8b-100c-46d9-8279-5a26fff03601',
        },
        {
          title: 'Película 7',
          image:
            'https://firebasestorage.googleapis.com/v0/b/tedflix-3dc61.appspot.com/o/movies%2F7.png?alt=media&token=55dc46e5-641a-4ebc-9c7a-3e66b72a98da',
        },
      ],
    },
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
  private userVerified = false;

  ocultar = true;
  slideOpts: any;

  constructor(
    private afAuth: AngularFireAuth,
    private _user: UsersService,
    private _movies: MoviesService
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
      console.log(mov);
    });
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
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

  hide() {
    this.ocultar = false;
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
}
