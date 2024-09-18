import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  // Opciones para el carrusel de películas
  slideOpts = {
    slidesPerView: 3.5, // Número de películas visibles a la vez
    spaceBetween: 10, // Espacio entre slides
    freeMode: true,
  };

  // Ejemplo de categorías y películas
  categories = [
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

  constructor() {}

  ngOnInit() {}

  // Función para manejar búsqueda
  onSearch() {
    // Aquí puedes añadir la lógica para realizar una búsqueda
    console.log('Search clicked');
  }
}
