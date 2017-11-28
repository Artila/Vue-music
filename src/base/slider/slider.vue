<template>
  <div class="slider" ref = "slider">
    <div class="slider-group" ref = "sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class = "{ active: currentPageIndex == index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: { // 是否循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: { // 自动轮播
        type: Boolean,
        default: true
      },
      interval: { // 循环时间
        type: Number,
        default: 4000
      }
    },
    mounted() {
      this.$nextTick(() => {
        // 初始化操作
        // 横向滚动，初始化获取宽度
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      })
//      vue 有更好的解决DOM渲染问题
//      setTimeout(() => {
//        // 浏览器17ms刷新一次
//      }, 20)
      console.log('4')
      // 窗口大小改变时
      window.addEventListener('resize', () => {
        if (!this.slider) { // 还没渲染
          return
        }

        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    activated() {
      // keep-alive 组件激活时调用。
      if (this.autoPlay) {
        this._play()
      }
      console.log('1')
    },
    deactivated() {
      // keep-alive 组件停用时调用。
      clearTimeout(this.timer)
      console.log('2')
    },
    beforeDestory() {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
      clearTimeout(this.timer)
      console.log('3')
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')   // 渲染样式

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // 循环，左右多出一个位置；改变窗口大小时，不用又加
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,       // 滑动方向为X轴
          scrollY: false,      // 滑动方向为Y轴
          momentum: false,     // 当快速滑动时是否开启滑动惯性
          snap: true,          // 该属性是给slider组件使用的，普通的列表滚动不需要配置
          snapLoop: this.loop, // 是否可以无缝循环轮播
          snapThreshold: 0.3,  // 用手指滑动时页面可以切换的阈值，大于这个阈值可以滑动到下一页
          snapSpeed: 400       // 轮播图切换的动画时间
        })

        // scrollEnd：滚动结束
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX

          if (this.loop) {
            pageIndex -= 1
          }

          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            this._play()
          }
        })

        // beforeScrollStart: 滚动开始之前。
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1

        if (this.loop) {
          pageIndex += 1
        }

        this.timer = setTimeout(() => {
          // goToPage(x, y, time, easing) 横轴的页数,纵轴的页数,动画执行的时间,缓动函数，一般不建议修改
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
