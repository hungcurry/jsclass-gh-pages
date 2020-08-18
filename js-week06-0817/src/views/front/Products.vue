<template>
  <div class="about">
    <h2>This is 產品列表頁面</h2>
    <table>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.content }}</td>
        <td>
          <!-- 方法一 router-link 進入單一產品頁面 -->
          <!-- 動態路由 :to-->
          <router-link :to="`/product/${item.id}`">看產品</router-link>
        </td>
        <td>
          <!-- 方法二 按鈕方式 進入單一產品頁面 -->
          <button @click="goPage(item)">進入頁面</button>
          <a href="javascript:;" @click.prevent="goPage(item)">進入頁面</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      products: [],
    };
  },
  methods: {
    goPage(item) {
      console.log(this.$router);
      // $router.push() 轉換頁面
      this.$router.push(`/product/${item.id}`);
    },
  },
  created() {
    // console.log('UUID', process.env.VUE_APP_UUID);
    const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`;
    this.$http.get(url)
      .then((res) => {
        console.log(res);
        this.products = res.data.data;
      });
  },
};
</script>
