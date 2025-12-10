import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import App from "App";
import reportWebVitals from "reportWebVitals";
import store from "store/reduxStore";
import { theme } from "util/theme";
import * as Sentry from "@sentry/react";



Sentry.init({
  dsn: process.env.REACT_APP_ADMIN_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [
    Sentry.replayIntegration()
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Sentry.ErrorBoundary fallback={<p>Something went wrong. Please try again later.</p>}>
   
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: theme.greyText,
        colorPrimaryHover: theme.midGrey,
        colorText: theme.white
      }
    }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
  </Sentry.ErrorBoundary>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
