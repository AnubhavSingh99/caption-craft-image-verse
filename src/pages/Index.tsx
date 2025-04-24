
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from '@/components/ImageUploader';
import CaptionResult from '@/components/CaptionResult';
import ImageHistory from '@/components/ImageHistory';
import { HistoryItem } from '@/components/ImageHistory';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateImageCaption } from '@/utils/imageProcessing';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleImageSelect = async (file: File, previewUrl: string) => {
    setSelectedImage(previewUrl);
    setSelectedFile(file);
    setIsLoading(true);
    setCaption('');

    try {
      const generatedCaption = await generateImageCaption(previewUrl);
      setCaption(generatedCaption);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: uuidv4(),
        imageUrl: previewUrl,
        caption: generatedCaption,
        timestamp: new Date()
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 9)); // Keep only the last 9 items
    } catch (error) {
      console.error('Error generating caption:', error);
      setCaption('Error generating caption. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setSelectedImage(item.imageUrl);
    setCaption(item.caption);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-captionCraft-purple to-captionCraft-darkPurple text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">CaptionCraft</h1>
          <p className="mt-2">AI-powered image captioning system</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Intro section */}
          {!selectedImage && (
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Generate Descriptive Captions for Your Images</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upload an image and our AI will analyze it to create a detailed, accurate caption. 
                Perfect for content creators, accessibility, and more.
              </p>
            </div>
          )}

          {/* Main content */}
          {!selectedImage ? (
            <div className="max-w-xl mx-auto">
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Image Caption</h2>
                <button 
                  onClick={() => setSelectedImage(null)} 
                  className="text-captionCraft-purple hover:text-captionCraft-darkPurple"
                >
                  Upload another image
                </button>
              </div>
              
              <CaptionResult 
                imageUrl={selectedImage} 
                caption={caption}
                isLoading={isLoading}
              />
            </>
          )}

          {/* History section */}
          <ImageHistory 
            history={history} 
            onSelectHistoryItem={handleHistorySelect} 
          />
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>CaptionCraft - AI Image Captioning System</p>
          <p className="text-sm mt-1">Powered by machine learning</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
