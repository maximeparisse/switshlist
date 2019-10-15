<template>
  <div id="app">

    <button @click="changeStatus(null)">All</button>
    <button @click="changeStatus('owned')">Owned</button>
    <button @click="changeStatus('want')">Want</button>
    <button @click="changeStatus('will')">Will</button>
    <button @click="changeStatus('impossible')">Impossible</button>
    <button @click="changeStatus('later')">Later</button>

    <table>
      <tr>
        <th>Name</th>
        <th>Date</th>
      </tr>
      <tr v-for="game in games"
          v-bind:key="game.name"
          :class="game.status">
        <td>{{ game.name }}</td>
        <td>{{ game.date }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      status: null,
    };
  },
  computed: {
    games() {
      if (!this.status) {
        return this.$store.state.games;
      } else if (this.status == 'later') {
        return this.$store.state.games.filter(f => f.status === null);
      } else {
        return this.$store.state.games.filter(f => f.status === this.status);
      }
    },
  },
  methods: {
    changeStatus(status) {
      this.status = status;
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

table {
  text-align: left;
}

.owned {
  background-color: #78dab1;
}

.want {
  background-color: #f9ae6e;
}

.will {
  background-color: #fff2ab;
}

.impossible {
  background-color: #f58a8a;
}

</style>
