import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BuildContextProvider } from "./Context/BuildContext";
import { DesignContext, DesignContextProvider } from "./Context/DesignContext";
import { ReportContextProvider } from './Context/ReportContext';
import { ModalContextProvider } from "./Context/ModalContext";
const Build = lazy(() => import("./Build"));
const Design = lazy(() => import("./Design"));
const Reports = lazy(() => import('./Reports'));

export default function Routes() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/build">Build</Link>
                    </li>
                    <li>
                        <Link to="/design">design</Link>
                    </li>
                    <li>
                        <Link to="/configure">configure</Link>
                    </li>
                    <li>
                        <Link to="/share">share</Link>
                    </li>
                    <li>
                        <Link to="/reports">reports</Link>
                    </li>
                </ul>
            </div>
            <DesignContextProvider>
                <BuildContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/build">
                            <ModalContextProvider>
                            <Build></Build>
                            </ModalContextProvider>
                        </Route>
                        <Route path="/design">
                            <Design></Design>
                        </Route>
                        <Route path="/configure">
                            <div className="configure">configure</div>
                        </Route>
                        <Route path="/share">
                            <div className="share">share</div>
                        </Route>
                        <Route path="/reports">
                            <ReportContextProvider>
                                <Reports></Reports>
                            </ReportContextProvider>
                        </Route>
                    </Switch>
                </Suspense>
                </BuildContextProvider>
            </DesignContextProvider>
        </Router>
    );
}
