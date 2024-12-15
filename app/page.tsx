import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Home() {
  return (
    <SwaggerUI url="https://raw.githubusercontent.com/thorsten/phpMyFAQ/4.0/docs/openapi.json" />
  );
}
