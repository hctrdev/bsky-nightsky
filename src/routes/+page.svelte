<script lang="ts">
  import { onMount } from 'svelte';
  import { getProfile } from '$lib/bskyProfile';
  import { stream } from '$lib/bskyStream';
  import { postFilter, type PostData } from '$lib/postFilter';
  import SpecialStar from '$lib/SpecialStar.svelte';
  import Star from '$lib/Star.svelte';

  const urlParams = new URLSearchParams(window.location.search);
  const userHandle = urlParams.get('u');

  type StarData = {
    id: string;
    size: number;
  };

  let stars: StarData[] = [];
  let specialStars: StarData[] = [];
  let specialDid: string;

  const maxStarsAtOnce = 150;
  const addStar = (data: PostData) => {
    if (stars.length >= maxStarsAtOnce) {
      stars = stars.slice(1);
    }
    const star = {
      id: data.postId,
      size: data.postText.length,
    };
    if (data.userDid === specialDid) {
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
        specialDid = profile?.did ?? '';
      });
    }
  });
</script>

{#each stars as star (star.id)}
  <Star textSize={star.size} />
{/each}
{#each specialStars as star (star.id)}
  <SpecialStar textSize={star.size} />
{/each}

<div>
  <img src="/mountains.svg" alt="bg" />
</div>

<div class="text-area">
  <h1>Nightsky</h1>
  <a href="/about">what is this?</a>
</div>

<style>
  :root {
    height: 100vh;
  }

  img {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 350%;
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
    text-decoration: underline;
    color: #c8a6cc;
  }

  .text-area a:hover {
    color: #eee;
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
      color: #a497c2;
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
