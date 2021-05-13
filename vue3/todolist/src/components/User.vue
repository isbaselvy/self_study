<template>
  <div>{{ msgRef }}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'User',
  async setup () {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('success!!!!')
      }, 2000)
    })

    const msg = await promise

    const msgRef = ref('')
    msgRef.value = msg
    return {
      msgRef
    }
  }
})
</script>
