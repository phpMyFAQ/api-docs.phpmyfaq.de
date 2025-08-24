"use client";

import React, { useState, useCallback, useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface ApiUrls {
  [key: string]: string;
}

export default function Home(): React.ReactElement {
  const [version, setVersion] = useState<string>('4.0');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize dark mode based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    // Apply dark mode to the document
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleVersionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setVersion(event.target.value);
  }, []);

  const handleDarkModeToggle = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  }, []);

  const apiUrls: ApiUrls = {
    '4.0': 'https://raw.githubusercontent.com/thorsten/phpMyFAQ/4.0/docs/openapi.json',
    '4.1': 'https://raw.githubusercontent.com/thorsten/phpMyFAQ/main/docs/openapi.json',
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="swagger-ui mx-auto px-4 py-8">
        {/* Main Swagger UI Container with integrated controls */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-lg border shadow-lg overflow-hidden wrapper`}>

          {/* Controls Header inside Swagger container */}
          <div className={`${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
          } mx-4 mt-4 mb-2 px-6 py-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>

            {/* Version Selector */}
            <div className="flex items-center space-x-3">
              <label htmlFor="api-version" className={`font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                API Version:
              </label>
              <select
                id="api-version"
                value={version}
                onChange={handleVersionChange}
                className={`${
                  isDarkMode 
                    ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-400' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } px-3 py-1.5 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm`}
                aria-label="Select API version"
              >
                <option value="4.0">Version 4.0</option>
                <option value="4.1">Version 4.1</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-3">
              <span className={`font-medium text-sm ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Theme:
              </span>
              <button
                onClick={handleDarkModeToggle}
                className={`${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`${
                    isDarkMode ? 'translate-x-5' : 'translate-x-1'
                  } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                />
              </button>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {isDarkMode ? '🌙' : '☀️'}
              </span>
            </div>
          </div>

          {/* Swagger UI Content */}
          <div className={`${
            isDarkMode ? 'swagger-container-dark' : 'swagger-container-light'
          }`}>
            <SwaggerUI
              url={apiUrls[version]}
              deepLinking={true}
              displayOperationId={false}
              defaultModelsExpandDepth={1}
              defaultModelExpandDepth={1}
              defaultModelRendering="example"
              displayRequestDuration={true}
              docExpansion="list"
              filter={true}
              showExtensions={true}
              showCommonExtensions={true}
              tryItOutEnabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
