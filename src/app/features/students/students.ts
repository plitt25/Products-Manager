import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students {
estudiantes = [
    {
      nombre: 'Jesús David Plitt',
      carrera: 'Ingeniería de Sistemas',
      descripcion: 'Desarrollador Frontend',
      imagen: 'https://i.pravatar.cc/200?img=3'
    },
    {
      nombre: 'Duvan Stiven Paez Tapias',
      carrera: 'Ingeniería de Sistemas',
      descripcion: 'Desarrollador Backend y DB',
      imagen: 'https://i.pravatar.cc/200?img=54'
    },
    {
      nombre: 'Yenifer Lorena Navas Gonzales',
      carrera: 'Ingeniería de Sistemas',
      descripcion: 'Desarrollador Frontend y Documentaciòn',
      imagen: 'https://i.pravatar.cc/200?img=5'
    }
  ];
}
