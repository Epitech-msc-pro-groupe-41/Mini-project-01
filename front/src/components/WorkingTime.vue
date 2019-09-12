<template>
  <b-card id="">
    <b-row>
      <b-col cols="10">
        <h2 id="user-title">Managec working times</h2>
      </b-col>
      <b-col cols="2" class="text-right">
        <b-button variant="outline-primary">
          <i class="fas fa-plus"></i> Add new
        </b-button>
      </b-col>
    </b-row>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </b-card>
</template>

<script>
export default {
  name: 'WorkingTime',
  data () {
    return {
      fields: ['userID', 'last_name'],
      items: [
        {
          isActive: true,
          userID: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald'
        },
        { isActive: false, userID: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, userID: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, userID: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  },
  methods: {
    createWorkingTime () {},
    updateWorkingTime () {},
    deleteWorkingTime () {}
  }
}
</script>

<style>
#card-margin {
  margin-top: 1rem;
}
</style>
