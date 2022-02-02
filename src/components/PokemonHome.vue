<script>
  import FetchSprite from './FetchSprite.vue'

  export default {
    components: {
      FetchSprite
    },
    data() {
      return {
        pokemonUrl: null,
        pokemonName: [],
        pokemonNameFiltered: [],
        pokeSearch: null,
        pokeDisplay: null,
        previousPokeSearch: null,
        displayList: 'inline',
        displayListFiletered: 'none',
        spriteList: [],
        errorMessage: null
      }
    },
    methods: {
      searchList() {
        this.displayList = 'none'
        this.pokeSearch = this.pokeSearch.toLowerCase()

        if (this.pokemonName.includes(this.pokeSearch)) {
          if (this.pokeSearch !== this.previousPokeSearch) {
            this.pokeDisplay =
              this.pokeSearch.charAt(0).toUpperCase() + this.pokeSearch.slice(1)
            this.pokemonNameFiltered.push(this.pokeDisplay)
          }
          this.previousPokeSearch = this.pokeSearch
          this.displayListFiletered = 'inline'
          this.axios
            .get(
              'https://pokeapi.co/api/v2/pokemon/' +
                this.pokeSearch.toLowerCase()
            )
            .then(result => {
              this.spriteList.push(result.data.sprites.other.home.front_default)
            })
        } else {
          this.errorMessage = "That's not a generation 1 Pokémon, try again!"
          this.pokemonNameFiltered = []
          this.spriteList = []
        }
      },
      resetList() {
        this.displayList = 'inline'
        this.displayListFiletered = 'none'
        this.pokeSearch = null
        this.pokemonNameFiltered = []
        this.spriteList = []
        this.errorMessage = null
      },
      clearList() {
        this.pokemonNameFiltered = []
        this.spriteList = []
        this.displayList = 'inline'
        this.displayListFiletered = 'none'
        this.previousPokeSearch = null
      }
    },
    computed: {
      pokeNameCap() {
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
    created() {
      this.axios
        .get('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0')
        .then(result => {
          this.pokemonUrl = result.data.results.map(({ url }) => url)
          this.pokemonData = this.pokemonUrl
          for (let n = 0; n < result.data.results.length; n++) {
            this.pokemonName.push(result.data.results[n].name)
          }
          this.$emit('pokemon-data', this.pokemonData)
          this.$emit('pokemon-name', this.pokemonName)
        })
    },
    emits: ['pokemon-data', 'pokemon-name']
  }
</script>

<template>
  <div class="container">
    <h1>
      Welcome to your online Pokémon adventure! Learn about Pokémons, complete
      challenges, collect points and brag to your friends!
    </h1>
    <h2>Let's learn about the generation 1 Pokémons!</h2>
    <input
      class="inputField form-control"
      placeholder="Search Pokémon list"
      v-model="pokeSearch"
      @keyup.enter="searchList"
      @keydown.delete="clearList"
    />
    <input
      type="button"
      class="inputButton btn btn-primary"
      value="Submit"
      @click="searchList"
    />
    <div class="resetButton">
      <input
        type="button"
        class="inputButton btn btn-primary"
        value="Reset list"
        @click="resetList"
      />
    </div>
    <ol>
      <li
        :style="{ display: displayList }"
        :key="pokemon"
        v-for="(pokemon, index) in pokeNameCap"
      >
        <FetchSprite :id="index" />
        <p class="name">{{ pokemon }} -</p>
        <span class="link">
          <RouterLink :to="`/${pokemon.toLowerCase()}`" text="Pokémon Page" />
        </span>
      </li>
    </ol>
    <p class="errorMessage">{{ errorMessage }}</p>
    <ol>
      <li
        :style="{ display: displayListFiletered }"
        :key="pokemon"
        v-for="pokemon in pokemonNameFiltered"
      >
        <img class="sprite" :src="spriteList[0]" />
        <p class="name">{{ pokemon }} -</p>
        <span class="link">
          <RouterLink :to="`/${pokemon.toLowerCase()}`" text="Pokémon Page" />
        </span>
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
    margin-left: 75px;
  }
  .name {
    display: inline;
    margin-left: 10px;
    font-size: 130%;
  }
  .link {
    margin-left: 15px;
    font-size: 90%;
    a {
      color: $pokeBlue;
    }
  }
  li {
    border-bottom: $pokeBorder;
    border-left: $pokeBorder;
    padding: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 350px;
    text-align: left;
  }
  .errorMessage {
    font-size: 130%;
  }
  .container {
    margin: auto;
    text-align: center;
  }
  h1 {
    padding-top: 40px;
    font-size: 200%;
  }
  h2 {
    margin-top: 60px;
    margin-bottom: 30px;
    font-size: 150%;
  }
  .inputField {
    width: 350px;
    height: 38px;
    margin-top: 10px;
    border: $pokeBorder;
  }
  .form-control {
    display: inline;
  }
  .inputButton {
    margin-left: 5px;
    margin-top: -5px;
    color: $pokeGold;
  }
  .resetButton {
    margin-top: 20px;
    color: $pokeGold;
  }
  .sprite {
    height: 50px;
    width: 50px;
  }
  @media screen and (max-width: 900px) {
    ol {
      margin-left: -20px;
    }
    h1 {
      font-size: 170%;
    }
    h2 {
      font-size: 150%;
    }
  }
</style>
