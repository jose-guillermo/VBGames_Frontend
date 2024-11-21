import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { download } from 'ionicons/icons';

@Component({
  selector: 'shared-component-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [IonIcon,  IonButton ],
})
export class DownloadButtonComponent  implements OnInit {

  public showInstallButton = signal<boolean>(false);

  private deferredPrompt = signal<any>(null);

  constructor(){
    addIcons({ download });
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevenir que el navegador muestre el banner de instalación predeterminado
      event.preventDefault();
      this.deferredPrompt.set(event);
      if (this.isMobile())
        this.showInstallButton.set(true);
    });
  }

  private isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  public installApp() {
    if (this.deferredPrompt()) {
      // Muestra el cuadro de diálogo de instalación
      this.deferredPrompt().prompt();
      this.deferredPrompt().userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó la instalación de la PWA');
          this.showInstallButton.set(false);
        } else {
          console.log('El usuario rechazó la instalación de la PWA');
        }
        this.deferredPrompt.set(null) // Reinicia el objeto deferredPrompt
      });
    }
  }

}
