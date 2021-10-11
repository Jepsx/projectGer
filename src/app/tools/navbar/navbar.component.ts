import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Menu } from '../../models/Menu';
import { MenuService } from 'src/app/services/menu/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;
  paid:boolean=false;


  menus:Menu[]=[];



  private authListenerSub!: Subscription;

  constructor(public authService: AuthService, private router: Router, private menuService:MenuService) {
    this.isAuth = this.authService.getisAuthenticated();
    this.router.navigate(['/home']);
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });
  }

  ngOnInit(): void {
    this.isAuth = this.authService.getisAuthenticated();
    this.router.navigate(['/home']);
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    this.menuService.products$.subscribe((product=>{

      let res=false;
      for( let i = 0; i < this.menus.length; i++){
        let proc=this.menus[i];
        if (proc.id==product.id){
          res = true;
        }
      }
      if(!res){
        this.menus.push(product);
        Swal.fire(
          'Agregado!',
          'Producto agregado exitosamente!',
          'success'
        )

      }else{
        console.log(this.menus)
        Swal.fire(
          'Error!',
          'Producto ya estaba agregado!',
          'error'
        )
      }
    }))
  }

  isAdmin() {
    if (!localStorage.getItem('role')) {
      return false;
    }else {
      if(localStorage.getItem("role")==="1"){
        return true;
      } else {
        return false
      }
    }

  }

  toPay(){
    this.paid = !this.paid;
  }

  clearShop(){
    this.menus =[];
  }

}
