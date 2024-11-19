import type { JetstreamCommitData, RawJetstreamMessage } from '$lib/bskyStream';

export interface PostData {
  postId: string;
  userDid: string;
  postText: string;
}

export const postFilter = (event: RawJetstreamMessage, fn: (post: PostData) => void) => {
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
  const did = json.did;
  const text = json.commit.record.text;
  const id = json.commit.cid;
  const data = {
    postId: id,
    userDid: did,
    postText: text,
  };
  fn(data);
};
