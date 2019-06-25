import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import LoadingBar from "react-redux-loading-bar";
import {
  Authenticated,
  Initializer,
  history,
  ScrollToTop,
} from "utils";

import Navigation from "containers/Navigation";
import Notifications from "containers/Notifications";
import Loading from "components/Loading";
import ErrorBoundary from "utils/ErrorBoundary";
import Modals from "modals";

import styles from "./App.css";

const AssetDetail = lazy(() => import("containers/AssetDetail"));

const App = () => (
  <ConnectedRouter history={history}>
    <ScrollToTop>
      <div className={styles.app}>
        <ErrorBoundary>
          <Notifications />
          <Modals />
          <LoadingBar className={styles.loader} />
          <Authenticated>
            <Initializer>
              <Navigation />
              <div className={styles.container}>
                <Suspense fallback={<Loading />}>
                  <Switch>
                    <Route path="/assets/:assetID" component={AssetDetail} />
                  </Switch>
                </Suspense>
              </div>
            </Initializer>
          </Authenticated>
        </ErrorBoundary>
      </div>
    </ScrollToTop>
  </ConnectedRouter>
);

export default App;
