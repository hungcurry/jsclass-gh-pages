<template>
  <div>
    白爛貓 後台管理
    <div id="nav">
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/">後台首頁</router-link> |
      <router-link to="/admin/products">產品列表</router-link> |
      <router-link to="/admin/coupons">優惠劵頁面</router-link> |
      <router-link to="/admin/orders">購物車列表</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view :token="token" v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
// 驗證可以寫這邊
export default {
  name: 'Dashboard',
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // 取得 token 的 cookies
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}api/auth/check`;

      this.$http.post(api, {
        // 強制下一行取消es6
        // eslint-disable-next-line
        'api_token': this.token 
      })
        .then((res) => {
          // 登入沒有問題
          console.log(res);
          if (res.data.success) {
            this.checkSuccess = true;
          }
        })
        .catch((error) => {
          // 驗證失敗，轉回登入頁
          console.log(error.response);
          this.$router.push('/login');
        });
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      console.log('token 已清除');
      this.$router.push('/login');
    },
  },
};
</script>
