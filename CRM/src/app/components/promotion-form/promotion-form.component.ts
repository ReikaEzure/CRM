import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from 'src/app/models/Promotion';
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
  constructor(private _fb: FormBuilder, private _service: PromotionService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.promotionForm=this._fb.group({
      name: ['', [Validators.required]],
      offerAmount: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

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

  }

  onSubmit(){

  }

}
