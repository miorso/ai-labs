export interface Closeable {
  close: () => void | Promise<void>;
}

export interface ServerOptions {
  root: string;
}
