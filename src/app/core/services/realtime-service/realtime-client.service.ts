// realtime-client.service.ts
import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Observable, Subject } from 'rxjs';
import { BaseService } from '../master/base.service';

@Injectable({ providedIn: 'root' })
export class RealtimeClientService {
  private pendingFoodUpdatedSubject = new Subject<any[]>();
  ordersUpdated$: Observable<any[]> = this.pendingFoodUpdatedSubject.asObservable();

  constructor(private connectionService: ConnectionService, private base: BaseService) {}

  public startConnection(): Observable<boolean> {
    return this.connectionService.startConnection('http://192.168.0.10:12996/hubs/LoginHub'); // Replace with your endpoint
  }

  public QrStarted() {
    return this.connectionService.QRQR();
  }

  // public addTransferChartDataListener = () => {
  //   // ... (remains the same)
  // }
  // getQRcode() {
  //   return this.connectionService.QR()
  // }
}