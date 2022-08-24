<template>
  <div style="width: fit-content;">
    <navbar />
    <nuxt />
  </div>
</template>
<style>
body {
  font-size: 0.75rem !important;
}
</style>
<script>
import navbar from '@/components/navbar'
export default {
  components: {
    navbar
  }
}
</script>