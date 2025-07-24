import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, FileText, Send } from 'lucide-react';

export const CreatePost = () => {
  return (
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
          <CardHeader>
              <CardTitle className="text-xl text-green-900 dark:text-white">
                  Create Post
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <Input 
                  placeholder="Share your farming experience..."
                  className="bg-white/50 dark:bg-gray-800/50 w-full"
              />
              {/* Improved Spacing for Buttons */}
              <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full py-3 hover:bg-green-100 dark:hover:bg-blue-900">
                      <Image className="w-4 h-4 mr-2" />
                      Add Media
                  </Button>
                  <Button variant="outline" className="w-full py-3 hover:bg-green-100 dark:hover:bg-blue-900">
                      <FileText className="w-4 h-4 mr-2" />
                      Add Document
                  </Button>
                  <Button className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Post
                  </Button>
              </div>
          </CardContent>
      </Card>
  );
};
