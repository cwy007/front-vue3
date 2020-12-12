<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <Form ref="observer" v-slot="{ errors, validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <div class="layui-row">
                      <label for="L_email" class="layui-form-label">用户名</label>
                      <div class="layui-input-inline">
                        <Field as="input" type="text" name="username" v-model="state.username" placeholder="请输入用户名" autocomplete="off" class="layui-input" rules="required|email" />
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        将会成为您唯一的登入名
                      </div>
                    </div>
                    <div class="layui-row">
                      <span style="color: #c00">{{ errors.username }}</span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label">昵称</label>
                    <div class="layui-input-inline">
                      <Field as="input" type="text" name="name" v-model="state.name" placeholder="请输入昵称" autocomplete="off" class="layui-input" rules="required|min:4" />
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00">{{ errors.name }}</span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-row">
                      <label for="L_pass" class="layui-form-label">密码</label>
                      <div class="layui-input-inline">
                        <Field as="input" type="password" name="password" v-model="state.password" placeholder="请输入密码" autocomplete="off" class="layui-input" rules="required|min:6|max:16" />
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        6到16个字符
                      </div>
                    </div>
                    <div class="layui-row">
                      <span style="color: #c00">{{ errors.password }}</span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-row">
                      <label for="L_repass" class="layui-form-label">确认密码</label>
                      <div class="layui-input-inline">
                        <Field as="input" type="password" name="repassword" v-model="state.repassword" placeholder="请输入密码" autocomplete="off" class="layui-input" rules="confirmed:@password" />
                      </div>
                    </div>
                    <div class="layui-row">
                      <span style="color: #c00">{{ errors.repassword }}</span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-row">
                      <label for="L_vercode" class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <Field as="input" type="text" name="code" v-model="state.code" placeholder="请输入验证码" autocomplete="off" class="layui-input" rules="required|length:4" />
                      </div>
                      <div class>
                        <span class="svg" style="color: #c00" @click="getCaptcha()" v-html="state.svg"></span>
                      </div>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00">{{ errors.code }}</span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="button" @click="validate().then(regHandle)">
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a href onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                    <a href onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
                  </div>
                </form>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoginService } from '@/services/login'
import { Form, Field } from 'vee-validate'
import { defineComponent, onMounted } from 'vue'

const { state, regHandle, getCaptcha } = LoginService()

export default defineComponent({
  name: 'reg',
  setup () {
    onMounted(async () => await getCaptcha())
    return {
      state,
      regHandle,
      getCaptcha
    }
  },
  components: {
    Form, Field
  }
})
</script>
<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
