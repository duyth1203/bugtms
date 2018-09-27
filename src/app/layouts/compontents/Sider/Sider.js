import React from 'react';
import Media from 'react-media';
import { Sider } from 'antd/lib/layout';
import AppSiderMenu from './Menu/Menu';
import AppSiderRoutes from './routes';
import logo from './logo.png';
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
          collapsed={props.siderExpand}
          onBreakpoint={() => props.onSiderToggle()}
          className="sider"
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

/*class AppSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: AppSiderRoutes
    };
  }

  fetchSubMenu = link => {
    fetch(link.fetchFrom)
      .then(response => response.json())
      .then(subs => {
        subs.forEach(sub => {
          link.sub.push({
            to: link.fetchFrom + '/' + sub.id,
            label: sub.name
          });
        });
        return link;
      });
  };

  componentDidMount() {
    let fetchedRoutes = this.state.routes.map(async route => {
      return await {
        links: route.links.map(async link => {
          return link.fetchFrom ? await this.fetchSubMenu(link) : link;
        }),
        position: route.position
      };
    });
    Promise.all(fetchedRoutes).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <Media query={{ minWidth: 480 }}>
        {match => (
          <Sider
            trigger={null}
            breakpoint="lg"
            collapsedWidth={match ? 85 : 0}
            collapsible
            collapsed={this.props.siderExpand}
            onBreakpoint={() => this.props.onSiderToggle()}
            className="sider"
          >
            <div className="app-logo">
              <img src={logo} alt="Logo" />
            </div>
            <AppSiderMenu routes={this.state.routes[0]} />
            <AppSiderMenu routes={this.state.routes[1]} />
          </Sider>
        )}
      </Media>
    );
  }
}*/
