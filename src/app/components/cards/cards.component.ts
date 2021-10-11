import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map} from 'rxjs/operators'
import { Menu } from 'src/app/models/Menu';
import {  Subject, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private menuSub!:Subscription;
  menuUpdated = new Subject<Menu[]>();
  prodAgUpdated = new Subject<Menu[]>();
  menu:Menu[]=[];
  prodAg:Menu[];

  constructor(public menuService: MenuService,public router:Router ) {
    this.showMenu();
    this.prodAg=[];
  }

  ngOnInit(): void {
    this.showMenu();
  }


  showMenu(){

    this.menuService.getAllMenus().pipe(map((res)=>{


  return res.map((menu:{_id:string, titulo:string, price: string, description: string, URL:string})=>{

  return {
    id:menu._id,
    titulo:menu.titulo,
    price:menu.price,
    description:menu.description,
    URL:menu.URL
  }
  })
    })).subscribe((dataT)=>{
      this.menu= dataT;
      this.menuUpdated.next([...this.menu]);
    })

  }


  getMenuUpdateListener(){
  return this.menuUpdated.asObservable();
    }

  getprodAgUpdateListener():Observable<Menu[]>{
    return this.prodAgUpdated.asObservable();
  }


add(id:string){

  Swal.fire({
    title: '¿Estás seguro?',
    text: "Añadiremos este producto",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, añadir producto',
    cancelButtonText: 'Cancelar'
  }).then((result) => {

    if (result.isConfirmed) {

      let a = this.getProduct(id);
      let b = new Menu(a?.id,a?.titulo,a?.price,a?.description,a?.URL);
      this.menuService.products$.emit(b);

    }
  })
}


getProduct(id:string){
  let res;
  for( let i = 0; i < this.menu.length; i++){
    let proc=this.menu[i];
    if (proc.id==id){
      res = proc;
    }
  }
  return res;
}
}
