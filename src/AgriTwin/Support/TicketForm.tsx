import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Upload } from 'lucide-react';
import type { Ticket } from './types';

const TicketForm = ({ onSubmit }: { onSubmit: (ticket: Partial<Ticket>) => void }) => {
  const [attachments, setAttachments] = useState<File[]>([]);

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg hover:shadow-green-100/50 transition-all duration-300">
      {/* Header */}
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-lg md:text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
          <AlertCircle className="text-green-600 dark:text-blue-400" />
          Create Support Ticket
        </CardTitle>
      </CardHeader>

      {/* Form Content */}
      <CardContent className="p-4 md:p-6 space-y-4">
        <div className="space-y-4">
          {/* Ticket Title */}
          <Input
            placeholder="Ticket Title"
            className="w-full bg-white/80 dark:bg-gray-800/80 border-green-100 dark:border-blue-900"
          />

          {/* Priority & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full bg-white/80 dark:bg-gray-800/80 border-green-100 dark:border-blue-900">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full bg-white/80 dark:bg-gray-800/80 border-green-100 dark:border-blue-900">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical Issue</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <Textarea
            placeholder="Describe your issue in detail..."
            className="min-h-[120px] md:min-h-[150px] bg-white/80 dark:bg-gray-800/80 border-green-100 dark:border-blue-900"
          />

          {/* Attachment Upload */}
          <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-green-100 dark:border-blue-900 border-dashed rounded-lg cursor-pointer bg-white/50 dark:bg-gray-800/50 hover:bg-green-50 dark:hover:bg-gray-700/50 transition-all">
              <div className="flex flex-col items-center justify-center pt-3 pb-4 sm:pt-5 sm:pb-6 text-center">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-green-600 dark:text-blue-400" />
                <p className="text-xs sm:text-sm text-green-700 dark:text-blue-200">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-[10px] sm:text-xs text-green-600 dark:text-blue-300">
                  Images, PDFs, or documents (MAX. 10MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setAttachments(Array.from(e.target.files));
                  }
                }}
              />
            </label>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
            onClick={() => onSubmit({})}
          >
            Submit Ticket
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
