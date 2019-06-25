import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { assetShape } from "shapes";

import Loading from "components/Loading";
import AssetHeader from "../AssetHeader";

import styles from "./Asset.css";

const AssetFiles = lazy(() => import("../AssetFiles"));

const Asset = ({ asset, isOwner }) => (
  <div className={styles.root}>
    <AssetHeader asset={asset} isOwner={isOwner} />
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/assets/:assetID/files" component={AssetFiles} />
      </Switch>
    </Suspense>
  </div>
);

Asset.propTypes = {
  asset: PropTypes.shape(assetShape),
  isOwner: PropTypes.bool,
};

export default Asset;
