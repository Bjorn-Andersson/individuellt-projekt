<script>
  import PokemonHome from '../components/PokemonHome.vue'

  export default {
    data() {
      return {
        pokemonData: null,
        pokemonName: null,
        visibility: 'none'
      }
    },
    components: {
      PokemonHome
    },
    computed: {
      pokemonNameCap() {
        let pokeClone = []
        for (let n = 0; n < this.pokemonName.length; n++) {
          pokeClone.push(
            this.pokemonName[n].charAt(0).toUpperCase() +
              this.pokemonName[n].slice(1)
          )
        }
        return pokeClone
      }
    },
    methods: {
      getPokemonData(pokemonData) {
        this.pokemonData = pokemonData
      },
      getPokemonName(pokemonName) {
        this.pokemonName = pokemonName
      },
      showOrHideList() {
        if (this.visibility !== 'flex') this.visibility = 'flex'
        else this.visibility = 'none'
      }
    }
  }
</script>

<template>
  <PokemonHome @pokemon-data="getPokemonData" @pokemon-name="getPokemonName" />
  <div class="container">
    <input
      type="button"
      class="button btn btn-primary"
      value="Pokémon Raw Data"
      @click="showOrHideList"
    />
    <ol :style="{ display: visibility }">
      <li class="dataList" :key="data" v-for="(data, index) in pokemonData">
        <a :href="pokemonData[index]" :text="pokemonNameCap[index]" />
      </li>
    </ol>
  </div>
</template>
<style lang="scss" scoped>
  @import '../index.scss';
  ol {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .button {
    margin-top: 60px;
    margin-bottom: 30px;
    padding: 10px;
    color: $pokeGold;
  }
  .dataList {
    border-bottom: $pokeBorder;
    border-left: $pokeBorder;
    padding: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 150px;
    text-align: left;
  }
  .container {
    margin: auto;
    max-width: 70%;
    text-align: center;
  }
</style>
