<script lang="ts">
	import { stream } from "$lib/bsky";
	import Star from "$lib/Star.svelte";
	import { onMount } from "svelte";

  type StarData = {
    id: string
    size: number
  }

  let stars: StarData[] = [];

  const handler = (event: any) => {
    if (!event.data) {
      return
    }
    if (!event.data.includes("app.bsky.feed.post")) {
      return
    }
    const json = JSON.parse(event.data)
    if (!json.commit || !json.commit.record) {
      return
    }
    if (json.commit.record.$type !== "app.bsky.feed.post") {
      return
    }
    if (!json.commit.record.text) {
      return
    }

    const text = json.commit.record.text
    const id = json.commit.cid
    addStar(id, text.length)
  }

  const maxStarsAtOnce = 150
  const addStar = (id: string, size: number) => {
    if (stars.length >= maxStarsAtOnce) {
      stars = stars.slice(1)
    }
    const star = {
      id: id,
      size: size,
    }
    stars = [...stars, star]
  }

  onMount(() => {
    stream.connect(handler);
  })
</script>

{#each stars as star (star.id) }
  <Star textSize={star.size} />
{/each}

<div>
  <img src="/mountains.svg" alt="bg" />
</div>

<h1>
  nightsky
</h1>

<style>
:root {
  height: 100vh;
  color: #eee;
  background-color: #223;
}

img {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 200%;
}

h1 {
  text-align: center;
  font-family: "monospace";
  position: fixed;
  left: 2vw;
  bottom: 2vh;
}

@media (min-width: 600px) {
  img {
    bottom: -5vh;
  }
  h1 {
    left: 5vw;
    bottom: 5vh;
  }
}
@media (min-width: 800px) {
  img {
    bottom: -7vh;
  }
}
@media (min-width: 900px) {
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
