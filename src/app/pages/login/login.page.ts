import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonInput, IonIcon } from '@ionic/angular/standalone';
import { eye, lockClosed, code, logoIonic, logoAngular } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { emailPattern } from 'src/app/shared/validators/register-login.validator';
import { TranslatorService } from 'src/app/shared/services/translator.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Response } from 'src/app/shared/Interfaces/response.interface';
import { DataLocalService } from '../../shared/services/data-local.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ IonCard, IonCardTitle, IonCardHeader, IonIcon, IonCardContent, IonButton, CommonModule, ReactiveFormsModule, IonInput, TranslatePipe, RouterModule ]
})
export default class LoginPage {


  @ViewChild('.item-inner', { static: false }) dynamicElement: any = null;


  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  private translatorService = inject(TranslatorService);
  private userService = inject(UserService);
  private dataLocal = inject(DataLocalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public loginForm = signal<FormGroup>(this.fb.group({
    email: ['', [Validators.required, Validators.pattern(emailPattern)]], // Validación de correo
    password: ['', [Validators.required, Validators.minLength(6)]], // Validación de contraseña
  }));

  public passVisibility = signal<boolean>(false);
  public emailError = signal<string>(this.translate.instant("LOGIN.ERROR.EMPTY_FIELD"));
  public passError = signal<string>(this.translate.instant("LOGIN.ERROR.EMPTY_FIELD"));

  constructor() {
    addIcons({code,logoIonic,logoAngular,eye,lockClosed});
    const inputValue = this.route.snapshot.paramMap.get('create');
    console.log(inputValue); // Funciona, pero no es ideal

    effect(() => {
      if(this.translatorService.currentLang()){
        this.changeEmailError();
        this.changePassError();
      }
    }, { allowSignalWrites: true })
  }

  /**
   * Método para manejar el envío del formulario
   */
  login() {
    if (this.loginForm().valid) {
      this.userService.login(this.loginForm().get("email")?.value, this.loginForm().get("password")?.value)
        .subscribe( ( response: Response ) => {
          console.log(response);

          if( response.exito ){
            this.userService.getUser()
              .subscribe((res: Response) => {
                this.dataLocal.setValue("user", res.user).then(() => {
                  this.userService.userInit();
                  this.router.navigate(["/home"])

                })
              });
          } else {
            console.log(response);
          }
        })
    }
  }

  /**
   * Método para controlar el mensaje de error en el email
   */
  changeEmailError() {
    const emailControl = this.loginForm().get('email');

    if (emailControl?.hasError("required")){

      this.translate.get("LOGIN.ERROR.EMPTY_FIELD").subscribe( (res: string) => {
        this.emailError.set(res);
      })
    } else if (emailControl?.hasError("pattern")) {

      this.translate.get("LOGIN.ERROR.INVALID_EMAIL").subscribe( (res: string) => {
        this.emailError.set(res);
      })
    }
  }

  /**
   * Método para controlar el mensaje de error en la contraseña
   */
  changePassError() {
    const passControl = this.loginForm().get('password');
    if (passControl?.hasError("required")){
      this.passError.set(this.translate.instant("LOGIN.ERROR.EMPTY_FIELD"));
    } else if (passControl?.hasError("minlength")) {

      this.passError.set(this.translate.instant("LOGIN.ERROR.INVALID_PASSWORD"));

    }
  }

  /**
   * Método para mostrar la contraseña
   */
  tooglePassVisibility() {
    this.passVisibility.set(true);

    setTimeout( () => {
      this.passVisibility.set(false);
    }, 3000)
  }
}
