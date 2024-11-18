<script>
  import { PUBLIC_UMAMI_ID, PUBLIC_UMAMI_URL } from '$env/static/public';
</script>

<svelte:head>
  <script defer src={PUBLIC_UMAMI_URL} data-website-id={PUBLIC_UMAMI_ID}></script>
</svelte:head>

<slot />

<style>
  :root {
    color: #eee;
    background-color: #151522;
  }
</style>
