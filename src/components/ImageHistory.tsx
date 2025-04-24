
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface HistoryItem {
  id: string;
  imageUrl: string;
  caption: string;
  timestamp: Date;
}

interface ImageHistoryProps {
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
}

const ImageHistory: React.FC<ImageHistoryProps> = ({ history, onSelectHistoryItem }) => {
  if (history.length === 0) {
    return null;
  }
  
  const copyToClipboard = (caption: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(caption);
    toast.success('Caption copied to clipboard!');
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Recent Captions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {history.map((item) => (
          <Card 
            key={item.id}
            className="border border-captionCraft-border hover:border-captionCraft-purple transition-colors cursor-pointer"
            onClick={() => onSelectHistoryItem(item)}
          >
            <CardContent className="p-4">
              <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mb-2">
                <img 
                  src={item.imageUrl} 
                  alt="History item" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="line-clamp-2 text-sm mb-2 h-10">{item.caption}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={(e) => copyToClipboard(item.caption, e)}
                >
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageHistory;
