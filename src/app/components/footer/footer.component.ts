import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  sub(){
    Swal.fire({
title: 'Correo enviado',
text: 'Revisa tu bandeja de entrada',
icon: 'success',
timer: 2000

    })

  }
  
  

}
