<template>
  <div>
    <b-card id="card-margin">
      <h2>User informations</h2>
      <b-row>
        <b-col cols="6">
          <b-form-select v-model="selectedUserID" :options="options" @change="onChange($event)"></b-form-select>
        </b-col>
        <b-col cols="4">
          <b-button
            @click="showModal"
            ref="btnShow"
            v-b-modal.modal-prevent-closing
            :disabled="apiError"
            variant="outline-primary"
          >
            <i class="fas fa-plus"></i> Add new
          </b-button>
          <small id="error_msg" v-if="createError">{{createError}}</small>
        </b-col>
      </b-row>
      <b-row id="row-margin" v-if="selectedUserID !== null">
        <b-col cols="4">
          <b-media>
            <template v-slot:aside>
              <b-img
                class="fixed-height"
                :src="require('./../assets/placeholder.png')"
                width="64"
                alt="placeholder"
              ></b-img>
            </template>

            <h5 class="mt-0">Username : {{username}}</h5>
            <p>UserID : {{selectedUserID}}</p>
          </b-media>
        </b-col>
        <b-col id="col-margin" cols="4" class="text-left">
          <b-button
            variant="link"
            @click="showModalUpdate"
            ref="btnShow"
            v-b-modal.modal-prevent-closing
            :disabled="apiError"
          >Edit</b-button>
          <b-button v-on:click="deleteUser" :disabled="apiError" variant="link">
            <i class="fas fa-trash-alt"></i>
          </b-button>
          <small id="error_msg" v-if="updateError">{{updateError}}</small>
        </b-col>
      </b-row>
      <b-modal
        id="create_update_modal"
        ref="modal"
        title="Create a user"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form">
          <b-form-group label="Username" label-for="username-input">
            <b-form-input id="username-input" v-model="dataForm.username" required></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="email-input">
            <b-form-input id="email-input" type="email" v-model="dataForm.email" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </b-card>
    <b-row align-h="center" align-v="center" class="row-margin" v-if="selectedUserID !== null">
      <b-col class="p-3 bg-color">
        <router-link class="txt-color" :to="'/workingTimes/' + selectedUserID">All working times</router-link>
      </b-col>
      <b-col class="p-3 bg-color">
        <router-link class="txt-color" :to="'/workingTime/' + selectedUserID">Create a working time</router-link>
      </b-col>
      <b-col class="p-3 bg-color">
        <router-link
          class="txt-color"
          to="/workingTime/:userID/:workingtimeID"
        >Modify or delete working time</router-link>
      </b-col>
      <b-col class="p-3 bg-color">
        <router-link class="txt-color" :to="'/clock/' + selectedUserID">Declare hours worked</router-link>
      </b-col>
      <b-col class="p-3 bg-color">
        <router-link class="txt-color" :to="'/chartManager/' + selectedUserID">Manage the graphs</router-link>
      </b-col>
    </b-row>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'User',
  created () {
    this.getUser()
  },
  data () {
    return {
      selectedUserID: null,
      users: [],
      options: [],
      username: '',
      apiError: false,
      dataForm: {
        email: '',
        username: ''
      },
      createError: '',
      updateError: ''
    }
  },
  methods: {
    onChange (event) {
      if (!this.selectedUserID) {
        this.$router.push('/')
      }
      this.createError = ''
      if (this.users && this.users.length > 0) {
        this.users.map(user => {
          if (user.userID == this.selectedUserID) this.username = user.username
        })
      }
    },
    resetModal () {
      // Nothing
    },
    handleOk (bvModalEvt) {
      // Trigger submit handler
      if (this.updateStatus) {
        this.updateUser()
      } else {
        this.createUser()
      }
    },
    showModal () {
      this.dataForm.username = ''
      this.dataForm.email = ''

      this.createError = ''
      this.$root.$emit('bv::show::modal', 'create_update_modal', '#btnShow')
    },
    showModalUpdate () {
      if (this.users && this.users.length > 0) {
        this.users.map(user => {
          if (user.userID == this.selectedUserID) {
            this.dataForm.username = user.username
            this.dataForm.email = user.email
          }
        })
      }
      this.updateStatus = true
      this.updateError = ''
      this.$root.$emit(
        'bv::show::modal',
        'create_update_modal',
        '#btnShowUpdate'
      )
    },
    createUser () {
      console.log(this.dataForm)
      console.log(this.dataForm.email != '' && this.dataForm.username != '')
      if (this.dataForm.email != '' && this.dataForm.username != '') {
        console.log('yes ! post start')
        axios
          .post('http://localhost:4000/api/users', this.dataForm)
          .then(response => {
            console.log('create:', response)
            if (response.status == 200) {
              this.selectedUserID = null
              this.getUser()
              this.dataForm.username = ''
              this.dataForm.email = ''
            } else {
              console.log(error)
              this.createError = 'Invalid mail'
            }
          })
          .catch(error => {
            this.createError = 'Invalid mail'
          })
      } else {
        this.createError = 'Invalid form values'
      }
    },
    updateUser () {
      if (this.dataForm.email != '' && this.dataForm.username != '') {
        axios
          .put(
            'http://localhost:4000/api/users/' + this.selectedUserID,
            this.dataForm
          )
          .then(response => {
            console.log('update:', response)
            if (response.status == 200) {
              this.selectedUserID = null
              this.getUser()
              this.dataForm.username = ''
              this.dataForm.email = ''
            }
          })
          .catch(error => {
            this.updateError = 'Invalid form values'
          })
      } else {
        this.updateError = 'Invalid form values'
      }
    },
    getUser () {
      axios
        .get('http://localhost:4000/api/users/all')
        .then(response => {
          let usersOption = []

          console.log('get:', response)
          if (
            response.status == 200 &&
            response.data &&
            response.data.length > 0
          ) {
            usersOption.push({ value: null, text: 'Select user by email...' })
            response.data.map(user => {
              usersOption.push({ value: user.userID, text: user.email })
            })
            this.users = response.data
          } else {
            usersOption.push({ value: null, text: 'There are no user...' })
          }
          this.options = usersOption
          this.apiError = false
        })
        .catch(error => {
          let usersOption = []
          usersOption.push({
            value: null,
            text: 'Sorry, the api of this app is shut down...'
          })
          this.options = usersOption
          this.apiError = true
        })
      if (!this.selectedUserID) {
        this.$router.push('/')
      }
    },
    deleteUser () {
      axios
        .delete('http://localhost:4000/api/users/' + this.selectedUserID)
        .then(response => {
          console.log('delete:', response)
          if (response.status == 200) {
            this.selectedUserID = null
            this.getUser()
          }
        })
        .catch(error => {})
    }
  }
}
</script>

<style>
#card-margin {
  margin-top: 1rem;
}

#row-margin {
  margin-top: 1rem;
}

#col-margin {
  margin-top: 1rem;
}

.fixed-height {
  height: 60px;
}

#error_msg {
  margin-left: 1rem;
  color: red;
}

.bg-color {
  background-color: #007bff;
  text-align: center;
}

.txt-color {
  color: white;
}
</style>
