// 匯入語系檔案
import zh from './zh_TW.js';

  // Class 設定檔案
  VeeValidate.configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    }
  });

// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate form 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 全域註冊 VueLoading 並標籤設定為 loading
Vue.component('loading', VueLoading);
// 第二種
// 套件加入在vue的藍圖（原型）
// Vue.use(VueLoading);

new Vue({
  el: '#app',
  data: {
    // 建立一個暫存 放前台複數資料的空陣列
    products: [],
    // 建立一個暫存 放前台單筆資料的空物件
    tempProduct: {
      num: 0,
    },
    // loading
    status: {
      loadingItem: '',
      loadingUpdateCart: '',
    },
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    carts: [],
    cartTotal: 0,
    isLoading: false,
    uuid: 'feec8521-8cf5-41e0-aa0d-3bac8c6c6213',
    path: 'https://course-ec-api.hexschool.io',
  },
  methods: {
    // 複數資料
    getProducts(page = 1) {// 參數預設值
      this.isLoading = true;
      const url = `${this.path}/api/${this.uuid}/ec/products?page=${page}`;
      axios.get(url)
      .then((res) => {
        console.log("所有商品",res);
        this.products = res.data.data;
        this.isLoading = false;
      })
      .catch((err) =>{
        this.isLoading = false;
      });
    },
    // 單筆Detail資料
    getDetailed(id) {
      this.status.loadingItem = id;
      const url = `${this.path}/api/${this.uuid}/ec/product/${id}`;
      console.log(id);
      axios.get(url)
      .then((res) => {
        console.log("單筆商品",res);
        this.tempProduct = res.data.data;

        // 將option 預設值改成１ 顯示最小訂購數
        // 第一種寫法 
        //this.tempProduct.num = 1;

        // 第二種寫法 
        this.$set(this.tempProduct, 'num', 1);
        // 由於 tempProduct 的 num 沒有預設數字
        // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題
        // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set

        $('#productModal').modal('show');
        this.status.loadingItem = '';
      })
      .catch((err) =>{
        this.status.loadingItem = '';
      });
    },
    // 新增產品到購物車 post 預設填入 id / 數量 
    addToCart(id, quantity = 1) {
      this.status.loadingItem = id;
      const url = `${this.path}/api/${this.uuid}/ec/shopping`;
      
      // 先定義出購物車的id 與 數量 然後post到 購物車
      //es6縮寫寫法
      const cart = {
        product: id,
        quantity,
      };
      console.log("單一購物車資料" , cart);

      axios.post(url, cart)
      .then((res) => {
        this.status.loadingItem = '';
        $('#productModal').modal('hide');
        // 取得購物車資料
        this.getCart();
      })
      .catch((error) => {
        this.status.loadingItem = '';
        //固定寫法 避免２次點擊加入購物車
        //console.log(error.response.data.errors);
        console.log(error.response.data.errors);
        alert(error.response.data.errors);
        $('#productModal').modal('hide');
      });
    },
    // 取得購物車資料 get
    getCart() {
      this.isLoading = true;
      const url = `${this.path}/api/${this.uuid}/ec/shopping`;

      axios.get(url)
      .then((res) => {
        console.log("購物車商品" ,res);
        this.carts = res.data.data;
        // 累加總金額
        this.totalUpdate();
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
      });
    },
    // 累加總金額
    totalUpdate(){
      //先清空 預設值
      this.cartTotal = 0;
      this.carts.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity;
      });
    },
    // 編輯更新購物車數量 patch
    quantityUpdate(id, quantity) {
      this.status.loadingUpdateCart = id;
      const url = `${this.path}/api/${this.uuid}/ec/shopping`;
      // this.isLoading = true;
      //es6縮寫寫法
      const cart = {
        product: id,
        quantity,
      };

      axios.patch(url, cart)
      .then((res) => {
        this.status.loadingUpdateCart = "";
        // this.isLoading = false;
        //更新完數量後 再跑一次更新購物車
        this.getCart();
      })
      .catch((error) => {
        // this.isLoading = false;
        this.status.loadingUpdateCart = "";
        console.log(error.response.data.errors);
      });
    },
    // 移除購物車 delete
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${this.path}/api/${this.uuid}/ec/shopping/all/product`;

      axios.delete(url)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${this.path}/api/${this.uuid}/ec/shopping/${id}`;

      axios.delete(url).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${this.path}/api/${this.uuid}/ec/orders`;

      axios.post(url, this.form)
      .then((res) => {
        console.log("送出資料" , res);
        if (res.data.data.id) {
          this.isLoading = false;
          // 跳出提示訊息
          $('#orderModal').modal('show');
          //這時候需重新渲染購物車 讓畫面更新
          this.getCart();
        }
      })
      .catch((error) => {
        this.isLoading = false;
        console.log(error.res.data.errors);
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
});


