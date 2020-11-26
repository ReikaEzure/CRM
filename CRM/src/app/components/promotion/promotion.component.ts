import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Promotion } from 'src/app/models/Promotion';
import { ProjectService } from 'src/app/services/project.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  promotionForm : FormGroup;

  edit : boolean = false;

  promotions = [];

  promo : Promotion = {
    idPromotion: 0,
    description: '',
    offerAmount: 0,
    name: ''
  }

  project : Project;
  constructor(private _fb: FormBuilder, private _service: PromotionService, private _projectService: ProjectService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.promotionForm=this._fb.group({
      promotion: ['']
    });

    const params = this._activate.snapshot.params;
    if(params.id){
      this._projectService.getProject(params.id).subscribe(
        res => {
          this.project = res;
          this._projectService.project = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }

  }

  get promotion(){
    return this.promotionForm.get('promotion'); 
  }

  changePromo(e) {
    this.promotion.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changePromotion(){

  }

  onSubmit(){
    console.log(this.promotionForm.value);
    this.changePromotion();
  }

}
