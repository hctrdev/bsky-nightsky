# Nightsky

A little project that shows all posts being created across Bluesky as stars on a night sky ⭐

I did this as a way to learn more about the [AT Protocol](https://atproto.com/) and [Bluesky](https://bsky.app/) API.

## How it works

The process is quite straight-forward:

1. Connect a websocket to the [Jetstream](https://github.com/bluesky-social/jetstream) (a feed of all events across Bluesky)
2. Filter out events that I don't want to process
   - I only want to process post events (type: `app.bsky.feed.post`)
3. Get the length of the post
4. Add the post to the list of stars that gets rendered on the page
   - The "stars" are just `<div>` objects in a random fixed position with a little CSS
   - The longer the post, the larger the star
5. If the list has more than 150 items, remove the oldest one

The result is a night sky with twinkling stars that represent the activity of the network 🌠

If you want to highlight your posts, you can append `?u=<user_handle>` to the URL!
For example: `https://nightsky.hctr.dev?u=hctr.dev`

These posts will then be in a different colour and won't disappear (at least until you refresh the page).

## Contributing

The project has an MIT license, so feel free to do whatever you want with the code! 💙

FYI:

- All development is done on [Gitlab](https://gitlab.com/hctrdev/bsky-nightsky) and then mirrored to Github
- I'll only accept pull requests that relate to performance improvements or bug fixes

## Running Locally

The project is built with [Svelte](https://svelte.dev).

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
