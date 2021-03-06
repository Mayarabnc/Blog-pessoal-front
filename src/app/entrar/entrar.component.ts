import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UserLogin = new UserLogin();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0);
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UserLogin)=>{
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token;
      environment.foto = this.usuarioLogin.foto;
      environment.nome = this.usuarioLogin.nome;
      environment.id = this.usuarioLogin.id;
    
      this.router.navigate(["/inicio"])

    },erro=>{
      if(erro.status == 500 || erro.status == 401){
        alert("Opa! usuário e/ou senha está errado")
      }
    })
  }

}

  /* mostrar os dados da variavel no console
      // console.log(environment.toke)
      // console.log(environment.foto)
      // console.log(environment.nome)
      // console.log(environment.id)
      */