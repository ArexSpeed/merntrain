import { useEffect, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';
import { LoadingIndicator, Navigation, Wrapper, Button } from 'components';
import GlobalStyles from './globalcss';
import theme from 'utils/theme';

function App({ budget, fetchBudget, fetchBudgetedCategories }) {
  
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchBudget, fetchBudgetedCategories])

  console.log(budget);
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

const ConnectedApp = connect(state => {
  return {
    budget: state.budget.budget
  }
},{
  fetchBudget,
  fetchBudgetedCategories
})(App)

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
    <Suspense fallback={<LoadingIndicator />}>
      <ConnectedApp />
    </Suspense>
    </ThemeProvider>
  )
}

export default RootApp;
