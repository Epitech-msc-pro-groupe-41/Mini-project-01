<template>
  <div>
    <h4>Working Time</h4>
    <div v-if="this.$route.params.userid && !this.$route.params.workingtimeid">
      <h5>New Working Time</h5>
      <div style="display: flex; flex-direction: row; justify-content: center">
        <input v-model="newForm.start" placeholder="Start Time">
        <input v-model="newForm.end" placeholder="End Time">
        <button v-on:click="createWorkingTime()">Create</button>
      </div>
    </div>
    <div v-else-if="this.$route.params.userid && this.$route.params.workingtimeid">
      <h5>Update Working Time</h5>
      <div style="display: flex; flex-direction: row; justify-content: center">
        <input v-model="updateForm.start" placeholder="Start Time">
        <input v-model="updateForm.end" placeholder="End Time">
        <button v-on:click="updateWorkingTime()">Update</button>
      </div>
      <button style="margin-top: 20px; width: 200px" v-on:click="deleteWorkingTime()">Delete</button>
    </div>
    <div v-else>
      <h4>Bad User Id</h4>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'WorkingTime',
    data: function () {
      return {
        newForm: {
          start: '',
          end: ''
        },
        updateForm: {
          id: '',
          start: '',
          end: ''
        },
        deleteForm: {
          id: ''
        },
        createWorkingTime: function () {
          axios.post('http://localhost:4000/api/workingtimes/' + this.$route.params.userid,
                  { start: this.newForm.start, end: this.newForm.end}
          )
                  .then(response => {
                    console.log("refresh: ", response);
                    alert('Working Time Created.');
                  }).catch(error => {
            alert('Workgin time not created.');
            console.log('error: ', error);
          });
        },
        updateWorkingTime: function () {
          axios.put('http://localhost:4000/api/workingtimes/' + this.$route.params.workingtimeid,
                  { start: this.updateForm.start, end: this.updateForm.end, userID: this.$route.params.userid}
          )
                  .then(response => {
                    console.log("refresh: ", response);
                    alert('Working Time updated.');
                  }).catch(error => {
            alert('Working time not updated.');
            console.log('error: ', error);
          });
        },
        deleteWorkingTime: function () {
          axios.delete('http://localhost:4000/api/workingtimes/' + this.$route.params.workingtimeid)
                  .then(response => {
                    console.log("refresh: ", response);
                    alert('Working Time deleted.');
                  }).catch(error => {
            alert('Working time not deleted.');
            console.log('error: ', error);
          });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

