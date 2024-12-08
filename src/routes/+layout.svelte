<script lang="ts">
  import { PUBLIC_UMAMI_ID, PUBLIC_UMAMI_URL } from '$env/static/public';
  import { onMount } from 'svelte';
  import { getProfile } from '$lib/bskyProfile';
  import { stream } from '$lib/bskyStream';
  import { postFilter, type PostData } from '$lib/postFilter';
  import SpecialStar from '$lib/SpecialStar.svelte';
  import Star from '$lib/Star.svelte';
  import { specialProfile } from '$lib';

  const urlParams = new URLSearchParams(window.location.search);
  const userHandle = urlParams.get('u');

  type StarData = {
    id: string;
    size: number;
    url: string;
  };

  let stars: StarData[] = [];
  let specialStars: StarData[] = [];

  const maxStarsAtOnce = 150;
  const addStar = (data: PostData) => {
    if (stars.length >= maxStarsAtOnce) {
      stars = stars.slice(1);
    }
    const url = `https://bsky.app/profile/${data.userDid}/post/${data.postKey}`;
    const star = {
      id: data.postId,
      size: data.postText.length,
      url: url,
    };
    if (data.userDid === $specialProfile.did) {
      specialStars = [...specialStars, star];
    } else {
      stars = [...stars, star];
    }
  };

  onMount(() => {
    stream.disconnect();
    stream.connect((e) => postFilter(e, addStar));

    if (userHandle) {
      getProfile(userHandle).then((profile) => {
        specialProfile.set(profile);
      });
    }
  });
</script>

<svelte:head>
  <script defer src={PUBLIC_UMAMI_URL} data-website-id={PUBLIC_UMAMI_ID}></script>
</svelte:head>

{#each stars as star (star.url)}
  <Star textSize={star.size} url={star.url} />
{/each}
{#each specialStars as star (star.url)}
  <SpecialStar textSize={star.size} url={star.url} />
{/each}

<slot />

<style>
  :root {
    --bg-colour: #151522;
    --text-colour: #eee;
    --highlight-colour: #c8a6cc;
    --star-colour: #fff;
    --star-box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.6);
    --special-star-colour: #e2db7e;
    --special-star-box-shadow: 0 0 15px 1px #e2db7ec0;

    color: var(--text-colour);
    background-color: var(--bg-colour);
  }
</style>
