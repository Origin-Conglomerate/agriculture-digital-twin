import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share2, Flag } from 'lucide-react';

export const CommunityPost = ({ post }) => {
  return (
    <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg hover:shadow-green-100/50 transition-all duration-300 mb-4">
      <CardHeader className="flex flex-row items-center gap-2 sm:gap-4 p-4">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src={post.authorAvatar} />
          <AvatarFallback>{post.authorName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <CardTitle className="text-sm sm:text-lg text-green-900 dark:text-white truncate">
            {post.authorName}
          </CardTitle>
          <span className="text-xs sm:text-sm text-green-700 dark:text-blue-200">
            {post.timestamp}
          </span>
        </div>
        <Badge 
          variant={post.status === 'approved' ? 'success' : 'secondary'}
          className="ml-auto text-xs whitespace-nowrap"
        >
          {post.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <p className="text-sm sm:text-base text-green-800 dark:text-blue-100">{post.content}</p>
        {post.media && (
          <div className="rounded-lg overflow-hidden">
            <img src={post.media} alt="Post media" className="w-full h-auto" />
          </div>
        )}
        <div className="flex flex-wrap gap-2 justify-between items-center pt-4">
          <Button variant="ghost" className="text-green-700 dark:text-blue-300 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm">
            <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{post.likes} Likes</span>
            <span className="sm:hidden">{post.likes}</span>
          </Button>
          <Button variant="ghost" className="text-green-700 dark:text-blue-300 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{post.comments} Comments</span>
            <span className="sm:hidden">{post.comments}</span>
          </Button>
          <Button variant="ghost" className="text-green-700 dark:text-blue-300 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm">
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="ghost" className="text-red-600 dark:text-red-400 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm">
            <Flag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Report</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPost;