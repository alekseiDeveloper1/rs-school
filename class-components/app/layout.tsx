'use client';
import { store } from './store.ts';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>class-components</title>
        </head>
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    </Provider>
  );
}
