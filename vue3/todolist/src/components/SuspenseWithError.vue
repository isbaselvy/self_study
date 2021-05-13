<template>
<div>
  <slot v-if="error" name="error" :err="error">
    {{error}}
  </slot>
  <Suspense v-else>
    <template #default>
      <!-- 异步组件，当setup方法中的异步方法执行完后展示 -->
      <slot name="default"></slot>
    </template>
    <template #fallback>
      <!-- 默认加载的内容，比如loading或者图标 -->
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</div>

</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue'

export default defineComponent({
  name: 'SuspenseWithError',
  setup () {
    const error = ref('')
    onErrorCaptured(err => {
      error.value = err as string
      return true
    })
    return {
      error
    }
  }
})
</script>
