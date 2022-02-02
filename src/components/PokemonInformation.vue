<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        pokeName: null,
        pokeIndex: null,
        pokeType: [],
        pokeHeight: null,
        pokeWeight: null,
        pokeStats: [],
        pokeMoves: [],
        officialArtwork: null,
        spriteFront: null,
        spriteBack: null,
        score: null,
        message: null
      }
    },
    watch: {
      score() {
        this.message = `Well done reading about ${this.upperCaseParam}, you have earned a point!`
      }
    },
    computed: {
      pokeMovesAlphabetical() {
        const pokeClone = JSON.parse(JSON.stringify(this.pokeMoves))
        return pokeClone.sort()
      },
      pokeTypeString() {
        let pokeClone = this.pokeType
        return pokeClone
          .map(element => {
            return element.charAt(0).toUpperCase() + element.slice(1)
          })
          .join(' / ')
      },
      upperCaseParam() {
        let pokeClone = this.$route.params.name
        return pokeClone.charAt(0).toUpperCase() + pokeClone.slice(1)
      }
    },
    methods: {
      toUpper(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
    },
    created() {
      setTimeout(() => {
        return this.$store.commit('increase'), this.score++
      }, 5000)
      axios
        .get('https://pokeapi.co/api/v2/pokemon/' + this.$route.params.name)
        .then(result => {
          this.pokeName = this.toUpper(result.data.name)
          this.pokeIndex = result.data.id
          this.pokeHeight = result.data.height
          this.pokeWeight = result.data.weight
          for (let n = 0; n < result.data.types.length; n++) {
            this.pokeType.push(result.data.types[n].type.name)
          }
          for (let n = 0; n < result.data.moves.length; n++) {
            this.pokeMoves.push(this.toUpper(result.data.moves[n].move.name))
          }
          for (let n = 0; n < result.data.stats.length; n++) {
            this.pokeStats.push(result.data.stats[n])
          }
          this.officialArtwork =
            result.data.sprites.other['official-artwork'].front_default
          this.spriteFront = result.data.sprites.front_default
          this.spriteBack = result.data.sprites.back_default
        })
    }
  }
</script>

<template>
  <h1>Welcome to {{ upperCaseParam }}'s page!</h1>
  <h3 class="pointHeader">
    {{ message }}
  </h3>
  <div class="container">
    <div class="list">
      <div class="link">
        <RouterLink to="/">Back to home page</RouterLink>
      </div>
      <ul>
        <li><b>Name:</b> {{ pokeName }}</li>
        <li><b>Pokédex Index:</b> {{ pokeIndex }}</li>
        <li><b>Type:</b> {{ pokeTypeString }}</li>
        <li><b>Height:</b> {{ pokeHeight }}</li>
        <li><b>Weight:</b> {{ pokeWeight }}</li>
        <li>
          <b>Base Stats:</b>
          <ul>
            <li class="sublist" :key="stat" v-for="stat in pokeStats">
              <b>{{ stat.stat.name }}:</b> {{ stat.base_stat }}
            </li>
          </ul>
        </li>
        <li>
          <b>Possible Moves:</b>
          <ul>
            <li
              class="sublist"
              :key="move.move"
              v-for="move in pokeMovesAlphabetical"
            >
              {{ move }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <div>
        <p>Official artwork:</p>
        <img :src="officialArtwork" />
      </div>
      <div>
        <p class="spriteText">In-game model:</p>
        <img class="spriteImage" :src="spriteFront" />
        <img class="spriteImage" :src="spriteBack" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import '../index.scss';
  .pointHeader {
    text-align: center;
    padding-bottom: 20px;
    margin-top: -30px;
  }
  .container {
    margin: auto;
    max-width: 70%;
    text-align: center;
    display: flex;
    gap: 200px;
  }
  .spriteImage {
    height: 300px;
  }
  .link {
    text-align: left;
    padding-bottom: 15px;
    a {
      color: $pokeBlue;
    }
  }
  ul {
    text-align: left;
    list-style: none;
    padding-right: 30px;
  }
  h1 {
    padding-top: 40px;
    padding-bottom: 80px;
    text-align: center;
  }
  .list {
    margin-left: 200px;
    padding-bottom: 50px;
  }
  .spriteText {
    margin-top: 50px;
    margin-bottom: 40px;
  }
  .sublist {
    margin-left: 35px;
    width: 150px;
  }
  @media screen and (max-width: 900px) {
    .container {
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }
    .list {
      margin-left: 100px;
      padding-bottom: 0;
    }
    .spriteText {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
