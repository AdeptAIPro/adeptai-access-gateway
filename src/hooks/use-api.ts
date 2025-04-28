import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  body?: any;
  headers?: Record<string, string>;
}

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const handleApiError = (error: any) => {
    console.error("API Error:", error);
    
    // Safely extract error message with proper type checking
    let errorMessage = "An unknown error occurred";
    if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string') {
        errorMessage = error.message;
      } else if ('error' in error && typeof error.error === 'string') {
        errorMessage = error.error;
      }
    }
    
    toast.error("API Error", {
      description: errorMessage
    });
    
    setError(errorMessage);
  };

  const callApi = useCallback(
    async (
      url: string,
      method: HTTPMethod = "GET",
      options: RequestOptions = {}
    ) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const headers = {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        };

        const body = options.body ? JSON.stringify(options.body) : null;

        const response = await fetch(url, {
          method,
          headers,
          body,
          ...options,
        });

        if (!response.ok) {
          // Attempt to parse the JSON body for a more descriptive error
          let errorData;
          try {
            errorData = await response.json();
          } catch (parseError) {
            // If JSON parsing fails, fall back to the status text
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // If the error data contains a message, use that
          if (errorData && errorData.message) {
            throw new Error(errorData.message);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const responseData = await response.json();
        processApiResponse(responseData);
        return responseData;
      } catch (e: any) {
        handleApiError(e);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const processApiResponse = (response: any) => {
    if (!response) {
      toast({
        title: "API Response Error",
        description: "Received null response from API",
        variant: "destructive",
      });
      return;
    }
    
    if (response.error && typeof response === 'object') {
      const errorMessage = 'message' in response ? String(response.message) : 
                           'error' in response ? String(response.error) : 
                           'Unknown error';
      
      toast.error("API Response Error", {
        description: errorMessage
      });
      return;
    }

    setData(response);
  };

  const get = useCallback(
    (url: string, options: RequestOptions = {}) => callApi(url, "GET", options),
    [callApi]
  );

  const post = useCallback(
    (url: string, options: RequestOptions = {}) => callApi(url, "POST", options),
    [callApi]
  );

  const put = useCallback(
    (url: string, options: RequestOptions = {}) => callApi(url, "PUT", options),
    [callApi]
  );

  const del = useCallback(
    (url: string, options: RequestOptions = {}) => callApi(url, "DELETE", options),
    [callApi]
  );

  return {
    isLoading,
    error,
    data,
    get,
    post,
    put,
    del,
  };
}
