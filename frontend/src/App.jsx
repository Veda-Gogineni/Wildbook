import React, { useState, createContext } from "react";
import { IntlProvider } from "react-intl";
import messagesEn from "./locale/en.json";
import messagesEs from "./locale/es.json";
import messagesFr from "./locale/fr.json";
import messagesIt from "./locale/it.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClient, QueryClientProvider } from "react-query";
import FrontDesk from "./FrontDesk";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import LocaleContext from "./IntlProvider";
import FooterVisibilityContext from "./FooterVisibilityContext";
import Cookies from "js-cookie";

function App() {
  const messageMap = {
    en: messagesEn,
    es: messagesEs,
    fr: messagesFr,
    it: messagesIt,
  };
  const initialLocale = Cookies.get("wildbookLangCode") || "en";
  const [locale, setLocale] = useState(initialLocale);
  const [visible, setVisible] = useState(true);
  const containerStyle = {
    maxWidth: "1440px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", 
  };

  const queryClient = new QueryClient();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
    Cookies.set("wildbookLangCode", newLocale);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleContext.Provider
        value={{ locale, onLocaleChange: handleLocaleChange }}
      >
        <div
          className="App mx-auto w-100 position-relative"
          style={containerStyle}
        >
          <BrowserRouter basename="/react">
            <IntlProvider
              locale={locale}
              defaultLocale="en"
              messages={messageMap[locale]}
            >
              <FooterVisibilityContext.Provider value={{ visible, setVisible }}>
                <FrontDesk adminUserInitialized={true} setLocale={setLocale} />
              </FooterVisibilityContext.Provider>
            </IntlProvider>
          </BrowserRouter>
        </div>
      </LocaleContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
