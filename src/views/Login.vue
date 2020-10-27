<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <div class="layui-tab layui-tab-brief"
           lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content"
             id="LAY_ucm"
             style="padding: 20px 0;">
          <Form @submit="submit"
                v-slot="{ errors }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <div class="layui-form-item">
                  <label for="L_email"
                         class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <Field type="text"
                           as="input"
                           name="username"
                           rules="required|email"
                           v-model="state.username"
                           placeholder="请输入用户名"
                           autocomplete="off"
                           class="layui-input" />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">
                      <span style="color: #c00">{{ errors.username }}</span>
                    </span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass"
                         class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <Field type="password"
                           as="input"
                           rules="required|min:6"
                           name="password"
                           v-model="state.password"
                           placeholder="请输入密码"
                           autocomplete="off"
                           class="layui-input" />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">
                      <span style="color: #c00">{{ errors.password }}</span>
                    </span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode"
                           class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <Field type="text"
                             as="input"
                             rules="required|length:4"
                             name="code"
                             v-model="state.code"
                             placeholder="请输入验证码"
                             autocomplete="off"
                             class="layui-input" />
                    </div>
                    <div class>
                      <span class="svg"
                            style="color: #c00;"
                            @click="getCaptcha()"
                            v-html="state.svg"></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">
                      <span style="color: #c00">{{ errors.code }}</span>
                    </span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn"
                          type="submit">立即登录</button>
                  <span style="padding-left:20px;">
                    <a :to="{name: 'forget'}">忘记密码？</a>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a href
                     onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                     class="iconfont icon-qq"
                     title="QQ登入"></a>
                  <a href
                     onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                     class="iconfont icon-weibo"
                     title="微博登入"></a>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Form, Field } from 'vee-validate'
import { defineComponent, onMounted } from 'vue'
import { loginUtils } from '@/utils/login'
import { HttpResponse, LoginInfo, SubmissionHandler } from '@/common/interface'

export default defineComponent({
  name: 'Login',
  components: {
    Form,
    Field
  },
  setup () {
    const { state, getCaptcha, loginHandle } = loginUtils()

    const submit: SubmissionHandler<LoginInfo> = async (value, { form }) => {
      const res = await loginHandle()
      const { setErrors, reset } = form
      const { code, msg } = res as HttpResponse
      if (code === 200) {
        requestAnimationFrame(() => {
          reset()
        })
      } else if (typeof msg === 'string') {
        setErrors({
          code: msg
        })
      }
    }
    // const submit = (value: LoginInfo, form: SubmissionContext<LoginInfo>) => {
    //   console.log('submit -> form', form)
    //   console.log('submit -> value', value)
    //   const { setErrors } = form.form
    //   setErrors({
    //     code: '图形验证码错误'
    //   })
    // }

    onMounted(async () => await getCaptcha())

    return {
      state,
      submit,
      getCaptcha
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
