import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Check, AlertTriangle, Bug } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRunCode?: (code: string) => void;
  showAnalysis?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = `function greetUser(name) {
  // TODO: Fix the syntax error below
  console.log("Hello, " + name + "!";
  return name.toUpperCase();
}

// Call the function
greetUser("Student");`,
  language = "javascript",
  onCodeChange,
  onRunCode,
  showAnalysis = true
}) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [analysis, setAnalysis] = useState({
    errors: [
      { line: 3, message: "Missing closing parenthesis", type: "syntax" },
      { line: 8, message: "Consider adding error handling", type: "suggestion" }
    ],
    suggestions: [
      "Add proper error handling for invalid inputs",
      "Consider using template literals for string concatenation"
    ]
  });

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      onRunCode?.(code);
    }, 1500);
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange?.(initialCode);
  };

  const renderCodeWithSyntaxHighlighting = (codeText: string) => {
    return codeText.split('\n').map((line, index) => {
      const lineNumber = index + 1;
      const hasError = analysis.errors.some(error => error.line === lineNumber);
      
      return (
        <div key={index} className={`flex ${hasError ? 'bg-destructive/5' : ''}`}>
          <span className="code-line-numbers w-8 text-right">{lineNumber}</span>
          <span className="flex-1 pl-4">{highlightSyntax(line)}</span>
          {hasError && (
            <AlertTriangle className="h-4 w-4 text-destructive ml-2 mt-0.5" />
          )}
        </div>
      );
    });
  };

  const highlightSyntax = (line: string) => {
    // Simple syntax highlighting for demonstration
    let highlighted = line;
    
    // Keywords
    highlighted = highlighted.replace(
      /\b(function|return|console|const|let|var|if|else|for|while)\b/g,
      '<span class="syntax-keyword">$1</span>'
    );
    
    // Strings
    highlighted = highlighted.replace(
      /"([^"]*)"/g,
      '<span class="syntax-string">"$1"</span>'
    );
    
    // Comments
    highlighted = highlighted.replace(
      /(\/\/.*)/g,
      '<span class="syntax-comment">$1</span>'
    );
    
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <div className="space-y-4">
      <Card className="interactive-code">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{language}</Badge>
            <span className="text-sm text-muted-foreground">Interactive Editor</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              className="gradient-primary text-primary-foreground"
            >
              {isRunning ? (
                <div className="animate-spin h-4 w-4 mr-1 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              Run Code
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-editor-bg rounded-lg p-4 font-mono text-sm leading-relaxed text-editor-foreground overflow-auto">
            {renderCodeWithSyntaxHighlighting(code)}
          </div>
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="relative z-10 w-full h-64 bg-transparent text-transparent caret-white font-mono text-sm leading-relaxed resize-none outline-none p-4"
            style={{ caretColor: 'white' }}
            spellCheck={false}
          />
        </div>
      </Card>

      {showAnalysis && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bug className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Code Analysis</h3>
          </div>
          
          <div className="space-y-3">
            {analysis.errors.map((error, index) => (
              <div key={index} className="error-indicator">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">
                  Line {error.line}: {error.message}
                </span>
              </div>
            ))}
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Suggestions:</h4>
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;