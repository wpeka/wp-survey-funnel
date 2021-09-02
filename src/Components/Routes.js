import React, { Suspense, lazy, useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { BuildContextProvider } from "./Context/BuildContext";
import { DesignContext, DesignContextProvider } from "./Context/DesignContext";
import { ReportContextProvider } from './Context/ReportContext';
import { ModalContextProvider } from "./Context/ModalContext";
import { ShareContextProvider } from "./Context/ShareContext";
import fetchData from "../HelperComponents/fetchData";
const Build = lazy(() => import("./Build"));
const Design = lazy(() => import("./Design"));
const Reports = lazy(() => import('./Reports'));
const Share = lazy(() => import('./Share'));
const Configure = lazy(() => import('./Configure'));
const dashboardLink = document.getElementById('dashboardLink').value;
export default function Routes() {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            status,
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_get_status',
            post_id,
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData(ajaxURL, data)
        .then(data => {
            setStatus( data.data );
        });
    }, []);

    const changeStatus = (e) => {
        e.target.classList.add('surveyfunnel-lite-button-loading');
        const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            status,
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_change_status',
            post_id,
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData(ajaxURL, data)
        .then(data => {
            e.target.classList.remove('surveyfunnel-lite-button-loading');
            if ( data?.success ) {
                setStatus( data.data );
                
            }
        });
    }
    
    return (
        <Router>
            <div className="surveyfunnel-lite-cb-nav-container">
                <div className="surveyfunnel-lite-back">                    
                    <img src={require('./Build/BuildImages/arrow.png')}></img><a href={dashboardLink}>Back to dashboard</a>
                </div>
                <ul>
                    <li>
                        <NavLink to="/build" activeStyle={{ color: "#0F4C81" }}>Build</NavLink>
                    </li>
                    <li>
                        <NavLink to="/design" activeStyle={{ color: "#0F4C81" }}>Design</NavLink>
                    </li>
                    <li>
                        <NavLink to="/configure" activeStyle={{ color: "#0F4C81" }}>Configure</NavLink>
                    </li>
                    <li>
                        <NavLink to="/share" activeStyle={{ color: "#0F4C81" }}>Deploy</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" activeStyle={{ color: "#0F4C81" }}>Reports</NavLink>
                    </li>
                </ul>
                <div>
                    <button onClick={changeStatus}>{ status === 'draft' ? 'Publish' : 'Unpublish' }</button>
                </div>
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
                            <Configure />
                        </Route>
                        <Route path="/share">
                            <ShareContextProvider>
                                <Share />
                            </ShareContextProvider>
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
