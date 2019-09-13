import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {Channel} from '../_models/Channel';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channel: Channel;
  message: string;

  constructor(public userService: UserService,
              public router: Router,
              private socket: Socket) {
    var self = this;
    socket.on('refresh', function () {
      self.refreshChannel();
    });
  }

  ngOnInit() {
    this.refreshChannel();
  }
  
  refreshChannel() {
    console.log("Refresh!!");
    this.userService.showChannel().subscribe( (response: any) => {
      if (response && response.channel_model) {
        this.channel = response.channel_model;
      }
    });
  }

  leaveChannel() {
    this.userService.leaveChannel().subscribe( (response: any) => {
      if (response) {
        console.log("Leave_channel: ", response);
        this.userService.getMe();
      }
    });
  }

  sendMessage() {
    if (this.message) {
      this.userService.sendMessage(this.message).subscribe( (response: any) => {
        console.log("sendMessage: ", response);
        this.message = "";
        this.refreshChannel();
      });
    }
  }

}
