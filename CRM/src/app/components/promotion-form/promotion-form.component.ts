import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Promotion } from 'src/app/models/Promotion';
import { ProjectService } from 'src/app/services/project.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
})
export class PromotionFormComponent implements OnInit {
  promotionForm : FormGroup;

  edit : boolean = false;

  promo : Promotion = {
    idPromotion: 0,
    description: '',
    offerAmount: 0,
    name: ''
  }

  project: Project;

  constructor(private _fb: FormBuilder, private _service: PromotionService, private _projectService: ProjectService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.promotionForm=this._fb.group({
      name: ['', [Validators.required]],
      offerAmount: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getPromotion(params.id).subscribe(
        res => {
          this.promo = res;
          this._service.promotion = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }

    this.project=this._projectService.project;
  }

  get name(){
    return this.promotionForm.get('name');
  }

  get offerAmount(){
    return this.promotionForm.get('offerAmount');
  }

  get description(){
    return this.promotionForm.get('description');
  }

  updatePromotion(){
    console.log('im in updatePromo');
    this.promo.name=this.name.value;
    this.promo.offerAmount=this.offerAmount.value;
    this.promo.description=this.description.value;
    console.log(this.promo);

    this._service.updatePromotion(this.promo.idPromotion, this.promo).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/promotion/'+this.project.idProject]);
      },
      err => {console.log(err);}
    );
  }

  saveNewPromotion(){
    console.log('im in saveNewPromo');
    delete this.promo.idPromotion;
    this.promo.name=this.name.value;
    this.promo.offerAmount=this.offerAmount.value;
    this.promo.description=this.description.value;
    console.log(this.promo);

    this._service.savePromotion(this.promo).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/promotion/'+this.project.idProject]);
      },
      err => {console.log(err);}
    );

  }

  onSubmit(){
    console.log(this.promotionForm.value);
    this.saveNewPromotion();
  }

}
