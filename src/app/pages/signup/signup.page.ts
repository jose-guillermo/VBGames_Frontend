import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonInput, IonCol, IonRow, IonAvatar, IonImg, IonChip, IonIcon } from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeCircle, closeCircleOutline, eye } from 'ionicons/icons';

import { emailPattern, passwordMatchValidator, passwordPattern } from 'src/app/shared/validators/register-login.validator';
import { TranslatorService } from 'src/app/shared/services/translator.service';
import { UserService } from 'src/app/shared/services/backend/user.service';
import { Response } from 'src/app/shared/Interfaces/response.interface';
import { MessagesService } from '../../shared/services/backend/messages.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ IonIcon, IonChip, IonImg, IonAvatar, IonRow, IonCol, IonButton, IonInput, CommonModule, FormsModule, TranslatePipe, ReactiveFormsModule]
})
export default class SignupPage {

  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  private translatorService = inject(TranslatorService);
  private userService = inject(UserService);
  private router = inject(Router);
  private messagesService = inject(MessagesService);
  private toastService = inject(ToastService);

  public registerForm = signal<FormGroup>(this.fb.group({
    nombreUsuario: ['', [Validators.required, Validators.minLength(6)]], // Validación de correo
    email: ['', [Validators.required, Validators.pattern(emailPattern)]], // Validación de correo
    password: ['', [Validators.required, Validators.pattern(passwordPattern), Validators.minLength(6)]], // Validación de contraseña
    confirmPassword: ['', [Validators.required]], // Validación de contraseña
  }, { validators: passwordMatchValidator }));

  public passVisibility = signal<boolean>(false);

  public userNameError = signal<string>(this.translate.instant("REGISTER.ERRORS.REQUIRED"));
  public emailError = signal<string>(this.translate.instant("REGISTER.ERRORS.REQUIRED"));
  public passError = signal<string>(this.translate.instant("REGISTER.ERRORS.REQUIRED"));
  public confirmPassError = signal<string>(this.translate.instant("REGISTER.ERRORS.REQUIRED"));

  public profileImageUrl = signal<string>("");
  public profileImage = signal<File|null>(null);

  constructor() {
    addIcons({eye,closeCircle,closeCircleOutline});

    // Asegurarme de que si cambio el idioma tambien lo haga en los mensajes de error
    effect(() => {
      if(this.translatorService.currentLang()){
        this.changeUserNameError();
        this.changeEmailError();
        this.changePassError();
        this.changeConfirmPassError();
      }
    }, { allowSignalWrites: true })
  }

  signUp(){
    this.toastService.presentToast(this.translate.instant("REGISTER.TOAST"), "top", "success");
    this.router.navigate(['/login']);

    if (this.registerForm().valid){
      this.userService.createUser(this.registerForm().get("nombreUsuario")!.value, this.registerForm().get("email")!.value, this.registerForm().get("password")!.value)
        .subscribe( ( response: Response ) => {
          console.log(response);
          if(response.exito){
            this.toastService.presentToast(this.translate.instant("REGISTER.TOAST"), "bottom", "success");

            this.messagesService.sendMessage(response.userId!, this.translate.instant("WELCOMING_MESSAGE.TITLE"), this.translate.instant("WELCOMING_MESSAGE.TITLE"), "SYSTEM_NOTIFICATION");
            this.router.navigate(['/login'])
          }
        });
    }
  }

  /**
   * Método que permite seleccionar la imágen de perfíl
   */
  async openFilePicker(){
    const result = await FilePicker.pickImages({
      limit: 1,
      readData: true
    });

    if ( result.files.length > 0 ) {
      const file = result.files[0];
      this.profileImageUrl.set("data:image/;base64," + file.data!);
      this.profileImage.set(new File([file.blob!], file.name, { type: file.mimeType}));
    }
  }

  /**
   * Método para controlar el mensaje de error en el nombre de usuario
   */
  changeUserNameError() {
    const userNameControl = this.registerForm().get('nombreUsuario');
    if (userNameControl?.hasError("required")){
      this.translate.get("REGISTER.ERRORS.REQUIRED").subscribe( (res: string) => {
        this.userNameError.set(res);
      })
    } else if (userNameControl?.hasError("minlength")) {
      this.translate.get("REGISTER.ERRORS.USERNAME_MIN_LENGTH").subscribe( (res: string) => {
        this.userNameError.set(res);
      })
    }
  }

  /**
   * Método para controlar el mensaje de error en el email
   */
  changeEmailError() {
    const emailControl = this.registerForm().get('email');
    if (emailControl?.hasError("required")){
      this.translate.get("REGISTER.ERRORS.REQUIRED").subscribe( (res: string) => {
        this.emailError.set(res);
      })
    } else if (emailControl?.hasError("pattern")) {
      this.translate.get("REGISTER.ERRORS.INVALID_EMAIL").subscribe( (res: string) => {
        this.emailError.set(res);
      })
    }
  }

  /**
   * Método para controlar el mensaje de error en la contraseña
   */
  changePassError() {
    const passControl = this.registerForm().get('password');
    if (passControl?.hasError("required")){
      this.passError.set(this.translate.instant("REGISTER.ERRORS.REQUIRED"));
    } else if (passControl?.hasError("minlength")) {
      this.passError.set(this.translate.instant("REGISTER.ERRORS.PASSWORD_MIN_LENGTH"));
    } else if (passControl?.hasError("pattern")) {
      this.passError.set(this.translate.instant("REGISTER.ERRORS.INVALID_PASSWORD"));
    }
  }

  /**
   * Método para controlar el mensaje de error en confirmar contraseña
   */
  changeConfirmPassError() {
    const passControl = this.registerForm().get('confirmPassword');
    if (passControl?.hasError("required")){
      this.confirmPassError.set(this.translate.instant("REGISTER.ERRORS.REQUIRED"));
    } else if (passControl?.hasError("passwordMismatch")) {
      this.confirmPassError.set(this.translate.instant("REGISTER.ERRORS.PASSWORD_MISMATCH"));
    }
  }


  /**
   * Permite eliminar la imagen ya seleccionada
   */
  delImage() {
    this.profileImage.set(null);
    this.profileImageUrl.set("");
  }


  /**
   * Método para mostrar la contraseña
   */
  tooglePassVisibility() {
    this.passVisibility.set(true);

    setTimeout( () => {
      this.passVisibility.set(false);
    }, 5000)
  }

}
