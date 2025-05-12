
/**
 * Error handling utilities for enhanced error management
 * This module provides consistent error handling across the application
 */

import { toast } from "sonner";

// Error types for better categorization
export enum ErrorType {
  NETWORK = "network",
  VALIDATION = "validation",
  AUTHORIZATION = "authorization",
  SERVER = "server",
  CLIENT = "client",
  UNKNOWN = "unknown"
}

// Error with additional context
export interface EnhancedError extends Error {
  type?: ErrorType;
  context?: Record<string, any>;
  originalError?: any;
}

/**
 * Create a standardized error with additional context
 */
export const createError = (
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  context?: Record<string, any>,
  originalError?: any
): EnhancedError => {
  const error = new Error(message) as EnhancedError;
  error.type = type;
  error.context = context;
  error.originalError = originalError;
  return error;
};

/**
 * Handle errors with appropriate UI feedback
 * @param error The error to handle
 * @param silent If true, don't show UI notification
 */
export const handleError = (error: any, silent = false): void => {
  const enhancedError = normalizeError(error);
  
  // Log error for debugging
  console.error("Error caught:", enhancedError);
  
  // Show user-friendly notification unless silent
  if (!silent) {
    const message = getUserFriendlyMessage(enhancedError);
    toast.error(message, {
      description: enhancedError.type === ErrorType.NETWORK 
        ? "Please check your connection and try again." 
        : undefined
    });
  }
};

/**
 * Convert any error into a standardized format
 */
const normalizeError = (error: any): EnhancedError => {
  if (error instanceof Error) {
    // Already an Error object
    const enhancedError = error as EnhancedError;
    if (!enhancedError.type) {
      enhancedError.type = determineErrorType(error);
    }
    return enhancedError;
  } else if (typeof error === "string") {
    // Convert string to error
    return createError(error);
  } else {
    // Handle unknown error format
    return createError(
      "An unexpected error occurred",
      ErrorType.UNKNOWN,
      { rawError: error }
    );
  }
};

/**
 * Determine error type from error object
 */
const determineErrorType = (error: any): ErrorType => {
  // Network errors
  if (error.message?.includes("Network") || 
      error.message?.includes("fetch") || 
      error.message?.includes("connection")) {
    return ErrorType.NETWORK;
  }
  
  // Auth errors
  if (error.status === 401 || error.status === 403 || 
      error.message?.includes("unauthorized") || 
      error.message?.includes("permission")) {
    return ErrorType.AUTHORIZATION;
  }
  
  // Validation errors
  if (error.status === 400 || error.message?.includes("validation")) {
    return ErrorType.VALIDATION;
  }
  
  // Server errors
  if ((error.status && error.status >= 500) || 
      error.message?.includes("server")) {
    return ErrorType.SERVER;
  }
  
  return ErrorType.UNKNOWN;
};

/**
 * Get user-friendly error message
 */
const getUserFriendlyMessage = (error: EnhancedError): string => {
  const defaultMessages: Record<ErrorType, string> = {
    [ErrorType.NETWORK]: "Network connection issue",
    [ErrorType.VALIDATION]: "Please check your input",
    [ErrorType.AUTHORIZATION]: "You don't have permission for this action",
    [ErrorType.SERVER]: "Server error occurred",
    [ErrorType.CLIENT]: "An error occurred in the application",
    [ErrorType.UNKNOWN]: "Something went wrong"
  };
  
  // Use error message if available, otherwise use default
  return error.message || defaultMessages[error.type || ErrorType.UNKNOWN];
};

/**
 * Try to execute a function and handle any errors
 * @param fn Function to execute
 * @param errorHandler Custom error handler (optional)
 * @returns Result of the function or undefined if error
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorHandler?: (error: any) => void
): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    } else {
      handleError(error);
    }
    return undefined;
  }
};

/**
 * Wrap component event handlers with error handling
 * @param handler The event handler to wrap
 * @returns Wrapped handler with error handling
 */
export const withErrorHandling = <T extends (...args: any[]) => any>(
  handler: T
): ((...args: Parameters<T>) => ReturnType<T> | void) => {
  return (...args: Parameters<T>) => {
    try {
      const result = handler(...args);
      
      // Handle promises
      if (result instanceof Promise) {
        return result.catch(error => {
          handleError(error);
        });
      }
      
      return result;
    } catch (error) {
      handleError(error);
    }
  };
};
