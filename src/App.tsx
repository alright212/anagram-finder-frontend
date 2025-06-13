import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import theme from "./theme/chakra-theme";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AnagramSearchPage from "./pages/AnagramSearchPage.tsx";
import WordbaseImportPage from "./pages/WordbaseImportPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import { AppStateProvider } from "./context/AppStateContext";
import TranslationLoader from "./components/TranslationLoader";
import "./debug-translations"; // Import debug functions
import "./debug-api-response"; // Import API response debugger

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <AppStateProvider>
          <TranslationLoader>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<AnagramSearchPage />} />
                  <Route path="/import" element={<WordbaseImportPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </Layout>
            </Router>
          </TranslationLoader>
        </AppStateProvider>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
