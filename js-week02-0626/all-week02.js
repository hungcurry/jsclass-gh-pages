window.onload = function () {
    const obj = {
        data: {
            uuid: 'feec8521-8cf5-41e0-aa0d-3bac8c6c6213', //請填入自己的 UUID
            apiPath: 'https://course-ec-api.hexschool.io', //固定路徑
            products: [],
        },
        //getData
        getData: function () {
            const vm = this;
            const url = `https://course-ec-api.hexschool.io/api/${vm.data.uuid}/ec/products`;
            console.log(url);
            //axios
            axios.get(url)
                //成功
                .then(function (res) {
                    vm.data.products = res.data.data;
                    vm.render();
                }).catch(function (err) {//失敗
                    console.log('資料錯誤', err)
                });
        },
        //畫面渲染
        render: function () {
            const vm = this;
            const list = document.getElementById('list');
            const products = vm.data.products;
            let str = '';
            products.forEach(item => {
                str += `
            <div class="card-flex">
            <div class="img-box item-img">
                <img src="${ item.imageUrl[0] }" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title ls-1 font-weight-bold">${ item.title }</h5>
                <p class="card-text">${ item.content }</p>
            </div>
            <div class="d-flex justify-content-center">
                <div class="text-right pr-3 origin-price-f price-m-b">
                    NT ${item.origin_price} 元
                </div>
                <div class="text-right pr-3 price-color">
                    NT ${item.price} 元
                </div>
            </div>
            <div class="card-footer border-top-0 bg-white btn-flex">
                <button class="btn ls-1 btn-shopping btn-sm">
                加到購物車
                </button>
            </div>
            </div>`;
            });
            list.innerHTML = str;
        }
    };
    obj.getData();
}





