<template>
  <div class="recommend">
  	<div class="slider-wrapper">
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
			_getRecommend() {
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
	.recommend
		position: fixed
		width: 100%
		top: 88px
		bottom: 0

</style>
