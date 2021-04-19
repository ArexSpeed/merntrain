import {Suspense} from 'react';
import { ThemeProvider} from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { LoadingIndicator, Navigation, Wrapper, Button } from 'components';
import GlobalStyles from './globalcss';
import theme from 'utils/theme';

function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <GlobalStyles />

      <Router>
        <Navigation
          items={[
            { content: 'Homepage', to: '/' },
            { content: 'Budget', to: '/budget' }
          ]}
          RightElement={(
            <div>
              <Button variant="regular" onClick={() => i18n.changeLanguage('pl')}>pl</Button>
              <Button variant="regular" onClick={() => i18n.changeLanguage('en')}>en</Button>
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
    </>
  );
}

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
    <Suspense fallback={<LoadingIndicator />}>
      <App />
    </Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
