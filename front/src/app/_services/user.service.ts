import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Channel} from '../_models/Channel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, public router: Router) {
    const user: User = JSON.parse(localStorage.getItem('current_user'));

    if (user && user.name) {
      this.user = user;
    }
    this.getMe();
  }

  public user: User;

  getMe() {
    if (this.user && this.user._id) {
      return this.http.get(environment.apiUrl + '/getMe/' + this.user._id).subscribe((response: any) => {
        if (response && response.user_model) {
          console.log("getMe: ", response);
          this.setUser(response.user_model);

          if (this.user.channel) {
            this.router.navigate(['/channel']);
          } else {
            this.router.navigate(['/channels']);
          }
        }
      },
        error => {
        this.logout();
        });
    } else {
      this.logout();
    }
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('current_user', JSON.stringify(user));
  }
  
  register(username: string) {
    return this.http.post(environment.apiUrl + '/register', {
      name: username
    });
  }
  
  getChannels() {
    return this.http.get(environment.apiUrl + '/channels');
  }

  createChannel(name: string) {
    return this.http.post(environment.apiUrl + '/channels', {name});
  }

  editChannel(name: string, id: string) {
    return this.http.put(environment.apiUrl + '/channels/' + id, {name});
  }

  deleteChannel(id: string) {
    return this.http.delete(environment.apiUrl + '/channels/' + id);
  }

  showChannel() {
    return this.http.get(environment.apiUrl + '/channels/' + this.user.channel);
  }

  enterChannel(channel: Channel) {
    return this.http.post(environment.apiUrl + '/channels/' + channel._id + '/enter_channel', {
      userId: this.user._id
    });
  }

  leaveChannel() {
    return this.http.post(environment.apiUrl + '/leave_channel', {
      userId: this.user._id
    });
  }

  sendMessage(message: string) {
    return this.http.post(environment.apiUrl + '/channels/' + this.user.channel + '/send_message', {
      userId: this.user._id,
      message: message
    });
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }
}
