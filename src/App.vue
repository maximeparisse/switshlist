<template>
  <div id="app">

    <div class="filters">
      <button @click="changeStatus(null)">All</button>
      <button @click="changeStatus('owned')">Owned</button>
      <button @click="changeStatus('want')">Want</button>
      <button @click="changeStatus('will')">Will</button>
      <button @click="changeStatus('impossible')">Impossible</button>
      <button @click="changeStatus('later')">Later</button>
    </div>

    <table>
      <tr>
        <th>Name</th>
        <th>Date</th>
      </tr>
      <tr v-for="game in games"
          v-bind:key="game.name"
          :class="game.status">
        <td>{{ game.name }}</td>
        <td>{{ game.date | moment('YYYY-MM-DD') }}</td>
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
  margin-top: 20px;
  margin-bottom: 60px;
}

table {
  text-align: left;
}

tr {
  display: flex;
}

td:first-child {
  flex-grow: 1;
}

td:last-child {
  flex-shrink: 0;
  width: 85px;
  margin-left: 20px;
}

.filters {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  border-top: 1px solid black;
}

.filters button {
  width: calc(100% / 6);
  border: 0;
  margin: 0;
  padding: 10px;
  appearance: none;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  line-height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.filters button + button {
  border-left: 1px solid black;
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
