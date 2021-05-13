<template>
<div>
  <div v-if="error">
    {{error}}
  </div>
   <Suspense v-else>
    <template #default>
      <User />
    </template>
    <template #fallback>
      loading
    </template>
  </Suspense>
  <SuspenseWithError>
    <template #error="{ err }">
      {{err}}
    </template>
    <template #default>
      <User />
    </template>
    <template #fallback>
      loading
    </template>
  </SuspenseWithError>
</div>

</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue'
import User from '@/components/User.vue'
import SuspenseWithError from '@/components/SuspenseWithError.vue'

export default defineComponent({
  name: 'APP',
  components: {
    User,
    SuspenseWithError
  },
  setup () {
    const error = ref('')
    onErrorCaptured(err => {
      error.value = err as string
      return true
    })
    console.log(11111111111, error)
    return {
      error
    }
  }
})
</script>
