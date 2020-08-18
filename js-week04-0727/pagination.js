export default {
  // 步驟01-取用 pages.total_pages 去跑迴圈
  // 步驟02-將page-link  @click updatePage(num)
  // 步驟03- 將當前的頁碼 ＋ .active
  // :class="{ active: pages.current_page === idx }"
  template: 
  `<nav aria-label="Page navigation example">
    <ul class="pagination">

      <li class="page-item" :class="{disabled: pages.current_page === 1}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page - 1)">Previous</a>
      </li>

      <li class="page-item" v-for="idx in pages.total_pages" :key="idx" 
        :class="{ active: pages.current_page === idx }">

        <a class="page-link" href="#"
          @click.prevent="updatePage(idx)">{{ idx }}
        </a>

      </li>

      <li class="page-item" :class="{disabled: pages.current_page === pages.total_pages}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page + 1)">Next</a>
      </li>

    </ul>
  </nav>
  `,
  // 內層的元件  所有的 data 都必須用 function return
  data() {
    return {
      // tempProduct: {},
    };
  },
  //前內後外
  props: ['pages'],
  methods: {
    updatePage(num) {
      console.log(num);
      this.$emit('update', num);
    },
  },
};


