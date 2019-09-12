<template>
  <div>
    <h4>Chart Manager</h4>
    <donut-chart
            id="donut"
            :data="graph"
            colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
            resize="true">
    </donut-chart>
  </div>
</template>

<script>

  import { DonutChart } from 'vue-morris'

  export default {
  name: 'ChartManager',
  data: function () {
    return {
      graph: [
        { label: '10/09/2019', value: '8'},
        { label: '11/09/2019', value: '7'},
        { label: '12/09/2019', value: '6'},
      ]
    }
  },
  components: {
    DonutChart
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
