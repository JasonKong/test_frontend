<template>
  <div id="layout">
    <div class="main-content">
      <div class="container mt-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: {
    msg: String,
  },
};
</script>
