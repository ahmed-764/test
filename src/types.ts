export interface VideoMetadata {
  id: string;
  url: string;
  title: string;
  author: string;
  thumbnail: string;
  duration: number;
  qualities: VideoQuality[];
  timestamp: number;
}

export interface VideoQuality {
  label: string;
  url: string;
  size: string;
}

export interface HistoryItem extends VideoMetadata {
  downloadCount: number;
  lastDownloaded: number;
}