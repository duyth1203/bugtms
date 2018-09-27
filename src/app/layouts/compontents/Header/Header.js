import React from 'react';
import Media from 'react-media';
import { Header } from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import { Search } from 'antd/lib/input';
import './Header.css';

const AppHeader = props => {
  return (
    <Header className="header">
      <Icon
        className="trigger"
        type={props.siderExpand ? 'menu-unfold' : 'menu-fold'}
        onClick={() => props.onSiderToggle()}
      />
      <Media query={{ maxWidth: 480 }}>
        {match =>
          ((match && props.siderExpand) || !match) && (
            <Search
              className="input-search"
              placeholder="Issue #"
              onSearch={query => props.onIssueSearch(query)}
            />
          )
        }
      </Media>
    </Header>
  );
};

export default AppHeader;
