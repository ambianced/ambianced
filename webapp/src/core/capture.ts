class Capture {
  private stream?: MediaStream;
  private capturer?: ImageCapture;
  private streamOptions: DisplayMediaStreamOptions;
  private delay: number;
  private intervalHandle?: NodeJS.Timeout;
  private callback: (buffer: Buffer) => void;

  constructor(delay: number, callback: (buffer: Buffer) => void) {
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
    this.intervalHandle = setInterval(this.capture, this.delay);
  }

  async stop() {
    clearInterval(this.intervalHandle);
  }

  private async capture() {
    if (!this.capturer) {
      throw Error('capturer must be defined');
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
    this.callback(buffer);
  }
}

