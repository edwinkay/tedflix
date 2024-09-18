import { Component } from '@angular/core';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss'],
})
export class ElegirComponent {
  images = [
    'https://i.pinimg.com/564x/3c/e6/72/3ce67241681dc17a8be9632f14728cf9.jpg',
    'https://i.pinimg.com/564x/c6/99/31/c699318ead25a55a908e0cd2f1c2a5f7.jpg',
    'https://i.pinimg.com/originals/89/51/35/89513597910ab6ce4285402ab7c0e591.jpg',
    'https://i.pinimg.com/564x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg',
  ];

  users = [
    {
      name: 'Usuario 1',
      image:
        'https://i.pinimg.com/564x/3c/e6/72/3ce67241681dc17a8be9632f14728cf9.jpg',
    },
  ];

  isEditing = false;
  editingIndex: number | null = null;
  isManaging = false;

  // Agregar un nuevo perfil
  onAddProfile() {
    if (this.users.length < 4) {
      const newIndex = this.users.length;
      const newUser = {
        name: `Usuario ${this.users.length + 1}`,
        image: this.images[newIndex % this.images.length],
      };
      this.users.push(newUser);
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


  finishEditing(index: number) {
    this.isEditing = false;
    this.editingIndex = null;
  }


  removeProfile(index: number) {
    this.users.splice(index, 1);
    if (this.editingIndex === index) {
      this.finishEditing(index);
    }
  }
}
