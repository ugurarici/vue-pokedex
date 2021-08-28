<template>
  <div id="app">
    <div class="grid">
      <div>
        <h1>Vue Pokedex</h1>
        <div v-if="list.results && list.results.length > 0">
          <div
            v-if="list.previous"
            class="pokedex-list-item"
            @click="fetchList(list.previous)"
            style="justify-content: center"
          >
            Previous Page
          </div>

          <router-link
            :to="'/detail/' + pokemon.name"
            v-for="pokemon in listResultsWithImage"
            :key="pokemon.name"
            class="pokedex-list-item"
          >
            <img
              :src="pokemon.image"
              :alt="pokemon.name"
              height="50"
              width="50"
              align="left"
            />
            {{ pokemon.name }}
          </router-link>

          <div
            v-if="list.next"
            class="pokedex-list-item"
            @click="fetchList(list.next)"
            style="justify-content: center"
          >
            Next Page
          </div>
        </div>
      </div>
      <div
        style="
          box-shadow: -18px 14px 22px 0px rgba(0, 0, 0, 0.75);
          padding: 20px;
        "
      >
        <transition name="slide">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      list: [],
      selectedPokemon: null,
    };
  },
  computed: {
    listResultsWithImage: function () {
      return this.list.results.map((item) => {
        var id = item.url.split("/")[6];
        item.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return item;
      });
    },
  },
  mounted() {
    this.fetchList("https://pokeapi.co/api/v2/pokemon?limit=10");
  },
  methods: {
    fetchList: function (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => (this.list = data));
    },
  },
};
</script>

<style>
html,
body {
  padding-left: 0;
  margin-left: 0;
  font-family: sans-serif;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 4fr;
}

.pokedex-list-item {
  min-height: 50px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;
}

.pokedex-list-item:hover {
  background-color: #ccc;
}
</style>
