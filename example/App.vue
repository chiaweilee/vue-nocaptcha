<template>
  <div>
    <nocaptcha
      https
      aeis
      :appkey="{
        pc: 'FFFF00000000016AB730',
        h5: 'FFFF00000000016AB730'
      }"
      :scene="'test'"
      :lang="'en'"
      @load="load"
      @error="err"
      @callback="callback"
    />
    <div>Status: {{ loaded }}</div>
    <div>Callback: {{ !!capData }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loaded: 'not load',
      capData: undefined
    }
  },
  methods: {
    load () {
      this.loaded = 'loaded'
    },
    err () {
      this.loaded = 'error'
    },
    callback (e) {
      console.log(e)
      this.loaded = 'verified'
      this.capData = e
    }
  }
}
</script>
