import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MediaPreviewProps } from '../types';

export const MediaPreview: React.FC<MediaPreviewProps> = ({ file, onDelete, isEditing }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const isVideo = file.sasUrl.match(/\.(mp4|mpeg|mov)$/i);
  const isPDF = file.sasUrl.match(/\.pdf$/i);
  const isImage = file.sasUrl.match(/\.(jpg|jpeg|png|webp)$/i);

  return (
    <div className="relative group">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        {isVideo && (
          <video 
            src={file.sasUrl} 
            controls 
            className="w-full h-full object-cover"
          />
        )}
        {isPDF && (
          <iframe 
            src={file.sasUrl} 
            className="w-full h-full" 
            title={file.fileName}
          />
        )}
        {isImage && (
          <img 
            src={file.sasUrl} 
            alt={file.fileName}
            className="w-full h-full object-cover"
          />
        )}
        {isEditing && onDelete && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setShowDeleteDialog(true)}
              className="h-8 w-8 bg-red-500/80 hover:bg-red-600/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this media? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDelete?.();
                setShowDeleteDialog(false);
              }}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 