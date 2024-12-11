import { inject, Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, onChildChanged  } from "firebase/database";

import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

// Inicializar Firebase
const app = initializeApp(environment.firebaseConfig);
const database = getDatabase(app);

@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  private toast = inject(ToastService);

  writeData(path: string, data: any) {
    const dbRef = ref(database, path);
    set(dbRef, data)
      .then(() => {
        console.log("Datos guardados correctamente.");
      })
      .catch((error) => {
        console.error("Error al guardar los datos: ", error);
      });
  }

  loadData(path: string) {
    const dbRef = ref(database, path);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());  // Muestra los datos en la consola
        } else {
          console.log("No hay datos disponibles.");
        }
      })
      .catch((error) => {
        console.error("Error al leer los datos: ", error);
      });
  }

  listenForChanges(path: string) {
    const dbRef = ref(database, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos actualizados:", data);
    });
  }

  listenUsersConected() {
    const usersRef = ref(database, 'users');
    onChildChanged(usersRef, (snapshot) => {
      // this.toast.presentToast(`The user ${ snapshot.val().name } is online`, "top", "success")
      const changedData = snapshot.val(); // Obtienes solo los datos que han cambiado
      console.log('Dato que ha cambiado:', changedData);
    });
  }


  userConnected() {
    const userPresenceRef = ref(database, 'users/' +  + '/presence');

  }

}
