<template>
  <div>
    <a href="javacript:;" class="more-btn" @click="showBtn">
      M
      <transition name="fade">
        <router-link to="/" class="btn1 back-btn" v-if="show_btn" >B</router-link>
      </transition>
      <transition name="fade">
        <a href="javascript:;" class="btn1 save-btn" v-if="show_btn" @click="comAddText(nowtext)" >S</a>
      </transition>
      <transition name="fade">
        <a href="javascript:;" class="btn1 delete-btn" v-if="show_btn&&id!=0" @click="comDelText" >D</a>
      </transition>
    </a>
    <textarea id="textarea" class="textarea" cols="30" rows="10" v-model="nowtext.text" @click="hideBtn"></textarea>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    props: ['id'],
    methods: {
      ...mapMutations([
        'addText', 'getText' // 注入mutations
      ]),
      ...mapActions([
        'getTestAction', 'addTestAction', 'getTestListAtion', 'delTestAction' // 注入action
      ]),
      comAddText: function (text) {
        console.log(text)
        this.addTestAction(text)
        // this.text = {
        //   text: ''
        // }
      },
      comDelText: function () {
        console.log(this.id)
        this.delTestAction(this.id)
        this.$router.push({'name': 'textList'})
        // this.text = {
        //   text: ''
        // }
      },
      showBtn: function () {
        this.show_btn = !this.show_btn
      },
      hideBtn: function () {
        this.show_btn = false
      }
    },
    created: function () { // 创建后
      // 在created中调用Action获取数据
      this.getTestListAtion()
      this.getTestAction(this.id)
    },
    mounted: function () { // 载入后
      var textarea = document.getElementById('textarea')
      textarea.style.height = window.innerHeight - 58 + 'px'
      console.log()
    },
    store,
    computed: {
      ...mapState([ 'textlist', 'nowtext' ]) // 注入store的state.count
      // ...mapGetters([ 'count' ]) // 使用store的getters
    },
    data () {
      return {
        msg: 'Hello Vuex',
        // text: nowtext, // 保存当前页面的文本
        show_btn: false
      }
    }
  }
</script>

<style scoped>
  @import url('../assets/css/main.css');
  .textarea{ width: 100%; display: block;
   background: #fff; border: 1px solid #ccc; resize: none;
   box-sizing: border-box; outline: none;font-size: 12px; color: #333;padding: 22px;
  }
  ul li{ margin-bottom: 12px; }
  .more-btn { display: block;position: fixed; bottom: 5%; left: 5%; text-decoration: none; font-size: 24px; color: #4fc08d; background: #fff;
    width:40px; height: 40px; border-radius: 50%;line-height: 38px; text-align: center;border: 1px solid #4fc08d;box-sizing: border-box;
  }
  .back-btn{ display: block; position: absolute; top: -52px; left: 0;}
  .save-btn { display: block; position: absolute; top: -52px; left: 52px;  }
  .delete-btn { display: block; position: absolute; top: 0; left: 52px;background: rgb(235, 144, 144) }
</style>

