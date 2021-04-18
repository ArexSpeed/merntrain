import {Suspense} from 'react';
import { ThemeProvider} from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Navigation, Wrapper } from 'components';
import GlobalStyles from './globalcss';
import theme from 'utils/theme';

function App() {
  const { i18n } = useTranslation();
  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Router>
        <Navigation
          items={[
            { content: 'Homepage', to: '/' },
            { content: 'Budget', to: '/budget' }
          ]}
          RightElement={(
            <div>
              <button onClick={() => i18n.changeLanguage('pl')}>pl</button>
              <button onClick={() => i18n.changeLanguage('en')}>en</button>
            </div>
          )}
        />

        <Wrapper>
          <Switch>
            <Route exact path="/">
              Homepage
            </Route>
            <Route path="/budget">
              Budget
            </Route>
          </Switch>
        </Wrapper>
      </Router>
      </ThemeProvider>
    </>
  );
}

function RootApp() {
  return (
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  )
}

export default RootApp;
