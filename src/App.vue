<script></script>
<!--min store vägrar funka utan ett script element-->

<template>
  <header>
    <div class="containerHead">
      <div>
        <img src="/images/logo.png" />
      </div>
      <div>
        <nav>
          <ul class="nav">
            <li>
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
              <RouterLink to="/challenge">Pokémon challenge</RouterLink>
            </li>
            <li>
              <RouterLink to="/fight">Pokémon fight!</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <p span class="points">Total Points: {{ this.$store.state.points }}</p>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>
