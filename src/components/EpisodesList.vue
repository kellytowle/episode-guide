<template>
  <div>
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
      { title: 'Ham sandwich' },
      { title: 'Green eggs and ham' },
      { title: 'hamburger' },
      { title: 'Something Newburg' }
    ]
    this.filterEpisodes()
  },
  watch: {
    filterTerm: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log('filterTerm from parent: ', this.filterTerm)
        this.filterEpisodes()
        // return this.filterTerm
      }
    }
  },
  methods: {
    filterEpisodes () {
      this.filteredEpisodes = []
      this.episodes.forEach(episode => {
        console.log('episode: ', episode)
        const title = episode.title.toLowerCase()
        if (!this.filterTerm || title.includes(this.filterTerm.toLowerCase())) {
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
