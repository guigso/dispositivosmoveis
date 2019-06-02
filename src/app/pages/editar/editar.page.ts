import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss']
})
export class EditarPage implements OnInit {
  editarForm: any;
  itemsRef: AngularFireList<any>;

  @Input() game;
  constructor(
    public dbFire: AngularFireDatabase,
    public fb: FormBuilder,
    public modalController: ModalController
  ) {
    this.itemsRef = dbFire.list('games');
  }

  ngOnInit() {
    this.editarForm = this.fb.group({
      nome: new FormControl(this.game.nome, Validators.required),
      plataforma: new FormControl(this.game.plataforma, Validators.required),
      dataLancamento: new FormControl(this.game.dataLancamento, Validators.required),
      preco: new FormControl(this.game.preco, Validators.required)
    });
  }

  save() {
    let resp = {
      nome: this.editarForm.controls.nome.value,
      plataforma: this.editarForm.controls.plataforma.value,
      dataLancamento: this.editarForm.controls.dataLancamento.value,
      preco: this.editarForm.controls.preco.value
    };

    this.itemsRef.update(this.game.key, resp);

    this.modalController.dismiss({ resp });
  }
}
