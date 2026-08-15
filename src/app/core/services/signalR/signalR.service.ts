import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, timer } from 'rxjs';
import { environment } from '@Environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  options = {
    transport: signalR.HttpTransportType.ServerSentEvents,
    logging: signalR.LogLevel.Trace,
  };
  public flagTraking = new Subject<number>();

  private hubConnection: signalR.HubConnection =
    new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}${environment.signalRUrl}`, this.options)
      .build();

  //Observables for components
  messageReceived = new Subject<string>();
  private isConnected = false;
  private count = 1;
  constructor() {
    this.reciveTestFInish();
  }

  scheduleReconnect = () => {
    setTimeout(() => {
      console.info('Reconnecting signalrR...');
      this.startConnection();
      
    }, 5000);
  };

  startSignalR = () => {
    //Receiving info from server side
    this.hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.next(data);
    });

    this.hubConnection.onclose((error) => {
      this.isConnected = false;
      console.error('Connection closed with SignalR: ' + error);
      this.scheduleReconnect();
    });

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
        this.isConnected = true;
        this.count++;
      })
      .catch((err) => {
        this.isConnected = false;
        console.error('Error while establishing connection');
        if (!err?.toString().includes('undefined')) {
          this.scheduleReconnect();
        }
      });
  };

  startConnection = () => {
    if (this.isConnected == true) return;

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
        this.isConnected = true;
        this.count++;
        this.reciveTestFInish();
      })
      .catch((err) => {
        this.isConnected = false;
        console.error('Error while establishing connection');
        if (!err?.toString().includes('undefined')) {
          this.scheduleReconnect();
        }
      });
  };
  reciveTestFInish=()=>{
    this.hubConnection.on('FinishTest',(flag:number)=>{
      this.flagTraking.next(flag);
    });
  }

  stopConnection = () => {
    this.hubConnection?.stop();
  };

  //Sending info to server side
  sendMessage = (id: string) => {
    this.hubConnection
      .invoke('SendMessage', `Signalr R works, ${id} `)
      .catch((err) => console.error(err));
  };
}
