<template>
    <div>
        <h4>Clock Manager</h4>

        <p>Clock Value: {{clockValue}}</p>
        <p>Clock in: {{clockIn}}</p>
        <button v-on:click="refresh()">Refresh</button>
        <div></div>
        <button style="margin-top: 10px" v-on:click="clock()">Clock</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ClockManager',
        data: function () {
            return {
              clockValue: 0,
                clockIn: false,
                refresh: function () {
                    axios.get('http://localhost:4000/api/clocks/' + this.$route.params.id)
                        .then(response => {
                            console.log("refresh: ", response);
                          if (response && response.data) {
                            this.clockValue = response.data.time;
                            this.clockIn = response.data.status
                          }
                        }).catch(error => {
                        alert('Clock is not active.');
                        console.log('error: ', error);
                    });
                },
                clock: function () {
                  axios.post('http://localhost:4000/api/clocks/' + this.$route.params.id, {
                    status: !this.clockIn
                  })
                          .then(response => {
                            console.log("refresh: ", response);
                            if (response && response.data) {
                              this.clockIn = response.data.status
                            }
                          }).catch(error => {
                    alert('Bad Request');
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
