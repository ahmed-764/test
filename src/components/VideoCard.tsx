import React from 'react';
import { Clock, Download, Share2, Trash2 } from 'lucide-react';
import type { HistoryItem } from '../types';

interface VideoCardProps {
  video: HistoryItem;
  onDelete: (id: string) => void;
  onDownload: (video: HistoryItem) => void;
}

export function VideoCard({ video, onDelete, onDownload }: VideoCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const shareVideo = async () => {
    try {
      await navigator.share({
        title: video.title,
        text: `Check out this TikTok video: ${video.title}`,
        url: video.url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onDownload(video)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
          >
            <Download size={20} />
            <span>Download</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white truncate">
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          by @{video.author}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={16} className="mr-1" />
              {formatDate(video.timestamp)}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Download size={16} className="mr-1" />
              {video.downloadCount}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={shareVideo}
              className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={() => onDelete(video.id)}
              className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}