import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Clock, 
  Trophy, 
  Star, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  topic: string;
  completed: boolean;
  score?: number;
  attempts?: number;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onStartExercise?: (exerciseId: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onStartExercise
}) => {
  const difficultyColors = {
    beginner: 'bg-success/10 text-success border-success/20',
    intermediate: 'bg-warning/10 text-warning border-warning/20',
    advanced: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const handleStartExercise = () => {
    onStartExercise?.(exercise.id);
  };

  const renderDifficultyStars = (difficulty: string) => {
    const starCount = difficulty === 'beginner' ? 1 : difficulty === 'intermediate' ? 2 : 3;
    return (
      <div className="flex gap-1">
        {[...Array(3)].map((_, index) => (
          <Star
            key={index}
            className={`h-3 w-3 ${
              index < starCount ? 'text-warning fill-warning' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6 transition-smooth hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{exercise.title}</h3>
            <Badge variant="outline" className="mt-1">
              {exercise.topic}
            </Badge>
          </div>
        </div>
        
        {exercise.completed && (
          <CheckCircle2 className="h-6 w-6 text-success" />
        )}
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4">
        {exercise.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {exercise.estimatedTime}
          </div>
          
          <div className={`px-2 py-1 rounded-md text-xs font-medium border ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty}
          </div>
          
          {renderDifficultyStars(exercise.difficulty)}
        </div>

        {exercise.completed && exercise.score && (
          <div className="flex items-center gap-1 text-sm">
            <Trophy className="h-4 w-4 text-warning" />
            <span className="font-medium">{exercise.score}%</span>
          </div>
        )}
      </div>

      {exercise.attempts && exercise.attempts > 1 && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <AlertCircle className="h-4 w-4" />
          <span>{exercise.attempts} attempts</span>
        </div>
      )}

      <Button
        onClick={handleStartExercise}
        className={`w-full ${
          exercise.completed 
            ? 'gradient-primary text-primary-foreground' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {exercise.completed ? 'Review Exercise' : 'Start Exercise'}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </Card>
  );
};

export default ExerciseCard;