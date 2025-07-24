// KnowledgeBase.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, Tag } from 'lucide-react';
import type { KnowledgeBaseArticle } from './types';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual data
  const articles: KnowledgeBaseArticle[] = [
    {
      id: '1',
      title: 'Understanding Soil Moisture Sensors',
      content: 'Detailed guide about soil moisture sensors...',
      category: 'Technical',
      tags: ['sensors', 'moisture', 'maintenance']
    },
    // Add more articles
  ];

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white flex items-center gap-2">
          <BookOpen className="text-green-600 dark:text-blue-400" />
          Knowledge Base
        </CardTitle>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 dark:text-blue-400" />
            <Input
              placeholder="Search articles..."
              className="pl-10 bg-white/80 dark:bg-gray-800/80 border-green-100 dark:border-blue-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-green-100/50 dark:border-blue-900/30 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-green-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-green-700 dark:text-blue-200 mb-3 line-clamp-2">
                  {article.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBase;