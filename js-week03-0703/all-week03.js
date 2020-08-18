




var app = new Vue({
  el: '#app',
  data: {
    products: [{
        id: 1223789235,
        title: '白爛貓基本站姿45公分(綠豆眼)',
        category: '布偶',
        content: '材質:表布及填充物100%聚酯纖維',
        description: '白爛貓基本站姿45cm(綠豆眼),尺寸:約45cm(依實物為主)',
        imageUrl: 'https://8685.cyberbiz.tw/media/W1siZiIsIjg2ODUvcHJvZHVjdHMvNTE2MDk5L0xDMDEwMTAxMDgwMV9BMDFfYWM3NDNiMTMyODk1N2QxMDA3YzUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=7e930896a953681a',
        isEnabled: 1,
        originPrice: '1099',
        price: '890',
        unit: 'NT$'
      },
      {
        id: 1223789336,
        title: '白爛貓基本坐姿50CM-抱魚款',
        category: '布偶',
        content: '材質:表布及填充物100%聚酯纖維',
        description: '白爛貓基本坐姿50CM-抱魚款,尺寸:約50cm(依實物為主)',
        imageUrl: 'https://8685.cyberbiz.tw/media/W1siZiIsIjg2ODUvcHJvZHVjdHMvNzkzNDFhYTYyMjAyN2U4Y2M3ODZhN2RjYzlmNWJjYjNlMTA2NDJhM2JlOTE4N2VhNmY5YTY0Zjk5MzM5MjQ3NS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=e9f685eac8e7043d',
        isEnabled: 0,
        originPrice: '1099',
        price: '990',
        unit: 'NT$'
      },
      {
        id: 1223789537,
        title: '白爛貓基本站姿80CM(1人限購1隻2399)',
        category: '布偶',
        content: '材質:表布及填充物100%聚酯纖維',
        description: '白爛貓基本站姿80CM(1人限購1隻2399),尺寸:約80cm(依實物為主)',
        imageUrl: 'https://8685.cyberbiz.tw/media/W1siZiIsIjg2ODUvcHJvZHVjdHMvNjQzMDY3YzA3NWZmMWM0OTc5YTgzYmM2ZjFlNzIwNjFhZmUzZjQwZGVlZGFkMjVlY2Y5MGM2YzZlZmU4M2MyNS5qcGVnIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.jpeg?sha=2e0db900c07e4114',
        isEnabled: 0,
        originPrice: '2399',
        price: '1999',
        unit: 'NT$'
      },
    ],
    //防呆 製作一個空物件 來暫存資料 避免直接更改到真資料
    tempProduct: {}
  },
  methods: {

    //從@clik傳值  判斷是哪個視窗 打開彈跳視窗
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {};
        $('#productModal').modal('show');
        // console.log(status, item);
      } 
      else if (status === 'edit') {
        this.tempProduct = Object.assign({}, item);//將抓取的陣列item傳入並 淺層複製 到tempProduct[]
        $('#productModal').modal('show');
        // console.log(status, item);
        // console.log(this.tempProduct);
      } 
      else if(status === 'delete'){
        this.tempProduct = Object.assign({}, item);//將抓取的陣列item傳入並 淺層複製 到tempProduct[]
        $('#delProductModal').modal('show');
        // console.log(status, item);
      }
    },
    
    // 建立 / 修改產品
    updateProduct() {
      //判斷如果有id ==>修改產品
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          // console.log(item,i); //印出目前有的產品
          if (item.id === id) { //判斷 當暫存id = 原始資料的id
            //更新原始資料

            //方法一：如果用這方法 不一定會將值 完整寫入
            //this.products[i] = this.tempProduct; 

            // －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

            //方法二：強制更新寫入方式  this.$set(目標, 屬性 ,值)
            this.$set(this.products, i , this.tempProduct );
            //2個又是同一個物件 因此又指向相同參考位置 所以設定{}指向去另一個空物件
            this.tempProduct = {}; 
          }
        });
      //判斷如果沒有id ==>建立新產品
      } 
      else { 
        const id = new Date().getTime(); //讓產品id的值，為唯一
        this.tempProduct.id = id;
        this.products.push(this.tempProduct); //建立新產品塞進this.tempProduct物件中
        //查看新增後 物件內資料
        // console.log(this.products);
      }

      this.tempProduct = {};
      $('#productModal').modal('hide');
    },

    //刪除商品
    delProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) { //當為此產品id時 (為了刪除對應產品)
            this.products.splice(i, 1);
            this.tempProduct = {};
          }
          //  console.log(this.tempProduct.id);   
        });
      }
      $('#delProductModal').modal('hide');
    },
  },
})




