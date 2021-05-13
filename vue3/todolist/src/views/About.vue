<template>
<div>
  <div v-if="error">
    {{error}}
  </div>
  <Suspense v-else>
    <template #default>
      <!-- 异步组件，当setup方法中的异步方法执行完后展示 -->
      <User />
    </template>
    <template #fallback>
      <!-- 默认加载的内容，比如loading或者图标 -->
      loading
    </template>
  </Suspense>
</div>

</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue'
import User from '@/components/User.vue'

export default defineComponent({
  component: [User],
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
