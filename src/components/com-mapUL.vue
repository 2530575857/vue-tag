<template lang="html">
   <ul>
     <li v-for='(itam,index) in list'>
       <p @click ='changeScoped(index)'>{{itam.name}}</p>
       <com-mapUL :list='itam.cList' v-if ='scopeDefault[index]'/>
     </li>
   </ul>
</template>

<script >
export default {
  name: 'com-mapUL',
  props: {
    'list': {
      'type': Array,
      default () {
        return [];
      }
    }
  },
  data() {
    return {
      scopeDefault: [],
      scopes: []
    }
  },
  methods: {
    changeScoped(index){
      if (this.scopeDefault[index]) {
        this.$set(this.scopeDefault, index, false);
      } else {
        this.$set(this.scopeDefault, index, this.scopes[index]);
      }
    },
    scope() {
      this.list.forEach((itam, index) => {
        console.log(itam);
        this.scopeDefault[index] = false;
        if ('cList' in itam) {
          this.scopes[index] = true;
        } else {
          this.scopes[index] = false;
        }
      })
      console.log(this.scopeDefault);
      console.log(this.scopes);
    }
  },
  created() {
    this.scope()
  }
}
</script>

<style lang="css" scoped>
ul{
  margin: 0;
  padding: 0;
  margin-top: 5px;
}
  li{
    margin-left: 10px;
    margin-top: 5px;
    padding: 5px;
    list-style: none;
    background:#ccc
  }
  .animLI-enter,.animLI-leave-to{
    opacity:0;
  }
  .animLI-enter-active,.animLI-leave-active{
    transition:all 2s;
  }
</style>
