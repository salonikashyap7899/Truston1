export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      }
      .error-container {
        text-align: center;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        max-width: 500px;
      }
      h1 {
        margin: 0;
        font-size: 3rem;
        color: #333;
        font-weight: 700;
      }
      h2 {
        margin: 1rem 0;
        font-size: 1.25rem;
        color: #666;
        font-weight: 500;
      }
      p {
        margin: 1rem 0;
        color: #999;
        font-size: 0.95rem;
      }
      a {
        display: inline-block;
        margin-top: 1.5rem;
        padding: 0.75rem 1.5rem;
        background: #0066cc;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background 0.3s;
        font-weight: 500;
      }
      a:hover {
        background: #0052a3;
      }
    </style>
  </head>
  <body>
    <div class="error-container">
      <h1>Internal Server Error</h1>
      <h2>Something went wrong</h2>
      <p>We're sorry, but something unexpected happened on our server. Please try again or contact support.</p>
      <a href="/">Go Home</a>
    </div>
  </body>
</html>`;
}
