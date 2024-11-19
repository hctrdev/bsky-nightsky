const API_URL = 'https://public.api.bsky.app';

export interface ProfileData {
  did: string;
  handle: string;
  displayName: string;
}

export const getProfile = async (actor: string): Promise<void | ProfileData> => {
  const cleanActor = actor.replace('@', '').trim();
  return fetch(`${API_URL}/xrpc/app.bsky.actor.getProfile?actor=${cleanActor}`).then((res) =>
    res.json(),
  );
};
