'use client';

import React, { useState, useCallback } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { useTheme } from '@/components/ThemeProvider';

interface ApiUrls {
  [key: string]: string;
}

const apiUrls: ApiUrls = {
  '4.0': 'https://raw.githubusercontent.com/thorsten/phpMyFAQ/4.0/docs/openapi.json',
  '4.1': 'https://raw.githubusercontent.com/thorsten/phpMyFAQ/4.1/docs/openapi.json',
  '4.2': 'https://raw.githubusercontent.com/thorsten/phpMyFAQ/main/docs/openapi.json',
};

export default function Home(): React.ReactElement {
  const [version, setVersion] = useState<string>('4.0');
  const { theme } = useTheme();

  const handleVersionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setVersion(event.target.value);
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="page__header">
          <div>
            <h1>API Documentation</h1>
            <p className="page__description">
              The REST API of phpMyFAQ, rendered from the OpenAPI specification of the selected release.
            </p>
          </div>
          <div className="version-picker">
            <label htmlFor="api-version">phpMyFAQ version</label>
            <select
              id="api-version"
              value={version}
              onChange={handleVersionChange}
              aria-label="Select phpMyFAQ version"
            >
              <option value="4.0">Version 4.0</option>
              <option value="4.1">Version 4.1</option>
              <option value="4.2">Version 4.2</option>
            </select>
          </div>
        </div>

        <div className={`swagger-panel ${theme === 'dark' ? 'swagger-container-dark' : 'swagger-container-light'}`}>
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
  );
}
