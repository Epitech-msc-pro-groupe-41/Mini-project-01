import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Channel} from '../_models/Channel';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

export interface Data {
  name: string;
}

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  constructor(public userService: UserService,
              public dialog: MatDialog,
              public router: Router,
  ) {
  }

  channels: Channel[] = [];

  ngOnInit() {
    this.refreshChannels();
  }

  refreshChannels() {
    this.userService.getChannels().subscribe((response: any) => {
      if (response && response.channels) {
        console.log('getChannels: ', response);
        this.channels = response.channels;
      }
    });
  }

  enterChannel(channel: Channel) {
    if (channel) {
      this.userService.enterChannel(channel).subscribe((response: any) => {
        console.log("enterChannel: ", response);
        this.userService.getMe();
      });
    }
  }
  
  createChannel() {
    const dialogRef = this.dialog.open(ChannelEditDialog);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.userService.createChannel(response).subscribe( (response) => {
          console.log('createChannel: ', response);
          this.refreshChannels();
        });
      }
    });
  }

  editChannel(channel: Channel) {

    const dialogRef = this.dialog.open(ChannelEditDialog, {
      data: {name: channel.name}
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.userService.editChannel(response, channel._id).subscribe( (response) => {
          console.log('editChannel: ', response);
          this.refreshChannels();
        });
      }
    });
  }

  deleteChannel(channel: Channel) {

    this.userService.deleteChannel(channel._id).subscribe( (response: any) => {
      if (response) {
        console.log('deleteChannel: ', response);
        this.refreshChannels();
      }
    });
  }

}

@Component({
  selector: 'channel-edit-dialog',
  templateUrl: 'channel-edit.dialog.html',
})
export class ChannelEditDialog {

  public name: string;

  constructor(
    public dialogRef: MatDialogRef<ChannelEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {
    if (data) {
      this.name = data.name;
    }
  }


  onSubmit() {
    if (this.name) {
      this.dialogRef.close(this.name);
    }
  }

}
