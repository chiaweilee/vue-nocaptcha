<template>
  <div>
    <nocaptcha
      :aeis="true"
      :appkey="'FFFF00000000016AB730'"
      :scene="'test'"
      h5
      :h5scene="'test'"
      :lang="'ar-ae'"
      @load="load"
      @error="err"
      @callback="callback"
    />
    <nocaptcha
      :aeis="true"
      :appkey="'FFFF00000000016AB730'"
      :scene="'test'"
      :h5scene="'test'"
      :lang="'ar-ae'"
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
