<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a
        :class="{ 'layui-this': state.status === '' && state.tag === '' }"
        @click.prevent="search()"
        >综合</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': state.status === '0' }"
        @click.prevent="search(0)"
        >未结</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': state.status === '1' }"
        @click.prevent="search(1)"
        >已结</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': state.status === '' && state.tag === '精华' }"
        @click.prevent="search(2)"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a
          :class="{ 'layui-this': state.sort === 'created' }"
          @click.prevent="search(3)"
          >按最新</a
        >
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': state.sort === 'answer' }"
          @click.prevent="search(4)"
          >按热议</a
        >
      </span>
    </div>
    <!-- <list-item :lists="lists" :isEnd="isEnd" @nextpage="nextPage()"></list-item> -->
  </div>
</template>

<script lang="ts">
// import ListItem from './ListItem'
// import listMix from '@/mixin/list'
import { getList } from '@/api/content'
import { defineComponent, onMounted, reactive, watch } from 'vue'
import router from '@/router'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { HttpResponse } from '@/common/interface'
export default defineComponent({
  name: 'list',
  setup () {
    const state = reactive({
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      isTop: 0,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      lists: [
      ]
    })

    const search = (val: number | null) => {
      console.log('search -> val', val)
    }

    const route = useRoute()
    const catalog = route?.params?.catalog as string
    if (typeof catalog !== 'undefined' && catalog !== '') {
      state.catalog = catalog
    }

    const handleGetList = async () => {
      if (state.isRepeat) return
      if (state.isEnd) return
      state.isRepeat = true
      const options = {
        catalog: state.catalog,
        isTop: state.isTop,
        page: state.page,
        limit: state.limit,
        sort: state.sort,
        tag: state.tag,
        status: state.status
      }
      try {
        const res = await getList(options)
        const { code, data } = res as HttpResponse
        // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
        state.isRepeat = false
        // 对于异常的判断，res.code 非200，我们给用户一个提示
        // 判断是否lists长度为0，如果为零即可以直接赋值
        // 当Lists长度不为0，后面请求的数据，加入到Lists里面来
        if (code === 200) {
          // 判断res.data的长度，如果小于20条，则是最后页
          if (data.length < state.limit) {
            state.isEnd = true
          }
          if (state.lists.length === 0) {
            state.lists = res.data
          } else {
            state.lists = state.lists.concat(data)
          }
          state.page++
        }
      } catch (error) {
        state.isRepeat = false
        if (error) {
          // this.$alert(err.message)
        }
      }
    }

    const init = () => {
      state.page = 0
      state.lists = []
      state.isEnd = false
      handleGetList()
    }

    const nextPage = () => {
      handleGetList()
    }

    // fetch the user information when params change
    // watch(
    //   () => route.params,
    //   () => {
    //     init()
    //   }
    // )

    // same as beforeRouteUpdate option with no access to `this`
    onBeforeRouteUpdate(async () => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      init()
    })

    onMounted(() => {
      handleGetList()
    })
    return {
      state,
      search
    }
  }
})
// mixins: [listMix],
// data () {
//   return {
//     status: '',
//     tag: '',
//     sort: 'created',
//     page: 0,
//     limit: 20,
//     catalog: '',
//     isEnd: false,
//     isRepeat: false,
//     current: '',
//     lists: []
//   }
// },
// components: {
//   // ListItem
// },
// watch: {
//   current (newval, oldval) {
//     // 去兼听current标签是否有变化，如果有变化，则需要重新进行查询
//     this.init()
//   },
//   $route (newval, oldval) {
//     const catalog = this.$route.params.catalog
//     if (typeof catalog !== 'undefined' && catalog !== '') {
//       this.catalog = catalog
//     }
//     this.init()
//   }
// },
// methods: {
//   search (val) {
//     if (typeof val === 'undefined' && this.current === '') {
//       return
//     }
//     this.current = val
//     switch (val) {
//       // 未结贴
//       case 0:
//         this.status = '0'
//         this.tag = ''
//         break
//       // 已结贴
//       case 1:
//         this.status = '1'
//         this.tag = ''
//         break
//       // 查询"精华"标签
//       case 2:
//         this.status = ''
//         this.tag = '精华'
//         break
//       // 按照时间去查询
//       case 3:
//         this.sort = 'created'
//         break
//       // 按照评论数去查询
//       case 4:
//         this.sort = 'answer'
//         break
//       // 综合查询
//       default:
//         this.status = ''
//         this.tag = ''
//         this.current = ''
//     }
//   }
// }

</script>

<style lang="scss" scoped>
</style>
