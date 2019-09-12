<template>
  <div>
    <b-card id="card-margin">
      <h2>Chart Manager</h2>
      <donut-chart
        id="donut"
        :data="donutData"
        colors="[ #FF6384, #36A2EB, #FFCE56 ]"
        resize="true"
      ></donut-chart>
      <br>
      <bar-chart
        id="bar"
        data='[
        { "years": "2013", "and": 10, "ios": 5, "win": 2},
        { "years": "2014", "and": 10, "ios": 15, "win": 3},
        { "years": "2015", "and": 20, "ios": 25, "win": 1}
      ]'
        xkey="year"
        ykeys='["and", "ios", "win"]'
        bar-colors='["#FF6384", "#36A2EB", "#FFCE56"]'
        grid=true
        grid-text-weight="bold"
        resize="true"
      ></bar-chart>
    </b-card>
  </div>
</template>

<script>
import Raphael from "raphael/raphael";
global.Raphael = Raphael;
import { DonutChart, BarChart, LineChart, AreaChart } from "vue-morris";
export default {
  name: "ChartManager",
  components: {
    DonutChart,
    BarChart,
    LineChart,
    AreaChart
  },
  data() {
    return {
      donutData: [
        { label: "Red", value: 300 },
        { label: "Blue", value: 50 },
        { label: "Yellow", value: 100 }
      ]
    };
  },
  methods: {}
};
</script>

<style>
#card-margin {
  margin-top: 1rem;
}
</style>
