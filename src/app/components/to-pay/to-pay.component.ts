import { Component, ElementRef, Input, OnInit,  ViewChild } from '@angular/core';
import { Menu } from 'src/app/models/Menu';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarComponent } from 'src/app/tools/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.component.html',
  styleUrls: ['./to-pay.component.css']
})
export class ToPayComponent implements OnInit {

  @Input() menu:Menu[]=[];
  cartera!:number;
  total:number=0;




  constructor(private nav:NavbarComponent, private userService:AuthService) {
    for(let i =0;i<this.menu.length;i++){
      let a =Number(this.menu[i].price);
      console.log(a)
      this.total+=a;
    }
  }

  ngOnInit(): void {

    this.userService.getCartera().subscribe((result)=>{
      this.cartera=result;

    })
    for(let i =0;i<this.menu.length;i++){
      let a =Number(this.menu[i].price);
      console.log(a)
      this.total+=a;
    }
  }

  deleteP(id:number){
    this.menu.splice(id,1);
    console.log(this.menu);
  }

  cancel(){
    this.nav.toPay();
  }

  paid(){
    let a = localStorage.getItem('id');
    this.userService.makaPay(this.total, a!).subscribe((result)=>{
      console.log(result);
      this.nav.clearShop();
      this.cancel();
      Swal.fire(
        'Listo!',
        'Pago exitoso!',
        'success'
      )


    },
    (err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'pago insuficiente',
        showConfirmButton: false,
        timer: 1000
      })
      this.cancel();
    })
  }


}
