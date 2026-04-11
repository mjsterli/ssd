import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppBar } from './components/app-bar/app-bar';
import { SideMenu } from './components/side-menu/side-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppBar, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
