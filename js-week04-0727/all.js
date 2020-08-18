/* global Vue */
/* eslint-disable no-new */

// 先把與資料結構有關的挑出來做

// -製作登入
// -列出產品,顯示產品列表
//   -驗證
// -分頁功能（Ajax，如何閱讀 Ajax結果）
//   -取得分頁
//   -了解分頁結構
// -新增／編輯產品
//   -產生元件
//   -取得遠端資料
//   -更新（emit)
// -刪除  

//匯入pagination
import pagination from './pagination.js';
//匯入modal
import modal from './modal.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal);

new Vue({
  el: '#app',
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: [],
    },
    api: {
      // 如果在login 登入失敗  帳號 密碼 或是 UUID 錯誤  跑出驗證失敗 422
      uuid: 'feec8521-8cf5-41e0-aa0d-3bac8c6c6213',
      path: 'https://course-ec-api.hexschool.io/',
    },
    token: '',
    isNew: '',
    loadingBtnEdit: '',
    loadingBtnDel: '',
  },
  methods: {
    //Modal
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = { imageUrl: [] };
        $('#productModal').modal('show');
      } 
      else if (status === 'edit') {
        //讀取效果Btn
        this.loadingBtnEdit = item.id;
        // 步驟01- 重新取得遠端單筆資料
        let url = `${this.api.path}api/${this.api.uuid}/admin/ec/product/${item.id}`;
        axios.get(url)
        .then((res) => {
          //單一列表資訊
          console.log(res);
          this.tempProduct = res.data.data;
          // 步驟02- 彈出視窗
          $('#productModal').modal('show');
          //讀取效果Btn清除
          this.loadingBtnEdit = ''; 
        });
      } 
      else if(status === 'delete'){
        //讀取效果Btn
        this.loadingBtnDel = item.id;
        // 步驟01- 重新取得遠端單筆資料
        let url = `${this.api.path}api/${this.api.uuid}/admin/ec/product/${item.id}`;
        axios.get(url)
        .then((res) => {
          //單一列表資訊
          console.log(res);
          this.tempProduct = res.data.data;
          // 步驟02- 彈出視窗
          $('#delProductModal').modal('show');
          //讀取效果Btn清除
          this.loadingBtnDel = ''; 
        });
      }
    },
    //刪除資料
    delProduct() {
      let url = `${this.api.path}api/${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;

      axios.delete(url, this.tempProduct.id)
      .then(res => {
        this.getProducts();
        this.tempProduct = { 
          imageUrl: [],
        };
      });

      $('#delProductModal').modal('hide');

    },
    //取得資料
    getProducts(num = 1) {
      //es6  num =1 預設值概念
      //?page=${num} 預設值 第一頁分頁
      // console.log(num);
      const url = `${this.api.path}api/${this.api.uuid}/admin/ec/products?page=${num}`;

      axios.get(url)
      .then((res) => {
        //console.log(res); // 秀出資料
        //將資料複製到Vue products: []
        this.products = res.data.data;
        //將資料複製到Vue pagination: {}
        this.pagination = res.data.meta.pagination;

        //如果有id 觸發關閉彈跳視窗
        if (this.tempProduct.id) {
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('hide');
        }
        //判斷如果沒有id ==>建立新產品
        else{
          $('#productModal').modal('hide');
        }

      });
    },

  },
  created() {
    //created() 處理資料
    //mounted() 處理dom

    // 將token取出來這程式碼 如果放在生命週期created() 只需要寫一次
    // 將token取出來 並存在vue的資料 token裡面
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    //做為預設值來做發送
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

    this.getProducts();
  },
});



