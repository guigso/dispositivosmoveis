import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  cadastroForm: any;
  items: Observable<any[]>;

  constructor(
    public fb: FormBuilder,
    public dbFire: AngularFireDatabase, ) {
    this.items = dbFire.list('games').valueChanges();
  }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: new FormControl('', Validators.required),
      plataforma: new FormControl('', Validators.required),
      dataLancamento: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required)
    });
  }

  save() {
    var attrs = {
      nome: this.cadastroForm.controls.nome.value,
      plataforma: this.cadastroForm.controls.plataforma.value,
      dataLancamento: this.cadastroForm.controls.dataLancamento.value,
      preco: this.cadastroForm.controls.preco.value,
    }
    const itemsRef = this.dbFire.list('games/');
    itemsRef.push(attrs);
  }

}
