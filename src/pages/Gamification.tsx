
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, Target, Crown, Medal, Zap, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Gamification = () => {
  const { currentUser } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  const userStats = {
    totalPoints: 2847,
    level: 12,
    rank: 3,
    streak: 15,
    badges: 8,
    completedTasks: 47,
    nextLevelPoints: 3200
  };

  const badges = [
    {
      id: 1,
      name: "Task Master",
      description: "Complete 50 tasks",
      icon: <Target className="h-6 w-6" />,
      earned: true,
      earnedDate: "2025-05-15",
      rarity: "common"
    },
    {
      id: 2,
      name: "Early Bird",
      description: "Submit 10 tasks early",
      icon: <Star className="h-6 w-6" />,
      earned: true,
      earnedDate: "2025-05-22",
      rarity: "uncommon"
    },
    {
      id: 3,
      name: "Team Player",
      description: "Collaborate on 20 projects",
      icon: <Award className="h-6 w-6" />,
      earned: true,
      earnedDate: "2025-06-01",
      rarity: "rare"
    },
    {
      id: 4,
      name: "Innovation Leader",
      description: "Suggest 5 process improvements",
      icon: <Zap className="h-6 w-6" />,
      earned: false,
      progress: 3,
      total: 5,
      rarity: "epic"
    },
    {
      id: 5,
      name: "Department Champion",
      description: "Top performer in department",
      icon: <Crown className="h-6 w-6" />,
      earned: false,
      rarity: "legendary"
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Sarah Manager",
      department: "Marketing",
      points: 3241,
      avatar: "SM",
      trend: "up"
    },
    {
      rank: 2,
      name: "Fiona Finance",
      department: "Finance",
      points: 3156,
      avatar: "FF",
      trend: "up"
    },
    {
      rank: 3,
      name: currentUser?.name || "You",
      department: currentUser?.department || "Management",
      points: 2847,
      avatar: currentUser?.name?.split(' ').map(n => n[0]).join('') || "YU",
      trend: "up",
      isCurrentUser: true
    },
    {
      rank: 4,
      name: "Ian IT",
      department: "IT",
      points: 2634,
      avatar: "II",
      trend: "down"
    },
    {
      rank: 5,
      name: "Helen HR",
      department: "HR",
      points: 2398,
      avatar: "HH",
      trend: "stable"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Completed Financial Review",
      points: 150,
      type: "task",
      date: "2025-06-08",
      department: "finance"
    },
    {
      id: 2,
      title: "Training Module: Compliance",
      points: 100,
      type: "training",
      date: "2025-06-07",
      department: "hr"
    },
    {
      id: 3,
      title: "Client Evaluation Perfect Score",
      points: 200,
      type: "evaluation",
      date: "2025-06-06",
      department: "quality"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Weekly Sprint",
      description: "Complete 10 tasks this week",
      progress: 7,
      total: 10,
      reward: "250 points + Sprint Badge",
      deadline: "2025-06-14",
      type: "weekly"
    },
    {
      id: 2,
      title: "Department Leader",
      description: "Be top performer in your department this month",
      progress: 85,
      total: 100,
      reward: "500 points + Leadership Badge",
      deadline: "2025-06-30",
      type: "monthly"
    },
    {
      id: 3,
      title: "Cross-Training Expert",
      description: "Complete training modules from 3 different departments",
      progress: 2,
      total: 3,
      reward: "300 points + Expert Badge",
      deadline: "2025-07-15",
      type: "special"
    }
  ];

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-600 border-gray-300";
      case "uncommon": return "text-green-600 border-green-300";
      case "rare": return "text-blue-600 border-blue-300";
      case "epic": return "text-purple-600 border-purple-300";
      case "legendary": return "text-yellow-600 border-yellow-300";
      default: return "text-gray-600 border-gray-300";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "down": return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      case "stable": return <div className="w-3 h-0.5 bg-gray-400" />;
      default: return null;
    }
  };

  const levelProgress = ((userStats.totalPoints % 1000) / 1000) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gamification Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress, earn badges, and compete with colleagues
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <span className="text-xl font-bold text-yellow-600">#{userStats.rank}</span>
        </div>
      </div>

      {/* User Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-2xl font-bold">{userStats.level}</p>
              </div>
              <Medal className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold">#{userStats.rank}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold">{userStats.streak}</p>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Badges</p>
                <p className="text-2xl font-bold">{userStats.badges}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks</p>
                <p className="text-2xl font-bold">{userStats.completedTasks}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Level {userStats.level} Progress</span>
              <span className="text-sm text-muted-foreground">
                {userStats.totalPoints} / {userStats.nextLevelPoints} points
              </span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {userStats.nextLevelPoints - userStats.totalPoints} points to next level
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <Card key={badge.id} className={`${badge.earned ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'opacity-60'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full border-2 ${getBadgeRarityColor(badge.rarity)} ${badge.earned ? 'bg-white' : 'bg-gray-100'}`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-xs ${getBadgeRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                        {badge.earned ? (
                          <Badge variant="secondary" className="text-xs">
                            Earned {badge.earnedDate}
                          </Badge>
                        ) : badge.progress !== undefined ? (
                          <div className="flex-1">
                            <Progress value={(badge.progress / badge.total!) * 100} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">
                              {badge.progress} / {badge.total}
                            </p>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Leaderboard</CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${
                      user.isCurrentUser ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-muted-foreground">#{user.rank}</span>
                      {user.rank <= 3 && (
                        <Crown className={`h-5 w-5 ${
                          user.rank === 1 ? 'text-yellow-500' :
                          user.rank === 2 ? 'text-gray-400' :
                          'text-orange-500'
                        }`} />
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{user.name}</span>
                        {user.isCurrentUser && <Badge variant="secondary">You</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{user.points.toLocaleString()}</span>
                      {getTrendIcon(user.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      <Badge variant={challenge.type === 'special' ? 'destructive' : 'outline'}>
                        {challenge.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress} / {challenge.total}</span>
                      </div>
                      <Progress value={(challenge.progress / challenge.total) * 100} />
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Deadline: {challenge.deadline}</span>
                      <span className="font-medium text-green-600">{challenge.reward}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest point-earning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{achievement.date}</span>
                        <Badge variant="outline">{achievement.department}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-green-600">+{achievement.points}</span>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Gamification;
