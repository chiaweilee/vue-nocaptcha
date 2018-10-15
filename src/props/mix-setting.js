export default {
  type: [String, Object],
  validator (set) {
    return (typeof set === 'string' && set.length > 0) ||
      (
        typeof set === 'object' &&
        (
          (set.hasOwnProperty('pc') && set.pc.length > 0) ||
          (set.hasOwnProperty('h5') && set.h5.length > 0)
        )
      )
  },
  required: true
}
