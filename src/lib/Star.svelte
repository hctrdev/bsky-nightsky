<script lang="ts">
  import { maxStarGenScreenPercent } from '$lib';

  export let textSize;
  export let url;

  const x = Math.random() * 100;
  const y = Math.random() * $maxStarGenScreenPercent;
  // 300 characters becomes 15px
  const size = Math.max(1, Math.floor(textSize / 20));
</script>

<a
  class="star"
  style="left: {x}%; top: {y}%; width: {size}px; height: {size}px;"
  target="_blank"
  rel="nofollow"
  href={url}
  aria-label="star"
>
</a>

<style>
  .star {
    position: fixed;
    background-color: var(--star-colour);
    border-radius: 10px;
    box-shadow: var(--star-box-shadow);
  }
</style>
