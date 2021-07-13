import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticarService } from "../services/autenticar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    cedula: "",
    clave: "",
  };

  constructor(
    private router: Router,
    private autenticarService: AutenticarService
  ) { }

  ngOnInit() { }

  iniciarSesion(cc, passwd, tipo) {
    if (cc.value !== "" && passwd.value !== "" && tipo.value !== '') {
      // this.user.cedula = cc.value;
      // this.user.clave = passwd.value;

      // this.autenticarService.signin(this.user).subscribe(
      //   (res) => {
      //     sessionStorage.setItem("token", res.token);
      //   //  this.router.navigate(["/inicio"]);
      //   },
      //   (err) => console.log(err.error)
      // );

      // return false;

      switch (tipo.value) {
        case 'coordinador':
          this.router.navigate(["/coordinador"]);
          break;
        case 'acudiente':
          this.router.navigate(["/acudiente"]);
          break;
        case 'profesor':
          this.router.navigate(["/profesor"]);
          break;
        default:
          break;
      }
    } else {
      alert("Campos Vacios");
      passwd.value = "";
      return false;
    }
  }
}
