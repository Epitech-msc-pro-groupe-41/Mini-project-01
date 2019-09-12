<template>
    <div id="app">
        <User id="user-component" :user="user"/>
        <div id="main-view">
            <div v-if="user && user.username && user.email && user.id">
                <div class="left-nav">
                    <router-link class="link-view" :to="'/chartManager/' + user.id">Chart Manager</router-link>
                    <router-link class="link-view" :to="'/workingTimes/' + user.id">Working Times</router-link>
                    <router-link class="link-view" :to="'/clock/' + user.id">Clock Manager</router-link>
                </div>
                <router-view class="view"></router-view>
            </div>
            <div v-else>
                <h4> Veuillez vous connectez pour accéder aux différentes fonctionnalités !</h4>
            </div>
        </div>
    </div>
</template>

<script>

    import User from "./components/User";

    export default {
        name: 'app',
        components: {
            User
        },
        data: function () {
            return {
                user: {
                    username: '',
                    email: '',
                    id: ''
                },
                currentView: 0,
                Views: {
                    CHARTMANAGER: 0,
                    WORKINGTIMES: 1,
                    WORKINGTIME: 2,
                    CLOCKMANAGER: 3,
                    SIZE: 4
                },

                changeView: function (view) {
                    if (view >= 0 && view < 4) {
                        this.currentView = view;
                    }
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #user-component {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #2c3e50;
        color: white;
    }

    #main-view {
        text-align: center;
        margin-top: 70px;
        color: #2c3e50;
    }

    .left-nav {
        position: absolute;
        left: 0;
        top: 60px;
        width: 200px;
        height: calc(100% - 60px);
        background-color: grey;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .link-view {
        margin: 10px 0;
    }

    .view {
        width: auto;
        margin-left: 200px;
    }
</style>
