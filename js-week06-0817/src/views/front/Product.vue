<template>
  <div class="about">
    <h1>This is 單一產品頁面</h1>
    <h3>{{product.title}}</h3>
    <p>{{product.description}}</p>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      product: {},
    };
  },
  created() {
    // 方法一 用屬性方式 進入單一產品頁面
    // 屬性 $route
    // console.log(this.$route);
    // es6 解構
    const { id } = this.$route.params;
    const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
    this.$http.get(url)
      .then((res) => {
        console.log(res);
        this.product = res.data.data;
      });
  },
};
</script>
