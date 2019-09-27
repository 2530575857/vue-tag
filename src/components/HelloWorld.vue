<template>
  <div class="">
    <label>
      <input type="button" name="" value="提交" @click="getEmit">
    </label>
  </div>
</template>

<script>
import bus from '../components/common/eventBus.js'
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  methods:{
    getEmit(){
      window.bus.$emit('name','我是emit')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
