import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Download, Moon, Sun, History } from 'lucide-react';
import { UrlInput } from './components/UrlInput';
import { VideoCard } from './components/VideoCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import type { HistoryItem } from './types';

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useTheme();
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('download-history', []);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleDownload = async (url: string) => {
    setIsLoading(true);
    // TODO: Implement actual download logic when we add the backend
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleDelete = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  TikTok Downloader
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Download TikTok Videos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Easily download your favorite TikTok videos in high quality. Just paste the video URL
              and click download.
            </p>
          </div>

          <UrlInput onSubmit={handleDownload} isLoading={isLoading} />

          {history.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center mb-6">
                <History className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Download History
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onDelete={handleDelete}
                    onDownload={() => {}}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;