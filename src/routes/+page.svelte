<script lang="ts">
  import { stream, type JetstreamCommitData, type RawJetstreamMessage } from '$lib/bsky';
  import Star from '$lib/Star.svelte';
  import { onMount } from 'svelte';

  type StarData = {
    id: string;
    size: number;
  };

  let stars: StarData[] = [];

  const handler = (event: RawJetstreamMessage) => {
    if (!event.data) {
      return;
    }
    if (!event.data.includes('app.bsky.feed.post')) {
      return;
    }
    const json: JetstreamCommitData = JSON.parse(event.data);
    if (!json.commit || !json.commit.record) {
      return;
    }
    if (json.commit.record.$type !== 'app.bsky.feed.post') {
      return;
    }
    if (!json.commit.record.text) {
      return;
    }

    const text = json.commit.record.text;
    const id = json.commit.cid;
    addStar(id, text.length);
  };

  const maxStarsAtOnce = 150;
  const addStar = (id: string, size: number) => {
    if (stars.length >= maxStarsAtOnce) {
      stars = stars.slice(1);
    }
    const star = {
      id: id,
      size: size,
    };
    stars = [...stars, star];
  };

  onMount(() => {
    stream.disconnect();
    stream.connect(handler);
  });
</script>

{#each stars as star (star.id)}
  <Star textSize={star.size} />
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
