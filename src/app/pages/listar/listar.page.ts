import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { EditarPage } from '../editar/editar.page';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  items: Observable<any[]>;
  gameList: Array<any> = [];

  constructor(public dbFire: AngularFireDatabase, public toastController: ToastController, public modalController: ModalController) {
    this.items = dbFire.list('games').valueChanges()

  }

  ngOnInit() {
    this.items.subscribe(items => (this.gameList = items))
  }

  removeItem(game, index) {
    console.log(game, index);
  }

  async openEdit(game, index) {
    console.log(game);
    var itemRef = this.dbFire.list('/games', ref => ref.equalTo(game.nome))
    console.log(itemRef);
    const modal = await this.modalController.create({
      component: EditarPage,
      componentProps: {
        game: game
      }
    });

    modal.onDidDismiss()
      .then(resp => {
        if (resp && resp.data && resp.data.resp) {
          this.toastMsg('Jogo salvo com sucesso')
          this.gameList.splice(index, 1, resp.data.resp);
          this.gameList = [...this.gameList];

        }
      })

    return await modal.present();
  }

  async toastMsg(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      duration: 4000,
      color: 'primary',
      closeButtonText: 'OK'
    });
    toast.present();
  }
}
