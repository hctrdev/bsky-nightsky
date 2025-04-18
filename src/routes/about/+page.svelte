<script lang="ts">
  import { maxStarGenScreenPercent } from '$lib';
  import { onMount } from 'svelte';

  onMount(() => {
    maxStarGenScreenPercent.set(100);
  });
</script>

<article>
  <h1>Nightsky 🦋</h1>

  <hr />

  <p>
    This is a little project I did to explore part of the <a
      href="https://atproto.com/"
      target="_blank"
      rel="nofollow">AT Protocol</a
    >
    used by <a href="https://bsky.app/" target="_blank" rel="nofollow">Bluesky</a>.
  </p>

  <p>
    I wanted to build something simple, so I came up with the idea of a little tool to visualise how
    active the network is.
  </p>

  <p>
    The page connects to the <em
      ><a href="https://github.com/bluesky-social/jetstream" target="_blank" rel="nofollow"
        >Jetstream</a
      ></em
    >, a feed of all events across Bluesky, and displays a little star on the page for each new
    post. This results in a very visual representation of the network activity!
  </p>

  <p>If you are fast enough, you can click on a star to open the corresponding post.</p>

  <p>The longer the post, the bigger the star!</p>

  <p>
    Up to 150 stars can be shown at any given time. Once the limit is reached, the oldest star is
    removed. This leads to stars popping in and out of existence as new posts are added.
  </p>

  <p>
    If you get disconnected from the event stream for some reason, updates will stop appearing. The
    code will attempt to auto-reconnect, but if it doesn't work, try refreshing the page.
  </p>

  <p class="mt">You can also highlight your own posts!</p>
  <p>
    For example:
    <code>https://nightsky.hctr.dev?u=your_handle</code>
  </p>
  <p>
    This way your posts will show in a different colour and they won't disappear like the other
    posts.
  </p>

  <p class="mt">
    Made by <a href="https://bsky.app/profile/hctr.dev" target="_blank" rel="nofollow">@hctr.dev</a>
    | Code available
    <a href="https://gitlab.com/hctrdev/bsky-nightsky" target="_blank" rel="nofollow">on Gitlab</a>
  </p>

  <a href="/">back</a>
</article>

<style>
  article {
    border-radius: 10px;
    border: var(--highlight-colour) 2px solid;
    background-color: var(--bg-colour);
    position: relative;
    z-index: 100;
    display: block;
    max-width: 700px;
    padding: 5rem 1.5rem;
    margin: 2rem auto;
    color: var(--text-colour);
    font-size: 1.25em;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    font-weight: 600;
  }
  h1 {
    color: var(--text-colour);
    text-align: center;
    font-family: 'Jua', sans-serif;
    font-size: 3rem;
  }
  hr {
    border-color: var(--text-colour);
    margin: 5rem 0;
  }
  p {
    margin: 1.5rem 0;
  }
  a {
    color: var(--highlight-colour);
  }
  a:hover {
    color: var(--text-colour);
  }
  code {
    background-color: var(--highlight-colour);
    color: black;
    padding: 0.3rem;
    border-radius: 2px;
  }
  .mt {
    margin-top: 4rem;
  }
</style>
