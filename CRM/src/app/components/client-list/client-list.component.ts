import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: any = [];

  constructor(private _service: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this._service.getClients().subscribe(
      res => {
        this.clients = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  deleteClient(id: String){
    console.log(id);
    this._service.deleteClient(id).subscribe(
      res => {
        console.log(res);
        this.getClients();
      },
      err => {console.log(err.message)}
    );
  }

}