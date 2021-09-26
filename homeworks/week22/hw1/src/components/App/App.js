import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle, Root } from './AppStyle';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HomePage from '../../pages/HomePage/HomePage';
import ListPage from '../../pages/ListPage/ListPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import PublishPage from '../../pages/PublishPage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import { AuthContext } from '../../contexts';
import { getMe } from '../../webAPI';
import ScrollToTop from '../../ScrollToTop';

function App() {
  const [user, setUser] = useState('fetching');

  useEffect(() => {
    const init = async () => {
      const response = await getMe();

      if (!response || response.ok === 0) return setUser(null);
      setUser(response.data);
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router basename="/thosepplnexto">
          <GlobalStyle />
          <ScrollToTop />
          {user !== 'fetching' && <Header />}
          <Switch className="content">
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/about">
              <AboutPage />
            </Route>

            <Route exact path="/list">
              <ListPage />
            </Route>

            <Route exact path="/article/:id">
              <ArticlePage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/register">
              <RegisterPage />
            </Route>

            <Route path="/publish">
              <PublishPage />
            </Route>

          </Switch>
        </Router>
      </Root>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
