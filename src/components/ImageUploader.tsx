
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File, previewUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [onImageSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [onImageSelect]);

  const processFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file (jpg, png, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelect(file, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className={`image-drop-zone ${isDragActive ? 'active' : 'border-gray-300 hover:border-captionCraft-purple'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-4 text-captionCraft-purple">
        <ImageIcon size={48} />
      </div>
      <h3 className="text-lg font-medium mb-2">Upload an Image</h3>
      <p className="text-gray-500 mb-4">Drag and drop an image here, or click to browse</p>
      
      <Button 
        variant="outline"
        className="bg-white hover:bg-captionCraft-lightPurple border-captionCraft-purple text-captionCraft-darkPurple hover:text-captionCraft-darkPurple"
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Upload className="mr-2 h-4 w-4" /> Select Image
      </Button>
      
      <input 
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
