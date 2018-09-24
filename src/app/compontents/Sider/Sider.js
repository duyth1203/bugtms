import React from 'react';
import Media from 'react-media';
import { Sider } from 'antd/lib/layout';
import AppSiderMenu from './Menu/Menu';
import AppSiderRoutes from './routes';
import logo from './logo.svg';
import './Sider.css';

const AppSider = props => {
  return (
    <Media query={{ minWidth: 480 }}>
      {match => (
        <Sider
          trigger={null}
          breakpoint="lg"
          collapsedWidth={match ? 85 : 0}
          collapsible
          collapsed={props.siderCollapsed}
          onBreakpoint={props.onSiderToggle}
        >
          <div className="app-logo">
            <img src={logo} alt="Logo" />
          </div>
          <AppSiderMenu routes={AppSiderRoutes[0]} />
          <AppSiderMenu routes={AppSiderRoutes[1]} />
        </Sider>
      )}
    </Media>
  );
};

export default AppSider;
