<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <!-- 切換的時候 只會router-view裡面的內容畫面 -->
    <!-- 把要呈現多個頁面都是塞在路由內 -->
    <!-- 外層以外的空間 都不會去動它 -->
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
