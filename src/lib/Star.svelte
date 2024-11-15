<script lang="ts">
  export let textSize;

  const x = Math.random() * 100
  const y = Math.random() * 60
  // 300 characters becomes 15px
  const size = Math.max(1, Math.floor(textSize / 20))
</script>

<div class="star"
     style="left: {x}%; top: {y}%; width: {size}px; height: {size}px;">
</div>

<style>
  .star {
    position: fixed;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.6);
  }
</style>
