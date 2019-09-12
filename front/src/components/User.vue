<template>
  <div class="user-container">
    <div v-if="user && user.email && user.username" class="topnav">
      <div class="left-div">
        <div>Connecté en tant que {{user.username}}</div>
      </div>
      <div>
        <input v-model="userForm.email" placeholder="Email">
        <input v-model="userForm.username" placeholder="username">
        <button v-on:click="updateUser()">Update</button>
      </div>
      <div class="right-div">
        <button v-on:click="logout()">Log out</button>
        <button v-on:click="deleteUser()">Delete User</button>
      </div>
    </div>
    <div v-else class="topnav">
      <div class="left-div">
        <input v-model="userForm.email" placeholder="Email">
        <input v-model="userForm.username" placeholder="Username">
      </div>
      <div class="right-div">
        <button v-on:click="getUser()">Log in</button>
        <button v-on:click="createUser()">Sign up</button>
      </div>
    </div>
  </div>

</template>

<script>

  import axios from 'axios';

  export default {
    name: 'User',
    props: {
      user: {
        username: String,
        email: String,
        id: String
      }
    },
    data: function () {
      return {
        userForm: {
          email: '',
          username: ''
        },
        getUser: function () {
          if (this.userForm && this.userForm.email && this.userForm.username) {
            axios.get('http://localhost:4000/api/users' + '?email=' + this.userForm.email + '&username=' + this.userForm.username)
                    .then(response => {
                      console.log("response: ", response);
                      this.user.email = this.userForm.email;
                      this.user.username = this.userForm.username;
                      this.user.id = response.data.userID;
                    }).catch(error => {
              alert('Bad Credentials');
              console.log('error: ', error);
            });
          }
        },
        updateUser: function () {
          if (this.userForm.email && this.userForm.username) {
            axios.put('http://localhost:4000/api/users/' + this.user.id, {
              email: this.userForm.email,
              username: this.userForm.username
            }).then(response => {
              this.getUser();

            }).catch(error => {
              alert('Bad Informations');
              console.log('error: ', error);
            });
          }
        },
        createUser: function () {
          if (this.userForm.email && this.userForm.username) {
            axios.post('http://localhost:4000/api/users', {
              email: this.userForm.email,
              username: this.userForm.username
            }).then(response => {
              this.getUser();

            }).catch(error => {
              alert('Bad Informations');
              console.log('error: ', error);
            });
          }
        },
        logout: function () {
          this.resetForm();
          this.user.username = '';
          this.user.email = '';
        },
        deleteUser: function () {
          axios.delete('http://localhost:4000/api/users/' + this.user.id).then(response => {
            alert('User deleted.');
            this.logout();
          }).catch(error => {
            alert('Delete failed.');
            console.log('error: ', error);
          });
        },
        resetForm: function () {
          this.userForm.email = '';
          this.userForm.username = '';
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .user-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .topnav {
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .left-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .right-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>

