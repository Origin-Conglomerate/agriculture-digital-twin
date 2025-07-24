import React, { useState, useEffect } from 'react';
import { FileEdit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FileUpload } from './FileUpload';
import { MediaPreview } from './MediaPreview';
import { ProcessCardProps, MediaFile } from '../types';

export const ProcessCard: React.FC<ProcessCardProps> = ({
  process,
  processLog,
  isEditing,
  onEditClick,
  onLogSubmit,
  isSelected,
}) => {
  const [newLog, setNewLog] = useState(processLog?.processLog || "");
  const [newMedia, setNewMedia] = useState<MediaFile[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (isSelected && processLog) {
      setNewLog(processLog.processLog || "");
    }
  }, [isSelected, processLog]);

  const handleMediaUpload = (uploadedFiles: MediaFile[]) => {
    setNewMedia(prev => [...prev, ...uploadedFiles]);
  };

  const handleMediaDelete = (index: number, isNewMedia: boolean) => {
    if (isNewMedia) {
      setNewMedia(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const existingMedia = (processLog?.media || []).filter(m => !m.markedForDeletion);
    const updatedMedia = [...existingMedia, ...newMedia];
    
    onLogSubmit({
      processLog: newLog,
      media: updatedMedia,
    });
    
    setNewLog("");
    setNewMedia([]);
  };

  return (
    <Card className="mb-6 overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800/60 dark:border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-green-800 dark:text-green-400">
              {process.subtitle}
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
              {process.description}
            </CardDescription>
          </div>
          <Button
            variant={isSelected && isEditing ? "destructive" : "outline"}
            onClick={() => onEditClick(process)}
            className="ml-4 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80"
          >
            {isSelected && isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <FileEdit className="mr-2 h-4 w-4" />
                {processLog?.processLog ? "Edit Log" : "Add Log"}
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence mode="wait">
        {/* Existing Log Display */}
        {processLog?.processLog && !isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">
                    Current Log
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{processLog.processLog}</p>
                </div>
                
                {processLog.media?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">
                      Media Files
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {processLog.media.map((file, index) => (
                        !file.markedForDeletion && (
                          <MediaPreview
                            key={index}
                            file={file}
                            onDelete={() => handleMediaDelete(index, false)}
                            isEditing={false}
                          />
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </motion.div>
        )}

        {/* Edit Mode */}
        {isSelected && isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CardContent className="space-y-6">
              <Textarea
                value={newLog}
                onChange={(e) => setNewLog(e.target.value)}
                placeholder="Enter your process log..."
                className="min-h-[150px] bg-white/60 dark:bg-gray-900/60 text-black"
              />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-green-700 dark:text-green-400">
                    Media Files
                  </h4>
                  <FileUpload
                    onChange={handleMediaUpload}
                    id={`file-upload-${process._id}`}
                    disabled={false}
                  />
                </div>

                {/* New Media */}
                {newMedia.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {newMedia.map((file, index) => (
                      <MediaPreview
                        key={index}
                        file={file}
                        onDelete={() => handleMediaDelete(index, true)}
                        isEditing={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => onEditClick(process)}
                  className="bg-white/60 dark:bg-gray-900/60"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowConfirmDialog(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to save these changes to the process log?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                handleSubmit();
                setShowConfirmDialog(false);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}; 