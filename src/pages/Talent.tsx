import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MessageSquare, Briefcase, MapPin, GraduationCap, CheckCircle, Star } from "lucide-react";

const Talent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout title="Talent Matchmaking">
      <div>
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input placeholder="Search talent..." className="pl-12" />
          </div>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="react">React</SelectItem>
                {/* Add more skills here */}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="matches">My Matches</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {/* Talent Card Grid - Example with 3 cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Talent Card 1 */}
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="flex items-center space-x-4 p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">Alice Kim</CardTitle>
                    <CardDescription className="text-sm text-gray-500">Software Engineer</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>Open to work</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span>Stanford University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>5.0 (25 reviews)</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Badge variant="secondary">React</Badge>
                </CardFooter>
              </Card>

              {/* Talent Card 2 */}
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="flex items-center space-x-4 p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                    <AvatarFallback>BJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">Bob Johnson</CardTitle>
                    <CardDescription className="text-sm text-gray-500">Data Scientist</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>Looking for full-time</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>New York, NY</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span>Columbia University</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.8 (18 reviews)</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Badge variant="secondary">Python</Badge>
                </CardFooter>
              </Card>

              {/* Talent Card 3 */}
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="flex items-center space-x-4 p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                    <AvatarFallback>CW</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">Charlie Williams</CardTitle>
                    <CardDescription className="text-sm text-gray-500">Product Manager</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>Open to contract work</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>Seattle, WA</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span>University of Washington</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.9 (32 reviews)</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Badge variant="secondary">Agile</Badge>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="matches">
            <div>No matches yet.</div>
          </TabsContent>
          <TabsContent value="saved">
            <div>No saved talent.</div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Talent;
