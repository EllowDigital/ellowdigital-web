
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    
    // Report to analytics if available
    if (window.gtag) {
      window.gtag('event', 'error', {
        error_message: error.message,
        error_name: error.name,
        error_stack: error.stack,
        error_info: JSON.stringify(errorInfo),
      });
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
          <div className="max-w-md w-full p-6 rounded-lg bg-card border border-border">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4 text-muted-foreground">
              We're sorry, but an error occurred while rendering this page.
            </p>
            {this.state.error && (
              <div className="p-3 bg-muted rounded mb-4 overflow-auto max-h-32">
                <code className="text-sm text-red-500">
                  {this.state.error.toString()}
                </code>
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  window.localStorage.clear();
                  window.location.href = "/";
                }}
                className="px-4 py-2 bg-transparent border border-border text-foreground rounded-md hover:bg-muted transition-colors"
              >
                Clear Data & Restart
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
