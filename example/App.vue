<template>
  <div>
    <nocaptcha
      :aeis="true"
      :appkey="'FFFF00000000016AB730'"
      :scene="'test'"
      :lang="'ar-ae'"
      @load="load"
      @callback="callback"
    />
    {{ loaded }}
    {{ capData }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      loaded: false,
      capData: undefined
    }
  },
  methods: {
    load () {
      this.loaded = true
    },
    callback (e) {
      this.capData = e
    }
  }
}
</script>
