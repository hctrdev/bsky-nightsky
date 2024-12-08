<script lang="ts">
  import { maxStarGenScreenPercent } from '$lib';

  export let textSize;
  export let url;

  const x = Math.random() * 100;
  const y = Math.random() * $maxStarGenScreenPercent;
  const size = Math.max(Math.max(1, Math.floor(textSize / 10)), 10);
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
    background-color: var(--special-star-colour);
    border-radius: 50px;
    box-shadow: var(--special-star-box-shadow);
  }
</style>
