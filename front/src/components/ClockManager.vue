<template>
  <div>
    <b-card id="card-margin">
      <b-row>
        <b-col cols="10">
          <h2 id="user-title">Clock Manager</h2>
        </b-col>
        <b-col cols="2" class="text-right">
          <b-button variant="outline-primary">
            <i class="fas fa-plus"></i> Refresh
          </b-button>
        </b-col>
      </b-row>

      <b-row v-if="startDateTime !== null">
        <b-col class="text-center" cols="12">
          <h3>Work started since {{startDateTime}}</h3>
          <b-button variant="outline-primary">Click here to inactive</b-button>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col class="text-center" cols="12">
          <h3>No work is in progress</h3>
          <b-button variant="outline-primary">Click here to active</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ClockManager',
  data () {
    return {
      startDateTime: null,
      clockIn: false
    }
  },
  methods: {
    refresh () {},
    clock () {}
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

#error_msg {
  margin-left: 1rem;
  color: red;
}
</style>
