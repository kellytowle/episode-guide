<template>
  <div>
    <h1>{{ this.term }}</h1>
    <ul>
      <li v-for="episode in filteredEpisodes" :key="episode.id">
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
      episodes: [],
      filteredEpisodes: []
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
      this.filterEpisodes()
      return this.filterTerm
    }
  },
  methods: {
    filterEpisodes () {
      this.filteredEpisodes = []
      this.episodes.forEach(episode => {
        console.log('episode: ', episode)
        if (episode.title.includes(this.filterTerm)) {
          this.filteredEpisodes.push(episode)
        }
      })
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
