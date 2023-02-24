<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-green bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Knight's Tour</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">

          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>
