import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  cadastroForm: any;
  items: Observable<any[]>;
  urlImage: string;
  nativePath: string;
  fileName: string;

  constructor(
    public fb: FormBuilder,
    public dbFire: AngularFireDatabase,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private fileChooser: FileChooser) {

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
      urlImage: this.urlImage,
    }
    const itemsRef = this.dbFire.list('games/');
    itemsRef.push(attrs);
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      const pictures = storage().ref("fotos")
      pictures.putString(base64Image, 'data_url').then((r) => {
        this.urlImage = r.downloadURL
      });
    }, (err) => {
      console.log("falha de envio " + err)
    });
  }

  enviarArquivo() {
    this.fileChooser.open().then((fileUri) => {
      this.filePath.resolveNativePath(fileUri).then((result) => {
        this.nativePath = result;
        this.file.resolveLocalFilesystemUrl(this.nativePath).then((res) => {

          let dirPath = res.nativeURL;
          let dirPathSeguiment = dirPath.split('/');
          dirPathSeguiment.pop();
          dirPath = dirPathSeguiment.join('/');
          this.fileName = res.name
          this.file.readAsArrayBuffer(dirPath, this.fileName).then((buffer) => {
            let blob = new Blob([buffer], { type: "image/jpeg" });

            const pictures = storage().ref("fotos/" + name)
            pictures.put(blob).then((r) => {
              this.urlImage = r.downloadURL
            });
          })
        })
      })
    })
  }
}
