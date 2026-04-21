export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}