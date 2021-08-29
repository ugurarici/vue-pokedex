<template>
  <div>
    <div v-if="detail" :key="detail.name">
      <h2>{{ detail.name }}</h2>
      <p>Viewed pokemon count: {{ count }}</p>
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
    <div v-else>{{ pokemonName }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PokeDetail",
  computed: {
    pokemonName() {
      return this.$route.params.pokemon;
    },
    ...mapState(["count", "detail"]),
  },
  methods: {
    ...mapActions(["fetchPokemonDetail"]),
  },
  beforeMount() {
    this.fetchPokemonDetail(this.pokemonName);
  },
  watch: {
    pokemonName() {
      this.fetchPokemonDetail(this.pokemonName);
    },
  },
};
</script>