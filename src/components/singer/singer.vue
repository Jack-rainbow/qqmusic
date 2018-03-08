<template>
  <div class="singer" ref="singer">
    <list-view @my-event="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>


<script>
  import ListView from 'base/listview/listview'
  import {GetSingerListCallback} from 'api/singger'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
	import {mapMutations} from 'vuex'


  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      selectSinger(singe) {
      	//编程式导航
       this.$router.push({ path:`/singer/${singe.id}`}),
       this.setsinger(singe)
      },
      _getSingerList() {
        GetSingerListCallback().then((res) => {
          if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
      	/*使用mutations，就去mutations中去找常量和变量，
      	 * 而mutations中对应的是mutations-types中的变量和常量*/
      	setsinger:'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
