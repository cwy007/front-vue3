import { getCode, login, reg } from '@/api/login'
import { HttpResponse } from '@/common/interface'
import { v4 as uuidv4 } from 'uuid'
import store from '@/store'
import router from '@/router'
import { reactive } from 'vue'

export const loginService = () => {
  let sid = ''

  const state = reactive({
    username: '',
    name: '',
    password: '',
    repassword: '',
    code: '',
    svg: ''
  })

  const getCaptcha = async () => {
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid') || ''
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    store.commit('setSid', sid)
    const { data, code } = await getCode(sid) as HttpResponse
    if (code === 200) {
      state.svg = data
    }
  }

  const loginHandle = async () => {
    const res = await login({
      username: state.username,
      password: state.password,
      code: state.code,
      sid: sid
    })

    const { code, data, token } = res as HttpResponse
    if (code === 200) {
      // 存储用户的登录名
      data.username = state.username
      store.commit('setUserInfo', data)
      store.commit('setIsLogin', true)
      store.commit('setToken', token)
      state.username = ''
      state.password = ''
      state.code = ''
      // router.push({ name: 'home' })
    }
    return res
  }

  const regHandle = async () => {
    const res = await reg({
      username: state.username,
      password: state.password,
      name: state.name,
      code: state.code,
      sid: sid
    })

    const { code } = res as HttpResponse
    if (code === 200) {
      state.username = ''
      state.password = ''
      state.repassword = ''
      state.name = ''
      state.code = ''
      // router.push({ name: 'home' })
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
    return res
  }

  return {
    state,
    getCaptcha,
    loginHandle,
    regHandle
  }
}
