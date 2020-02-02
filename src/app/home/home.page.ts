import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private ruta: Router) { }

  ngOnInit() {
  }

  Login(){
      this.ruta.navigateByUrl("login")
  }

  Create_Account(){
    this.ruta.navigateByUrl("register")

  }

}
