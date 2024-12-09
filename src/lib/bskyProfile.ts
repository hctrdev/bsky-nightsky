const API_URL = 'https://public.api.bsky.app';

export interface ProfileData {
  did: string;
  handle: string;
  displayName: string;
}

export const getProfile = async (actor: string): Promise<null | ProfileData> => {
  const cleanActor = actor.replace('@', '').trim();
  return fetch(`${API_URL}/xrpc/app.bsky.actor.getProfile?actor=${cleanActor}`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.error('error fetching profile', res);
      return null;
    }
  });
};
