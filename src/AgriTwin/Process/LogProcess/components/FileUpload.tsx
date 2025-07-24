import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { POST } from '../../../../utils/ApiHandler';
import { FileUploadProps, RootState } from '../types';

export const FileUpload: React.FC<FileUploadProps> = ({ onChange, id, disabled }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { token, tenantId } = useSelector((state: RootState) => state.login);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setIsUploading(true);
      const files = Array.from(event.target.files);
      const uploadedFiles = [];

      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          const data = await POST(
            `${import.meta.env.VITE_API_URL}/api/v1/common/file/upload?tenantId=${tenantId}&path=process`,
            formData,
            token
          );
          
          if (data.success) {
            const { common: sasUrl, fileName, blobName } = data.data;
            uploadedFiles.push({ sasUrl, fileName, blobName });
          }
        }
        onChange(uploadedFiles);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
        if (filePickerRef.current) {
          filePickerRef.current.value = '';
        }
      }
    }
  };

  return (
    <div className="relative">
      <input
        id={id}
        type="file"
        className="hidden"
        ref={filePickerRef}
        accept=".jpg,.jpeg,.png,.mp4,.mpeg,.pdf"
        multiple
        onChange={pickHandler}
        disabled={disabled || isUploading}
      />
      <Button
        type="button"
        onClick={() => filePickerRef.current?.click()}
        disabled={disabled || isUploading}
        variant="outline"
        className="w-full sm:w-auto bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80"
      >
        {isUploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Upload className="mr-2 h-4 w-4" />
        )}
        {isUploading ? "Uploading..." : "Upload Media"}
      </Button>
    </div>
  );
}; 