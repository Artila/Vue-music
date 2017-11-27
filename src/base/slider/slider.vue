<template>
  <div class="slider" ref = "slider">
    <div class="slider-group" ref = "sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height:1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
</style>
