import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {}
