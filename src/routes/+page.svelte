<script lang="ts">
  import { maxStarGenScreenPercent, specialProfile } from '$lib';
  import { onMount } from 'svelte';

  onMount(() => {
    maxStarGenScreenPercent.set(60);
  });
</script>

<div>
  <img src="/mountains.svg" alt="bg" />
</div>

<div class="text-area">
  <h1>Nightsky</h1>
  <a href="/about">what is this?</a>
</div>

{#if $specialProfile}
  <div
    class="followed-user-section"
    title="Watching for posts by {$specialProfile.displayName} - these will be highlighted differently"
  >
    <p>{$specialProfile.displayName}</p>
    <a
      class="handle"
      href="https://bsky.app/profile/{$specialProfile.handle}"
      target="_blank"
      rel="nofollow"
    >
      @{$specialProfile.handle}
    </a>
  </div>
{/if}

<style>
  :root {
    height: 100vh;
  }

  img {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 350%;
    pointer-events: none;
  }

  a {
    color: var(--highlight-colour);
    text-decoration: underline;
  }

  a:hover {
    color: var(--text-colour) !important;
  }

  .text-area {
    position: fixed;
    left: 1.5vw;
    bottom: 1.5vh;
  }

  .text-area h1 {
    font-family: 'Jua', sans-serif;
    font-size: 3rem;
    margin: 0;
  }

  .text-area a {
    font-family: 'Jua', sans-serif;
    font-size: 1.25rem;
    margin-top: 10rem;
  }

  .followed-user-section {
    position: fixed;
    text-align: left;
    line-height: 0.3;
    font-size: 1.25em;
    font-family: 'Jua', sans-serif;
  }

  .followed-user-section .handle {
    font-size: 1em;
    font-family: monospace;
  }

  @media (min-width: 450px) {
    img {
      width: 200%;
    }
  }

  @media (min-width: 600px) {
    img {
      bottom: -5vh;
    }
    .text-area {
      left: 5vw;
      bottom: 5vh;
    }
    .text-area a {
      color: var(--highlight-colour);
    }
  }
  @media (min-width: 800px) {
    img {
      bottom: -7vh;
    }
  }
  @media (min-width: 1100px) {
    img {
      bottom: -10vh;
      width: 150%;
    }
  }
  @media (min-width: 1300px) {
    img {
      bottom: -10vh;
      width: 100%;
    }
  }
</style>
