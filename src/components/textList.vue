<template>
  <div>
    <router-link to="/addtext/0" class="new-btn">+</router-link>
    <ul class="text-wrap">
      <li v-for="list in textlist" v-bind:key="list.id" class="text-item" @click="getTextLink(list.id)">
        <div class="item-wrap">
          {{ subText(list.text, 32) }}... 
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    methods: {
      ...mapMutations([
        'addText', 'getText' // 注入mutations
      ]),
      ...mapActions([
        'getTestAction', 'addTestAction', 'getTestListAtion' // 注入action
      ]),
      comAddText: function (text) {
        this.addTestAction(text)
        this.text = {
          text: ''
        }
      },
      subText: function (text, index) {
        if (text) {
          return text.substring(0, index)
        } else {
          return text
        }
      },
      getTextLink: function (id) {
        console.log(id)
        // this.getTestAction(id)
        this.$router.push({ name: 'addText', params: {id: id} })
      }
    },
    created: function () {
      // 在created中调用Action获取数据
      this.getTestListAtion()
    },
    data () {
      return {
        msg: 'Hello Vuex',
        text: {
          text: ''
        } // 保存当前页面的文本
      }
    },
    store,
    computed: {
      ...mapState([ 'textlist' ]) // 注入store的state.count
      // ...mapGetters([ 'count' ]) // 使用store的getters
    }
  }
</script>

<style scoped>
  @import url('../assets/css/main.css');
  .routerlink { width: 100%; height: 100%; color: #333;text-decoration: none; display: block; }
  textarea{ width: 50%; margin: 0 auto; display: block; height: 120px;
   background: #fff; border: 1px solid #ccc; resize: none;
  }
  ul li{ margin-bottom: 12px; list-style: none; height: 120px; }
  .new-btn {
  position: fixed;right: 5%;bottom: 5%;
  display: block; width: 40px; height: 40px;
  line-height: 40px; font-size: 26px; color: #fff;text-decoration: none;
  background: #4fc08d;border-radius: 50%; 
  }
  .text-wrap{ margin-top: 12px; }
  .item-wrap{ margin: 12px; overflow: hidden;  }
  .text-item{ float: left; width: 45.5%; height: 120px; margin-left: 3%; border: 1px solid #ccc; border-radius: 8px;
  background: #fff; font-size: 12px; color: #333;
  overflow: hidden;  }
</style>

