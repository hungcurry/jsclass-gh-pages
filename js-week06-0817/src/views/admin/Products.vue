<template>
  <div>

    白爛貓後台 | 產品列表
    <div id="app" class="container mt-3">
      <div>
        <div class="text-right mt-4">
          <button class="btn btn-primary" @click="openModal('new')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="100">
                排序
              </th>
              <th width="100">
                分類
              </th>
              <th width="300">
                產品名稱
              </th>
              <th width="100">
                原價
              </th>
              <th width="100">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="150">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item , index) in products" :key="item.id">
              <td>{{ index +1 }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>
                {{ item.origin_price }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <!-- 編輯 -->
                  <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)"
                    :disabled="loadingBtnEdit === item.id">
                    編輯
                    <!-- 讀取效果 -->
                    <span class="spinner-grow spinner-grow-sm"
                    role="status" aria-hidden="true" v-if="loadingBtnEdit === item.id"></span>
                  </button>
                  <!-- 刪除 -->
                  <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)"
                  :disabled="loadingBtnDel === item.id">
                    刪除
                    <!-- 讀取效果 -->
                    <span class="spinner-grow spinner-grow-sm"
                    role="status" aria-hidden="true" v-if="loadingBtnDel === item.id"></span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Products',
  props: ['token'],
  data() {
    return {
      products: [],
      pagination: {},
      loadingBtnEdit: '',
      loadingBtnDel: '',
    };
  },
  methods: {
    getProducts() {
      // 後台API
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/products`;
      this.$http.get(api)
        .then((res) => {
          console.log(res);
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
