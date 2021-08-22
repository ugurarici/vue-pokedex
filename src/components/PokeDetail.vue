<template>
  <div>
    <h2>{{ detail.name }}</h2>
    <div>
      <img :src="detail.sprites.front_default" :alt="detail.name" /><br />
      <img
        :src="detail.sprites.other.dream_world.front_default"
        :alt="detail.name"
      />
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
</template>

<script>
export default {
  name: "PokeDetail",
  props: {
    detail: Object,
  },
};
</script>