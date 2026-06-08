import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { LanguageProvider } from './context/LanguageContext.jsx'
import App from './App.jsx'
import './index.css'

const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </GoogleReCaptchaProvider>
  </StrictMode>
)
