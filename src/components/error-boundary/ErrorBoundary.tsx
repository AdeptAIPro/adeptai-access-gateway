import React, { Component, ErrorInfo } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { handleError } from '@/utils/error-handler';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant?: 'default' | 'compact' | 'fullscreen';
  onError?: (error: Error, componentStack: string) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    handleError(error, false);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback 
          error={this.state.error!} 
          resetErrorBoundary={this.handleReset}
          variant={this.props.variant}
        />
      );
    }

    return this.props.children;
  }
}
