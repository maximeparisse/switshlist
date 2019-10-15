<template>
  <div id="app">

    <div class="filters">
      <button class="all" @click="changeStatus(null)">All</button>
      <button class="owned" @click="changeStatus('owned')">Owned</button>
      <button class="next" @click="changeStatus('next')">Next</button>
      <button class="want" @click="changeStatus('want')">Want</button>
      <button class="will" @click="changeStatus('will')">Will</button>
      <button class="impossible" @click="changeStatus('impossible')">Impossible</button>
      <button class="later" @click="changeStatus('later')">Later</button>
      <button class="soon" @click="changeStatus('soon')">Soon</button>
    </div>

    <div class="count">
      {{ owned }}/{{ total }} (owned/total)
    </div>

    <table>
      <tr>
        <th>Status</th>
        <th>Index</th>
        <th>Name</th>
        <th>Date</th>
      </tr>
      <tr v-for="(game, index) in gamesFiltered"
          v-bind:key="game.name">
        <td :class="game.status"></td>
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
      return this.$store.state.games;
    },
    gamesFiltered() {
      if (!this.status) {
        return this.$store.state.games;
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
  width: calc(100% - 60px);
}

tr {
  display: flex;
}

th:first-child,
td:first-child {
  width: 5px;
}

th:first-child,
th:nth-child(2) {
  color: white;
}

th:nth-child(2),
td:nth-child(2) {
  width: 20px;
  flex-shrink: 0;
  margin-left: 10px;
}

th:nth-child(3),
td:nth-child(3) {
  flex-grow: 1;
  margin-left: 20px;
}

th:last-child,
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
  cursor: pointer;
}

.all {
  background-color: #dadada;
}

.owned {
  background-color: #78dab1;
}

.next {
  background-color: #a594ff;
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

.later {
  background-color: #adadff;
}

.soon {
  background-color: #f3b7fb;
}

</style>
