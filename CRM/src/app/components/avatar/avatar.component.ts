import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  avatar: FormGroup;

  // showing title of each png image and place where its stored
  skins = [{ id: 'Pale', value: 'assets/img/avatar/clara.png' }, 
            { id: 'Medium', value: 'assets/img/avatar/media.png' }, 
            {id: 'Dark', value: 'assets/img/avatar/oscura.png'}];

  pelos = [{ id: 'Straight', value: 'liso.png' },
            { id: 'Curly', value: 'rizado.png' },
            { id: 'Short', value: 'corto.png' },
            { id: 'Afro', value: 'afro.png' },
            { id: 'Mohican', value: 'mohican.png' }];

  accesarios = [{ id: 'Earrings', value: 'assets/img/avatar/pendientes.png', checked: false },
              { id: 'Glasses', value: 'assets/img/avatar/gafas.png', checked: false },
              { id: 'SunGlasses', value: 'assets/img/avatar/gafasSol.png', checked: false },
              { id: 'EyePatch', value: 'assets/img/avatar/eyepatch.png', checked: false },
              { id: 'Moustache', value: 'bigote.png', checked: false },
              { id: 'Beard', value: 'barba.png', checked: false }];

  checked = false;
  submitted = false;
  @Input() ava: any;
  accessory: any;
  pelo: string;
  @Output() accionEnviar: EventEmitter<any> = new EventEmitter();
  @Output() accionCancelar: EventEmitter<any> = new EventEmitter();

  user: User = {
    avatar: '',
    idUser: this._service.loggedInUser.idUser
  }
  constructor(private formBuilder: FormBuilder, private _service: UserService) { 

  }

  ngOnInit(): void {
    this.avatar=this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      skin: [this.skins],
      accessory: [this.accesarios],
      hair: [this.pelos],
    });
    this.accessory=[];
    if(this.ava!=undefined){
      console.log("A", this.ava);
      this.avatar.patchValue({
        nombre: ''+this.ava.nombre
      });
    }
  }

  selectOption(id: string) {
    console.log(id);
  }

  //make sure that beard and moustache is same colour as hair
  checkedOption(ac) {
    ac.checked = !ac.checked;
    if(ac.checked){
      if(ac.id=="Bigote" || ac.id=="Barba"){
        console.log(this.pelo+ac.value);
        this.accessory.push(this.pelo+ac.value);
      }else{
        this.accessory.push(ac.value);
      }
    }
  }

  //get hair colour
  checkedColor(color:string){
    this.pelo = "assets/img/avatar/"+color+"/";
  }

  get formulario(){
    return this.avatar.controls;
  }

  get nombre(){
    return this.avatar.get("nombre");
  }

  //get all image that has been checked and send to father component
  onSubmit(){
    this.submitted=true;
    if(this.avatar.invalid){
      return false;
    }
    alert('Your avatar has been changed');

    let av = this.avatar.value;
    let aPadre = [];
    let imgStr ='';
    aPadre.push(av.skin);
    imgStr+=av.skin;

    if(this.pelo){
      if(av.hair!=='undefined' || av.hair!=''){
        console.log(this.pelo);
        this.pelo += av.hair;
        aPadre.push(this.pelo);
        imgStr+=','+this.pelo;
      }
    }

    for(var i=0;i<this.accessory.length;i++){
      console.log(this.accessory[i]);
      aPadre.push(this.accessory[i]);
      imgStr+=','+this.accessory[i];
    }

    this.user.avatar=imgStr;
    console.log(this.user.avatar);
    this._service.changeAvatar(this.user.idUser, this.user).subscribe(
      res=>{
        console.log(res);
        this._service.loggedInUser.avatar=this.user.avatar;
      },
      error=>console.log(error)
    );
    
    this.accionEnviar.emit(aPadre);
    this.accessory=[];
    this.pelo="";
    this.onReset();
    
  }

  //reset form
  onReset(){
    this.submitted=false;
    this.avatar.reset();
    this.accionCancelar.emit();
  }


}
