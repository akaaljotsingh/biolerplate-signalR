// connection-service.ts
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  private hubConnection: HubConnection | undefined;
  private pendingFoodUpdatedSubject = new Subject<any[]>();
ordersUpdated$: Observable<any[]> = this.pendingFoodUpdatedSubject.asObservable();

public QrCode:any = null;

  public startConnection(url: string): Observable<boolean> {
    return new Observable((observer) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(url)
        .build();

      this.hubConnection.start()
        .then(() => {
          console.log('SignalR connection started');
          observer.next(true);
          observer.complete();
        })
        .catch((err) => {
          console.error('Error while starting SignalR connection:', err);
          observer.error(err);
        });
        this.hubConnection.on('ReceiveQrCode', (orders: any[]) => {
          this.QrCode = orders;
        });
    });
  }

  public QRQR() {
    return this.QrCode;
  }

  // public QR() {
  //   this.hubConnection?.on('ReceiveQrCode', (orders: any[]) => {
  //     return orders;
  //     // this.pendingFoodUpdatedSubject.next(orders);
  //   });
  // }
}


// connection.on("ReceiveQrCode", function (base64Image) {
//   // Display the QR code image on the UI
//   var imgElement = document.getElementById("qrCodeImage");
//   var imgloader = document.getElementById("imageloader");
//   imgloader.style.display = 'none';
//   console.log(base64Image);

//   imgElement.src = base64Image;
// });