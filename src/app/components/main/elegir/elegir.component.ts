import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';
import { PerfilService } from 'src/app/services/perfil.service';

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
  busqueda = false;

  searchTerm: string = '';
  filteredMovies: any[] = [];

  seleccion: any;



  constructor(
    private afAuth: AngularFireAuth,
    private _user: UsersService,
    private router: Router,
    private _dataPerfil: PerfilService
  ) {}

  ngOnInit(): void {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.loadUsers();

      }
    });
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

  main(obj: any) {
    this.seleccion = obj;
    this._dataPerfil.setSeleccion(obj)
    this.router.navigate(['/browse']);

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
