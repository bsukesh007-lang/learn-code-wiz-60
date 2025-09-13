import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Target,
  Lightbulb
} from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  code?: string;
  hint?: string;
  completed: boolean;
}

interface TutorialPanelProps {
  title?: string;
  steps?: TutorialStep[];
  onStepComplete?: (stepId: number) => void;
}

const TutorialPanel: React.FC<TutorialPanelProps> = ({
  title = "JavaScript Fundamentals",
  steps = [
    {
      id: 1,
      title: "Understanding Functions",
      description: "Learn how to create and call functions in JavaScript. Functions are reusable blocks of code that perform specific tasks.",
      code: "function greetUser(name) {\n  return `Hello, ${name}!`;\n}",
      hint: "Make sure to include both opening and closing parentheses",
      completed: true
    },
    {
      id: 2,
      title: "Fixing Syntax Errors",
      description: "Identify and fix the missing closing parenthesis in the console.log statement. Syntax errors prevent code from running.",
      hint: "Look for unmatched parentheses on line 3",
      completed: false
    },
    {
      id: 3,
      title: "Error Handling",
      description: "Add proper error handling to make your code more robust. Consider what happens when invalid input is provided.",
      hint: "Use try-catch blocks or input validation",
      completed: false
    },
    {
      id: 4,
      title: "Modern JavaScript",
      description: "Replace string concatenation with template literals for cleaner, more readable code.",
      hint: "Use backticks (`) and ${} syntax for variables",
      completed: false
    }
  ],
  onStepComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  const handleStepComplete = () => {
    onStepComplete?.(steps[currentStep].id);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowHint(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowHint(false);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <Badge variant="secondary">
            {completedSteps}/{steps.length} Complete
          </Badge>
        </div>

        <Progress value={progress} className="mb-6" />

        <div className="tutorial-step">
          <div className="flex items-start gap-3 mb-4">
            {currentStepData.completed ? (
              <CheckCircle2 className="h-6 w-6 text-success mt-1 flex-shrink-0" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{currentStepData.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </div>

          {currentStepData.code && (
            <Card className="p-4 bg-editor-bg text-editor-foreground font-mono text-sm mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">EXAMPLE CODE</span>
              </div>
              <pre className="overflow-auto">{currentStepData.code}</pre>
            </Card>
          )}

          {currentStepData.hint && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="text-accent hover:text-accent"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              
              {showHint && (
                <div className="mt-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-accent">{currentStepData.hint}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {!currentStepData.completed && (
              <Button
                onClick={handleStepComplete}
                className="gradient-primary text-primary-foreground"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
            )}
            
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Step Overview */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Tutorial Overview</h3>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-smooth hover:bg-muted/50 ${
                index === currentStep ? 'bg-primary/10 border border-primary/20' : ''
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {step.completed ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={`text-sm ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TutorialPanel;