import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";
import BasicLayout from "./layout/basic";
import UserLayout from "./layout/user";
import pages from "./config/page";
import NotExist from './page/notexist'
import PageLoading from "./component/pageloading";

const lazyComponent = name => lazy(() => import(`./page/${name}`));
const Layout = ({ children }) => {
    const { pathname } = useLocation();

	const page = pages.filter(p => {
        let path = p.path.replace(/:\w+$/,'\\d+');
        return RegExp('^'+path+'$').test(pathname)
    })[0];
	if (!page) {
		return <NotExist/>;
	}
	if (page.layout == "basic") {
		return <BasicLayout> {children} </BasicLayout>;
	}
	if (page.layout == "user") {
		return <UserLayout isLink = { page.isLink }> {children} </UserLayout>;
	}
	return <> {children} </>;
};

const Container = () => {
	return <Layout>
        <Suspense fallback={<PageLoading />}>
            <Switch>
                {
                    pages.map((p, i) => p.name ? <Route
                            key={i}
                            exact={p.exect}
                            path={p.path}
                            component={lazyComponent(p.name)}
                        />
                    : null
                )}
                <Redirect to='/' />
            </Switch>
        </Suspense>
    </Layout>
};

export default Container;
