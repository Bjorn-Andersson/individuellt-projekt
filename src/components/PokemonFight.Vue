<!--

  Pokemon 1v1 typing adventure

  1. välj en av Bulbasaur, Charmander, Squirtle
  2. en motståndare slumpas fram
  3. 4 tekniker slumpas fram
  4. teknikernas skada / effekter måste ställas in
  5. teknikerna måste subtrahera liv
  6. ui måste skapas


poke100Hpbar = hp
pokeCurrentHpBar = hp - damage
(2 olika bars överlappande med olika z index och backgrundsfärg, transition: 0.3s ease)

calculathp() {
        const hp = 4000
        const dmg = 1000
        const progress = (100 * dmg) / hp
        return progress + '%'
 -->
<script>
  export default {
    data() {
      return { toggleFrame: 'display' }
    }
  }
</script>
<template>
  <div class="container">
    <div :style="{ display: toggleFrame }">
      <div class="outerFrame">
        <div class="innerFrame" />
        <div class="horizontalLine" />
        <div class="horizontalLineSmall" />
        <div class="verticalLine" />
        <div class="enemyHP">
          Enemy Name
          <div class="flexer">
            HP:
            <div class="healthBar">
              <div class="healthFull" />
              <div class="healthDamaged" />
            </div>
          </div>
        </div>
        <div class="myHP">
          <div class="spacer flexer">
            My Name
            <div class="hp">60 / 70</div>
          </div>
          <div class="flexer">
            HP:
            <div class="healthBar">
              <div class="healthFull" />
              <div class="healthDamaged" />
            </div>
          </div>
        </div>
        <div class="text">
          <p>Your attack damaged testPokemon for 15 damage!</p>
        </div>
        <div class="attackBox">
          <div class="attack">Attack1</div>
          <div class="attack">attack2</div>
          <div class="attack">attack3</div>
          <div class="attack">attack4</div>
        </div>
        <div class="attackInput">
          <input class="input form-control" placeholder="Type your attack!" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .outerFrame {
    margin-top: 20px;
    background-color: bisque;
    border-radius: 10px;
    height: 700px;
    position: relative;
  }
  .innerFrame {
    background-color: white;
    position: absolute;
    left: 15px;
    top: 15px;
    height: 670px;
    width: 1265px;
  }
  .horizontalLine {
    background-color: bisque;
    position: absolute;
    left: 15px;
    width: 1265px;
    height: 15px;
    top: 480px;
  }
  .verticalLine {
    background-color: bisque;
    position: absolute;
    left: 500px;
    width: 15px;
    height: 190px;
    top: 495px;
  }
  .horizontalLineSmall {
    background-color: bisque;
    position: absolute;
    width: 500px;
    height: 15px;
    top: 625px;
  }
  .enemyHP {
    position: absolute;
    left: 40px;
    top: 40px;
    font-size: 150%;
    z-index: 1;
  }
  .myHP {
    position: absolute;
    left: 700px;
    top: 390px;
    font-size: 150%;
    z-index: 1;
  }
  .hp {
    margin-left: 15rem;
  }
  .flexer {
    display: flex;
  }
  .healthBar {
    position: relative;
  }
  .healthFull {
    position: absolute;
    margin-left: 7px;
    top: 11px;
    height: 15px;
    width: 500px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: white;
    z-index: -1;
  }
  .healthDamaged {
    position: absolute;
    margin-left: 7px;
    top: 11px;
    height: 15px;
    width: 400px;
    border-radius: 5px;
    background-color: green;
    z-index: 1;
  }
  .text {
    position: absolute;
    text-align: center;
    left: 550px;
    top: 520px;
    font-size: 150%;
    width: 690px;
    height: 140px;
    background-color: aquamarine;
  }
  .attackBox {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    top: 510px;
    left: 30px;
    width: 455px;
    height: 100px;
    background-color: aquamarine;
  }
  .attack {
    width: 227px;
    text-align: center;
    font-size: 150%;
  }
  .attackInput {
    position: absolute;
    top: 648px;
    left: 30px;
  }
  .input {
    width: 455px;
    height: 30px;
  }
</style>
