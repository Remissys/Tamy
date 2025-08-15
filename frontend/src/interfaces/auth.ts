export interface HeadersAuth {
  'Content-Type': string;
  'Authorization'?: string;
}

export interface RequestData {
  method: string,
  url: string,
  body?: Record<string, any>,
}