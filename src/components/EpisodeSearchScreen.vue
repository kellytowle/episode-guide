<template>
  <main>
    <section>
      <input id="filter" type="text" v-model="filterTerm" />
    </section>
    <section>
      <episodes-list :filterTerm="filterTerm"></episodes-list>
    </section>
  </main>
</template>

<script>
import EpisodesList from '@/components/EpisodesList'
export default {
  name: 'EpisodeSearchScreen',
  components: {
    EpisodesList
  },
  data () {
    return {
      filterTerm: ''
    }
  },
  computed: {
    term: {
      get () {
        return this.filterTerm
      },
      set (newValue) {
        this.filterTerm = newValue
      }
    }
  }
}
</script>

<style scoped>

</style>
