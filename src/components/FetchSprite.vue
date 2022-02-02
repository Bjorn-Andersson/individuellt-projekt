<script>
  export default {
    data() {
      return {
        spriteList: [],
        picture: this.id
      }
    },
    props: {
      id: {
        default: null,
        type: Number
      }
    },
    created() {
      this.axios
        .get('https://pokeapi.co/api/v2/pokemon/' + (this.id + 1))
        .then(result => {
          this.spriteList.push(result.data.sprites.other.home.front_default)
        })
    }
  }
</script>

<template>
  <img :alt="this.id + 1" class="sprite" :src="spriteList[0]" />
</template>

<style scoped>
  .sprite {
    height: 50px;
    width: 50px;
  }
</style>
