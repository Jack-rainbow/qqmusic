<template>
  <div id="app">
    <j-yheader></j-yheader>
    <tab></tab>

    <!--keep-alive可以使内容一直保存在内存中-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
	import Player from 'components/player/player'
  import JYheader from 'components/header/header'
  import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components:{
    JYheader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "common/stylus/variable"
      #app
        color $color-theme

</style>
