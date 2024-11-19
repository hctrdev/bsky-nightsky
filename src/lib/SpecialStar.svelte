<script lang="ts">
  export let textSize;

  const x = Math.random() * 100;
  const y = Math.random() * 60;
  const size = Math.max(Math.max(1, Math.floor(textSize / 10)), 10);
</script>

<div class="star" style="left: {x}%; top: {y}%; width: {size}px; height: {size}px;"></div>

<style>
  .star {
    position: fixed;
    background-color: #e2db7e;
    border-radius: 50px;
    box-shadow: 0 0 15px 1px #e2db7ec0;
  }
</style>
