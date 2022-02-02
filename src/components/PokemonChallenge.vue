<script>
  export default {
    data() {
      return {
        imageObject: {
          bulbasaur: '/images/1b.png',
          charizard: '/images/2b.png',
          rattata: '/images/3b.png',
          vileplume: '/images/4b.png',
          machamp: '/images/5b.png',
          magneton: '/images/6b.png',
          exeggcute: '/images/7b.png',
          staryu: '/images/8b.png',
          gyarados: '/images/9b.png',
          mewtwo: '/images/10b.png'
        },
        answer: '',
        score: 0,
        randomImage: '',
        input: '',
        message: '',
        divClass: '',
        randomNumber: '',
        previousRandomNumber: 99,
        loss: false,
        win: false,
        prevAnswer: null,
        bColor: 'rgba(255, 255, 255, 0.9)'
      }
    },
    created() {
      this.createImage()
    },
    methods: {
      newImage() {
        this.createImage()
        this.input = ''
        this.loss = false
        this.win = false
        this.bColor = 'rgba(255, 255, 255, 0.9)'
      },
      createImage() {
        do {
          this.randomNumber = Math.floor(Math.random() * 10)
        } while (this.randomNumber === this.previousRandomNumber) //prevents repeated images
        this.previousRandomNumber = this.randomNumber
        this.randomImage = '/images/' + this.randomNumber + 'b.png'
        let answerArray = Object.keys(this.imageObject)
        this.answer = answerArray[this.randomNumber]
      },
      onSubmit() {
        if (this.input.toLowerCase() === this.answer) {
          //next if() prevents spamable point-gains
          if (this.answer !== this.prevAnswer) {
            this.loss = false
            this.win = true
            this.bColor = 'green'
            this.prevAnswer = this.answer
            this.randomImage = '/images/' + this.randomNumber + '.png'
            this.$store.commit('increase')
            this.score++
          }
        } else {
          this.loss = true
          this.bColor = 'rgba(255, 51, 0, 0.9)'
        }
      }
    }
  }
</script>

<template>
  <div class="mainBody" :style="{ backgroundColor: bColor }">
    <h1>Guess the Pokémon!</h1>
    <div><img :src="randomImage" /></div>
    <div>
      <div class="text" v-if="loss">
        <p>Unfortunately that's not correct, try again!</p>
      </div>
      <div class="text" v-else-if="win">
        <p>That's correct! Well done!</p>
      </div>
      <div class="text" v-else>
        <p>Give it your best try!</p>
      </div>
      <input
        class="inputField form-control"
        v-model="input"
        placeholder="Type your guess here!"
        @keyup.enter="onSubmit"
      />
      <input
        class="inputButton btn btn-primary"
        type="button"
        @click="onSubmit"
        value="Submit"
      />
    </div>
    <div class="score">
      <p>Score: {{ this.score }}</p>
    </div>
    <input
      class="inputButton btn btn-primary"
      type="button"
      @click="newImage"
      value="New Picture"
    />
  </div>
</template>

<style scoped lang="scss">
  @import '../index.scss';
  h1 {
    padding-top: 0px;
  }
  .inputField {
    width: 400px;
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
  .mainBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 100px;
  }
  .text {
    font-size: 140%;
    margin-top: 5px;
    text-align: center;
  }
  .score {
    font-size: 140%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
