export interface ProcessLog {
  _id: string;
  processId: string;
  tenantId: string;
  week_number: number;
  process_week_range: string;
  processLog: string;
  media: MediaFile[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaFile {
  sasUrl: string;
  fileName: string;
  blobName: string;
  markedForDeletion?: boolean;
}

export interface Process {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface FileUploadProps {
  onChange: (files: MediaFile[]) => void;
  id: string;
  disabled?: boolean;
}

export interface MediaPreviewProps {
  file: MediaFile;
  onDelete?: () => void;
  isEditing: boolean;
}

export interface ProcessCardProps {
  process: Process;
  processLog: ProcessLog | null;
  isEditing: boolean;
  onEditClick: (process: Process) => void;
  onLogSubmit: (data: { processLog: string; media: MediaFile[] }) => void;
  isSelected: boolean;
}

export interface RootState {
  login: {
    token: string;
    tenantId: string;
  };
} 