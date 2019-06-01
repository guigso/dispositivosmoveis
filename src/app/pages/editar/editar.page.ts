import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  editarForm: any;
  @Input() game
  constructor(public fb: FormBuilder, public modalController: ModalController) { }

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
      preco: this.editarForm.controls.preco.value,
    };
    
    this.modalController.dismiss({ resp: resp });
  }
}
