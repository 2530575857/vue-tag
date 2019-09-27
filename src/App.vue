<template>
<div>
  <div class="1">
    {{buf1| fil-name}}
  </div>
  <label>
    {{inputbuf }}
    <input type="text" name="" value="" v-model='inputbuf'>
  </label>
  <input type="button" name="" value="变化BUF" @click="setbuf">
  <com-name />
  {{comLazy}}
  <com-input label='我是input' v-model.lazy='comLazy' placeholder='呜呜呜呜' :foo.sync='fooSync' @change='alert(22)' />

  <!-- <com-ul :ularr ='ularr'>
    <com-li slot='li1' slot-scope='arr'></com-li>
    <com-li />
    <com-li />
  </com-ul>
  <com-slot-ul :list='ularr'>
    <template slot='ul' slot-scope='list'>
      <li :style="{'color:#0f0':list.value=='手打'}">{{list.value}}</li>
    </template>
  </com-slot-ul> -->

  <com-mapUL :list='list' />
  <com-div />

  <div id="byid">
    111111
  </div>

  <a href="#">我是a标签</a>
  <input type="text" name="" value="" class="disabled" disabled>
  <!-- <input type="radio" name="" value=""> -->
  <label v-for='str in arrCheckbox'>
    {{str}}
    <input type="checkbox" name="" value="str">
  </label>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>

  <div class="opacity_before" v-text="buf" v-html="html" v-on:click.once='getAlert' v-bind:class='[textcolor]'>
    我是div
  </div>
  <!-- <router-view></router-view> -->
  <HelloWorld />
  <com-shou />
  <div class="">
    {{buf+'1'}} /n
    {{buf?"我是true":"我是false"}}
    {{arr.join("/")}}
    {{a}}
    {{b}}
  </div>
  <div class="" v-if='a'>
    if
  </div>
  <div class="" v-else>
    替补
  </div>

  <!-- 过度效果 -->
  <transition name="shou">
    <p v-if='animate' id='anima'>我是过度动画</p>
  </transition>
  <input type="button" name="" value="点击改变" @click='animate=!animate'>
  <syncBUttom v-bind:syncp.sync='buf1' />

  <input type="checkbox" name="checkbox" value="1">
  <input type="checkbox" checked name="checkbox" value="2" disabled>
  <input type="radio" name="" value="">
  <select class="" name="">
    <option value="">1</option>
    <option value="" selected>2</option>
  </select>

  <ul id="ulChild">
    <li>1</li>
    <p>2</p>
    <li>3</li>
    <p>4</p>
  </ul>
</div>
</template>

<script>
import bus from './components/common/eventBus.js'
import comMapUL from './components/com-mapUL'
export default {
  name: 'App',
  data() {
    return {
      buf: "我是数据",
      buf1: "我是数据",
      html: "<div>我是div</div>",
      inputbuf: "111",
      arr: [1, 2, 3, 5],
      textcolor: 'textcolor',
      a: false,
      arrCheckbox: ['1', '2', '3', '4'],
      comLazy: '我是数据',
      fooSync: 'fooSync',
      ularr: ['手打', '敖德萨所', '大声道', '大时代感'],
      animate: true,
      list: [{
        name: '黄焖鸡米饭111111111',
        cList: [{
            name: '二级黄焖鸡'
          },
          {
            name: 'one chicken',
            cList: [{
              name: '三级黄焖鸡3333',
              cList: [{
                name: '四级黄焖鸡'
              }]
            }]
          }
        ]
      }],
    }
  },
  methods: {
    setbuf() {
      this.buf = '我是数据1'
    },
    getAlert() {
      alert("抱歉我只会出发一次")
    }
  },
  computed: {
    buf1() {
      return this.buf + this.inputbuf
    },
    a() {
      return this.buf + this.inputbuf
    },
    b: {
      get() {
        return 'getb'
      },
      set() {
        return '不能修改'
      }
    }
  },
  created() {
    var arr = {
      a: 1,
      b: 2
    };
    var arr2 = {
      b: 3,
      c: 4
    };
    var arr3 = Object.assign({}, arr, arr2)
    console.log(arr3)
    console.log(arr);
  },
  mounted() {
    //   console.log(this);
    document.querySelector('#anima').addEventListener('animationend', function() {
      alert('动画完成')
    })
    confirm("111")
  },
  beforeUpdate() {
    console.log(this.inputbuf)
  },
  components: {
    'com-shou': {
      template: `<a>111</a>`
    },
    'com-input': {
      inheritAttrs: false,
      props: {
        label: String,
        value: String,
        foo: String,
      },
      computed: {
        inputListeners() {
          let vm = this;
          return Object.assign({},
            this.$listeners, {
              input(event) {
                vm.$emit('input', event.target.value)
                vm.$emit('update:foo', 'foo改变了')
              },

            }
          )
        }
      },
      template: `
      <label>
        {{label}}
        {{foo}}
        <input type="text"
        v-bind='$attrs'
        :value='value'
        v-on='inputListeners'
        >
      </label>
      `
    },
    'syncBUttom': {
      props: ['syncp'],
      methods: {

      },
      template: `
      <div>
        <p>{{syncp}}</p>
        <input type='button' value="点击改变内容" v-on:click='$emit("update:syncp","我是改变的数据")' />
      </div>
      `
    },
    'com-ul': {
      props: ['ularr'],
      template: `
      <ul>
        <slot name="li1" :arr='ularr'>没有element1</slot>
        <slot>没有element2</slot>
      </ul>
      `
    },
    'com-li': {
      // props:[arr],
      template: `
        <li>111</li>
      `
    },
    'com-slot-ul': {
      props: ['list'],
      template: `
        <ul>
        <slot name='ul' v-for="value in list" :value=value>{{value}}</slot>

        </ul>
      `
    },
    'com-mapUL': comMapUL,
  }
}
</script>
<style scoped>
#byid:hover {
  background: #f00;
}

a:link {
  color: #00f;

}

a:visited {
  color: #0f0;
}

a:hover {
  color: #f00;
}

a:active {
  color: #ccc
}

.disabled:disabled {
  background: #f00
}

input:checked {
  margin: 10px
}

ul li:first-child {
  color: #f00
}

ul li:last-child {
  color: #0f0
}

ul li:nth-child(2) {
  color: #ccc
}

ul li:nth-last-child(2) {
  color: #ccc;
}

ul li:nth-of-type(3) {
  color: #ff0
}

.opacity_before {
  width: calc(100% - 10px);
  height: 15vh;
  border-radius: 10px;
  background: #ccc;
  text-align: center;
  line-height: 15vh;
  position: relative;
}

.opacity_before::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  transition: all .5s;
}

.opacity_before:hover:before {
  opacity: 1;
}

.textcolor {
  color: #f00
}

/* 动画 */
/* .shou-enter-active,.shou-leave-active{
  transition: opacity 5s;
} */
.shou-enter,
.shou-leave-to {
  opacity: 0;
  display: inline-block;
}

.shou-enter-active {
  animation: boance 5s
}

.shou-leave-active {
  animation: boance 5s reverse
}

@keyframes boance {
  0% {
    transform: scale(0);
    opacity: 0
  }

  50% {
    transform: scale(1.5);
    opacity: .5
  }

  100% {
    transform: scale(1);
    opacity: 1
  }
}

@keyframes tran-p {}
  #ulChild li:first-child{
    color:#f00;
  }
  #ulChild li:last-child{
    color:#0f0;
  }
</style>
