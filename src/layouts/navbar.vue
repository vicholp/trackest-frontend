<template>
  <nav />
</template>
<script>
export default {
  props: {
    authUser: {
      default: () => {},
      type: Object,
    },
  },
};
</script>
