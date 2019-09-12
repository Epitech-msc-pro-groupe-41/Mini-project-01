<template>
    <div>
        <h4>Chart Manager</h4>
        <select v-model="chart" id="myselect" aria-label="">
            <option value="0">BarChart</option>
            <option value="1">LineChart</option>
            <option value="2">AreaChart</option>
        </select>
        <div v-if="graph && graph.length > 0">
            <div v-if="chart == 0">
                <bar-chart id="bar" :data="graph" xkey="date" ykeys='[ "hours"]'
                           bar-colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]' grid="true" grid-text-weight="bold"
                           resize="true">
                </bar-chart>
            </div>
            <div v-else-if="chart == 1">
                <line-chart id="line" :data="graph" xkey="date" ykeys='[ "hours"]'
                            bar-colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]' grid="true" grid-text-weight="bold" resize="true">
                </line-chart>        </div>
            <div v-else-if="chart == 2">
                <area-chart id="area" :data="graph" xkey="date" ykeys='[ "hours"]'
                            bar-colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]' grid="true" grid-text-weight="bold" resize="true">
                </area-chart>
            </div>
        </div>
        <button v-on:click="refresh()">Refresh</button>
    </div>
</template>

<script>
    import axios from 'axios';

    import Raphael from 'raphael/raphael'

    global.Raphael = Raphael;

    import {BarChart, LineChart, AreaChart} from 'vue-morris'

    export default {
        name: 'ChartManager',
        data: function () {
            return {
                chart: 0,
                graph: [],
                refresh: function () {
                    axios.get('http://localhost:4000/api/chartManager/' + this.$route.params.id)
                        .then(response => {
                            if (response && response.data && response.data.charData) {
                                this.graph = response.data.charData;
                            }
                            console.log("refresh: ", response);
                        }).catch(error => {
                        alert("Chart don't respond.");
                        console.log('error: ', error);
                    });
                }
            }
        },
        components: {
            BarChart, LineChart, AreaChart
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
