<template>
  <div>
    <h1>{{ this.filterTerm }}</h1>
    <ul>
      <li v-for="episode in episodes" :key="episode.id">
        {{ episode.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EpisodesList',
  data () {
    return {
      episodes: []
    }
  },
  props: ['filterTerm'],
  mounted () {
    this.episodes = [
      { title: 'Episode 1' },
      { title: 'Episode 2' },
      { title: 'Episode 3' },
      { title: 'Episode 4' }
    ]
  },
  computed: {
    term () {
      console.log('filterTerm from parent: ', this.filterTerm)
      return this.filterTerm
    }
  }
}
</script>

<style scoped>
  section {
    background-color: fuchsia;
    width: 20vw;
    height: 20vh;
  }
</style>
