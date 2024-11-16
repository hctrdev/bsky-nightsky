export interface RawJetstreamMessage {
  data: string;
}

export interface JetstreamCommitData {
  commit: {
    cid: string;
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
    'wss://jetstream3.us-east.bsky.network/subscribe',
    'wss://jetstream4.us-east.bsky.network/subscribe',
  ];
  private _rawStream: WebSocket | null = null;
  private _started: boolean = false;

  private randomUrl(): string {
    const jetstreamUrl =
      this._jetstreamUrls[Math.floor(Math.random() * this._jetstreamUrls.length)];
    console.log(`connecting to: ${jetstreamUrl}`);
    return jetstreamUrl;
  }

  private setUpStream(handler: (payload: RawJetstreamMessage) => void) {
    this._rawStream = new WebSocket(this.randomUrl());
    this._rawStream.onmessage = handler;
    this._rawStream.onclose = () => {
      console.log('connection closed');
      if (this._started) {
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
