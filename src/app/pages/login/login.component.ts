import { Component } from '@angular/core';
import { RealtimeClientService } from '../../core/services/realtime-service/realtime-client.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  connectionEstablished: boolean = false;
  qrCode: any;

  constructor(private realtimeService: RealtimeClientService) {}

  ngOnInit() {
    this.establishConnection();
  }

  establishConnection() {
    this.realtimeService.startConnection().subscribe({
      next: (m:any) => {
        if (m) {
          this.connectionEstablished = true;
          setTimeout(() => {
            this.qrCode = this.realtimeService.QrStarted();
          }, 1000);

        }
        console.log("🚀 ~ LoginComponent ~ this.realtimeService.startConnection ~ m:", m)
        
      },
      error: (error:any) => {
        console.error('Error establishing SignalR connection:', error);
      }
    });
  }

  getQR() {
    this.qrCode = this.realtimeService.QrStarted();
  }
}