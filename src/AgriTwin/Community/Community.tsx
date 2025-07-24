import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePost } from './CreatePost';
import { CommunityPost } from './CommunityPost';
import { TrendingTopics } from './TrendingTopics';
import { Users, Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Simulated data hook
const useCommunityData = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching posts
    setPosts([
      {
        id: 1,
        authorName: "Natrajan",
        authorAvatar: "./src/assets/community/farmer.png",
        timestamp: "2 hours ago",
        content: "Just implemented horizontal farming in my farm. The results are amazing! Anyone else tried this?",
        media: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        likes: 24,
        comments: 8,
        status: "approved"
      },
      {
        id: 2,
        authorName: "Sarah Johnson",
        authorAvatar: "/api/placeholder/32/32",
        timestamp: "5 hours ago",
        content: "Looking for advice on organic pest control methods. What's working for everyone?",
        likes: 15,
        comments: 12,
        status: "pending"
      }
    ]);
  }, []);

  return { posts };
};

export default function Community() {
  const { posts } = useCommunityData();
  const [activeTab, setActiveTab] = useState('all');

  return (
    //<div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Users className="text-green-600 dark:text-blue-400" />
                Farming Community
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Connect, Share, and Grow Together
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CreatePost />
              
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full bg-green-50 dark:bg-gray-800">
                  <TabsTrigger 
                    value="all"
                    className={activeTab === 'all' ? 'bg-green-200 dark:bg-blue-900' : ''}
                  >
                    All Posts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending"
                    className={activeTab === 'pending' ? 'bg-green-200 dark:bg-blue-900' : ''}
                  >
                    Pending Approval
                  </TabsTrigger>
                  <TabsTrigger 
                    value="following"
                    className={activeTab === 'following' ? 'bg-green-200 dark:bg-blue-900' : ''}
                  >
                    Following
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {posts.map(post => (
                    <CommunityPost key={post.id} post={post} />
                  ))}
                </TabsContent>
                
                <TabsContent value="pending">
                  {posts
                    .filter(post => post.status === 'pending')
                    .map(post => (
                      <CommunityPost key={post.id} post={post} />
                    ))}
                </TabsContent>
                
                <TabsContent value="following">
                  {/* Following posts would go here */}
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <TrendingTopics />
              
              <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-green-900 dark:text-white flex items-center gap-2">
                    <Filter className="text-green-600 dark:text-blue-400" />
                    Quick Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start hover:bg-green-100 dark:hover:bg-blue-900">
                    Crop Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-green-100 dark:hover:bg-blue-900">
                    Irrigation Tips
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-green-100 dark:hover:bg-blue-900">
                    Market Updates
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-green-900 dark:text-white flex items-center gap-2">
                    <Bell className="text-green-600 dark:text-blue-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Activity items would go here */}
                    <p className="text-green-700 dark:text-blue-200">
                      John liked your post about sustainable farming
                    </p>
                    <p className="text-green-700 dark:text-blue-200">
                      New comment on your irrigation technique post
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    //</div>
  );
}