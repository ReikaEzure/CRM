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
  
  promotions : any;

  promo : Promotion = {
    idPromotion: 0,
    description: '',
    offerAmount: 0,
    name: ''
  }

  project : Project;
  constructor(private _fb: FormBuilder, private _service: PromotionService, private _projectService: ProjectService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    //get list of promotion that users company has
    this.getPromotions();

    this.promotionForm=this._fb.group({
      promotion: ['']
    });

    // load project deatil
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

  //load promotions list
  getPromotions(){
    this._service.getPromotions().subscribe(
      res => {
        this.promotions=res;
      },
      error => console.log(error)
    );
  }

  changePromo(e) {
    this.promotion.setValue(e.target.value, {
      onlySelf: true
    })
  }

  //change promotion that applied in certain project
  changePromotion(){
    const data={
      promoId: this.promotion.value,
      id: this.project.idProject
    }
    this._projectService.modifyPromotion(data.id, data).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/project/']);
      },
      err => {console.log(err);}
    );
  }


  onSubmit(){
    this.changePromotion();
  }

}
