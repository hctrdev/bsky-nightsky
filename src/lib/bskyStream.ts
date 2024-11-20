export interface RawJetstreamMessage {
  data: string;
}

export interface JetstreamCommitData {
  did: string;
  commit: {
    cid: string;
    rkey: string;
    record: {
      $type: string;
      text: string;
    };
  };
}

class Stream {
  private _jetstreamUrls = [
    'wss://jetstream1.us-east.bsky.network/subscribe',
    'wss://jetstream2.us-east.bsky.network/subscribe',
    'wss://jetstream2.us-west.bsky.network/subscribe',
  ];
  private _rawStream: WebSocket | null = null;
  private _started: boolean = false;

  private randomUrl(): URL {
    const jetstreamUrl =
      this._jetstreamUrls[Math.floor(Math.random() * this._jetstreamUrls.length)];
    return new URL(jetstreamUrl);
  }

  private setUpStream(handler: (payload: RawJetstreamMessage) => void) {
    const url = this.randomUrl();
    url.searchParams.set('wantedCollections', 'app.bsky.feed.post');
    console.log(`connecting to ${url.href}`);

    this._rawStream = new WebSocket(url);
    this._rawStream.onmessage = handler;
    this._rawStream.onclose = () => {
      console.log('disconnected');
      if (this._started) {
        console.log('reconnecting ...');
        this.setUpStream(handler);
      }
    };
  }

  connect(handler: (payload: RawJetstreamMessage) => void) {
    if (this._rawStream) {
      throw new Error('stream already connected');
    }

    this._started = true;
    this.setUpStream(handler);
  }

  disconnect() {
    if (this._rawStream) {
      this._started = false;
      this._rawStream.close();
      this._rawStream = null;
    }
  }
}

export const stream = new Stream();
