<template>
  <div>
    <div v-if="detail">
      <h2>{{ detail.name }}</h2>
      <div>
        <img :src="detail.sprites.front_default" :alt="detail.name" /><br />
      </div>
      <div>
        XP: {{ detail.base_experience }}<br />
        Height: {{ detail.height }}<br />
        Weight: {{ detail.weight }}<br />
      </div>
      <div>
        <ul>
          <li v-for="(stat, indis) in detail.stats" :key="indis">
            {{ stat.stat.name }} : {{ stat.base_stat }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>{{ pokemonName }} <span class="spinner"></span></div>
  </div>
</template>

<script>
export default {
  name: "PokeDetail",
  data() {
    return {
      detail: null,
    };
  },
  computed: {
    pokemonName() {
      return this.$route.params.pokemon;
    },
  },
  beforeMount() {
    this.fetchPokemonDetail();
  },
  methods: {
    fetchPokemonDetail: function () {
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`)
        .then((response) => response.json())
        .then((data) => (this.detail = data));
    },
  },
  watch: {
    pokemonName() {
      this.detail = null;
      this.fetchPokemonDetail();
    },
  },
};
</script>

<style>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #000;
  animation: spinner 0.6s linear infinite;
}
</style>