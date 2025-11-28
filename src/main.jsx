import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import '@styles/global.css'
import App from './app/App.jsx'
import store, { persistor } from '@app/store'
import { theme } from '@utils/theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.greyText,
          colorPrimaryHover: theme.midGrey,
          colorText: theme.white
        }
      }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </StrictMode>,
)
