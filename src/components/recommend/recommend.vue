<template>
  <div class="recommend">
  	<div v-if="recommends.length" class="slider-wrapper">
      <slider>
        <div v-for = "item in recommends">
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
  	<div class="recommend-list">
  		<h1 class="list-title">热门歌单推荐</h1>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
	import {getRecommend} from 'api/recommend'
	import {ERR_OK} from 'api/config'

	export default {
    data() {
      return {
        recommends: []
      }
    },
		created() {
			this._getRecommend()
		},
		methods: {
			_getRecommend() { // 异步操作，渲染时可能数据还没获得，所以在渲染前要判断数据是否获得
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.data.slider
					}
				})
			}
		},
    components: {
      Slider
    }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

	.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-style: $font-size-medium
        color: $color-theme
</style>
