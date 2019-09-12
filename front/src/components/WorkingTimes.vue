<template>
    <div>
        <h4>Working Times</h4>

        <div v-for="item in workingTimes" v-bind:key="item.id">
            Start: {{item.start}} End: {{item.end}}
            <router-link :to="'/workingTime/' + self.$route.params.id + '/' + item.workingTimeID">Update or delete</router-link>
        </div>

        <button v-on:click="getWorkingTimes()">Refresh</button>
        <div></div>
        <router-link :to="'/workingTime/' + this.$route.params.id">Create Working Time</router-link>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'WorkingTimes',
        data: function () {
            return {
                self: this,
                workingTimes: [],
                getWorkingTimes: function () {
                    axios.get('http://localhost:4000/api/workingtimes/' + this.$route.params.id)
                        .then(response => {
                            console.log("refresh: ", response);
                            if (response.data) {
                                this.workingTimes = response.data;
                            }

                        }).catch(error => {
                        alert('Clock is not active.');
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
