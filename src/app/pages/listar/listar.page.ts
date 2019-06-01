import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  items: Observable<any[]>;
  gameList: Array<any> = [];

  constructor(public dbFire: AngularFireDatabase, ) {
    this.items = dbFire.list('games').valueChanges()
  }

  ngOnInit() {
    this.items.subscribe(items => (this.gameList = items))
  }

}
