
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share } from 'lucide-react';
import { toast } from 'sonner';

interface CaptionResultProps {
  imageUrl: string;
  caption: string;
  isLoading: boolean;
}

const CaptionResult: React.FC<CaptionResultProps> = ({ imageUrl, caption, isLoading }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    toast.success('Caption copied to clipboard!');
  };

  return (
    <Card className="border border-captionCraft-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
              <img 
                src={imageUrl} 
                alt="Uploaded" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Generated Caption:</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 flex-grow">
              {isLoading ? (
                <p className="text-gray-500 italic">Analyzing image...</p>
              ) : (
                <p className="caption-appear">{caption}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="border-captionCraft-border"
                onClick={copyToClipboard}
                disabled={isLoading}
              >
                Copy
              </Button>
              <Button 
                className="bg-captionCraft-purple hover:bg-captionCraft-darkPurple"
                onClick={() => toast.info('Sharing functionality will be added in a future update')}
                disabled={isLoading}
              >
                <Share className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaptionResult;
