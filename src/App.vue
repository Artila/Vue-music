<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
    和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
	import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

	export default {
		components: {
			MHeader,
      Tab
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	#app
		color: $color-theme
</style>
