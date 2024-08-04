export class Capture {
  private stream?: MediaStream;
  private capturer?: ImageCapture;
  private streamOptions: DisplayMediaStreamOptions;
  private delay: number;
  private intervalHandle?: NodeJS.Timeout;
  private callback: (buffer: Buffer) => Promise<void>;

  constructor(delay: number, callback: (buffer: Buffer) => Promise<void>) {
    this.delay = delay;
    this.callback = callback;
    this.streamOptions = {
      video: {
        displaySurface: "window",
      },
      audio: false,
    };
  }

  async start() {
    this.stream = await navigator.mediaDevices.getDisplayMedia(this.streamOptions);
    const track = this.stream.getVideoTracks()?.[0];
    if (!track) {
      throw Error('expected exactly one video track in stream');
    }
    this.capturer = new ImageCapture(track);
    this.intervalHandle = setInterval(async () => await this.capture(), this.delay);
  }

  async stop() {
    clearInterval(this.intervalHandle);
    this.intervalHandle = undefined;
    this.capturer = undefined;
    this.stream = undefined;
  }

  private async capture() {
    if (!this.stream || !this.stream.active || !this.capturer) {
      await this.stop();
      return;
    }
    const bmp = await this.capturer.grabFrame();
    const canvas = document.createElement('canvas');
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    const ctx = canvas.getContext('bitmaprenderer');
    if (!ctx) {
      throw Error('expected canvas context');
    }
    ctx.transferFromImageBitmap(bmp);
    const blob = await new Promise((res) => canvas.toBlob(res));
    const buffer = Buffer.from(await blob.arrayBuffer());
    await this.callback(buffer);
  }
}

