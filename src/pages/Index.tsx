import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CodeEditor from '@/components/CodeEditor';
import TutorialPanel from '@/components/TutorialPanel';
import ExerciseCard from '@/components/ExerciseCard';
import heroImage from '@/assets/hero-coding-platform.jpg';
import { 
  Code2, 
  Brain, 
  Target, 
  Zap, 
  BookOpen, 
  Search,
  Play,
  Users,
  Trophy,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const exercises = [
    {
      id: '1',
      title: 'Fix the Function',
      description: 'Debug a JavaScript function with syntax errors and improve its error handling.',
      difficulty: 'beginner' as const,
      estimatedTime: '15 min',
      topic: 'Debugging',
      completed: false,
      attempts: 1
    },
    {
      id: '2',
      title: 'Array Manipulation',
      description: 'Create functions to filter, map, and reduce arrays using modern JavaScript methods.',
      difficulty: 'intermediate' as const,
      estimatedTime: '25 min',
      topic: 'Arrays',
      completed: true,
      score: 95,
      attempts: 2
    },
    {
      id: '3',
      title: 'Async Programming',
      description: 'Master promises, async/await, and error handling in asynchronous JavaScript.',
      difficulty: 'advanced' as const,
      estimatedTime: '40 min',
      topic: 'Async/Await',
      completed: false
    }
  ];

  const handleStartExercise = (exerciseId: string) => {
    console.log('Starting exercise:', exerciseId);
  };

  const handleRunCode = (code: string) => {
    console.log('Running code:', code);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Code Learning Assistant</h1>
                <p className="text-sm text-muted-foreground">Interactive Programming Education</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="gradient-primary text-primary-foreground">
                <Play className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Master Programming with
            <span className="block gradient-primary bg-clip-text text-transparent mt-2">
              Interactive Code Analysis
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Learn to code with real-time error detection, debugging suggestions, and step-by-step tutorials. 
            Build your skills through hands-on exercises and intelligent code analysis.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Brain className="h-5 w-5" />
              <span>Smart Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Target className="h-5 w-5" />
              <span>Error Detection</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="h-5 w-5" />
              <span>Real-time Feedback</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <BookOpen className="h-5 w-5" />
              <span>Interactive Tutorials</span>
            </div>
          </div>

          <Button size="lg" className="bg-white text-primary hover:bg-white/90 glow-primary">
            <Play className="h-5 w-5 mr-2" />
            Start Coding Now
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <Users className="h-4 w-4" />
                Active Learners
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">95%</div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <Trophy className="h-4 w-4" />
                Success Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <BookOpen className="h-4 w-4" />
                Exercises
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Learning Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Code Editor Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Interactive Code Editor</h2>
              <p className="text-muted-foreground">
                Write, analyze, and debug your code with real-time feedback and suggestions.
              </p>
            </div>
            <CodeEditor onRunCode={handleRunCode} />
          </div>

          {/* Tutorial Panel */}
          <div>
            <TutorialPanel />
          </div>
        </div>

        {/* Exercises Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Practice Exercises</h2>
              <p className="text-muted-foreground">
                Challenge yourself with curated coding exercises and track your progress.
              </p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {exercises.filter(e => e.completed).length} / {exercises.length} Completed
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onStartExercise={handleStartExercise}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">Code Learning Assistant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Programming Education Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;