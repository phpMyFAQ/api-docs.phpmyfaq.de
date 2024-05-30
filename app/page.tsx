import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Home() {
  return (
    <SwaggerUI url="https://raw.githubusercontent.com/thorsten/phpMyFAQ/main/docs/openapi.json" />
  );
}
