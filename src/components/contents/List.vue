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
    <list-item
      :lists="state.lists"
      :isEnd="state.isEnd"
      @nextpage="nextPage()"
    ></list-item>
  </div>
</template>

<script lang="ts">
import ListItem from './ListItem.vue'
// import listMix from '@/mixin/list'
import { getList } from '@/api/content'
import { defineComponent, onMounted, reactive, toRef, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { HttpResponse } from '@/common/interface'
export default defineComponent({
  name: 'list',
  components: {
    'list-item': ListItem
  },
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
          // state.$alert(err.message)
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

    // same as beforeRouteUpdate option with no access to `state`
    onBeforeRouteUpdate(async () => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      init()
    })

    onMounted(() => {
      handleGetList()
    })

    const current = toRef(state, 'current')
    watch(current, init)
    // watch(() => state.current, init)

    const search = (val: number | null) => {
      if (typeof val === 'undefined' && state.current === '') {
        return
      }
      state.current = val ? val + '' : ''
      switch (val) {
      // 未结贴
        case 0:
          state.status = '0'
          state.tag = ''
          break
          // 已结贴
        case 1:
          state.status = '1'
          state.tag = ''
          break
          // 查询"精华"标签
        case 2:
          state.status = ''
          state.tag = '精华'
          break
          // 按照时间去查询
        case 3:
          state.sort = 'created'
          break
          // 按照评论数去查询
        case 4:
          state.sort = 'answer'
          break
          // 综合查询
        default:
          state.status = ''
          state.tag = ''
          state.current = ''
      }
    }

    return {
      state,
      search,
      nextPage
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
