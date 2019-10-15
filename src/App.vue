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

    <div class="count">
      {{ owned }}/{{ total }} (owned/total)
    </div>

    <table>
      <tr>
        <th>Index</th>
        <th>Name</th>
        <th>Date</th>
      </tr>
      <tr v-for="(game, index) in games"
          v-bind:key="game.name"
          :class="game.status">
        <td>{{ index + 1 }}</td>
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
    total() {
      return this.$store.state.games.length;
    },
    owned() {
      return this.$store.state.games.filter(f => f.status === 'owned').length;
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

.count {
  font-weight: 700;
  text-align: right;
}

table {
  margin-top: 20px;
  text-align: left;
}

tr {
  display: flex;
}

td:first-child {
  width: 20px;
  flex-shrink: 0;
}

td:nth-child(2) {
  flex-grow: 1;
  margin-left: 20px;
}

td:last-child {
  flex-shrink: 0;
  width: 85px;
  margin-left: 20px;
}

.filters {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 50%;
  right: 0;
  border: 1px solid black;
  border-right: 0;
  transform: translateY(-50%);
}

.filters button {
  width: 40px; 
  height: 40px;
  border: 0;
  margin: 0;
  padding: 10px;
  appearance: none;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  line-height: 1em;
  padding: 10px;
  background-color: white;
  cursor: pointer;
}

.filters button + button {
  border-top: 1px solid black;
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
