import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReportIssue from './ReportIssue';
import notification from 'antd/lib/notification';
import moment from 'moment';

class ReportIssueContainer extends Component {
  constructor() {
    super();
    this.state = {
      projectId: '',
      bugNote: '',
      attachment: '',
      category: '',
      status: '',
      updated: '',
      summary1: '',
      showMessage: false,
      messageType: 'info'
    };
  }

  handleSubmit = e => {
    // TODO: validate data
    e.preventDefault();
    let {
      projectId,
      bugNote,
      attachment,
      category,
      status,
      updated,
      summary1
    } = this.state;

    // Process default value of selectors if not changed
    category = category.length < 1 ? 'General' : category;
    status = status.length < 1 ? 'Buggy' : status;
    updated =
      updated.length < 1
        ? (updated = moment().format('YYYYMMDD') + '000000')
        : updated;

    fetch('http://localhost:3000/issues', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        projectId,
        bugNote,
        attachment,
        category,
        status,
        updated,
        summary1
      })
    }) // done, show result in message
      .then(data =>
        this.setState({ messageType: 'success', showMessage: true })
      )
      .catch(err => this.setState({ messageType: 'error', showMessage: true }));
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate() {
    this.state.showMessage &&
      ReactDOM.render(
        notification[this.state.messageType]({
          message: 'Notification',
          description:
            this.state.messageType === 'success'
              ? 'Successfully reported issue'
              : 'Sorry, failed reporting issue',
          duration: 2,
          placement: 'topRight'
        }),
        document.querySelector('#notiWrapper')
      );
  }

  render() {
    return (
      <React.Fragment>
        <span id="notiWrapper" />
        <ReportIssue
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default ReportIssueContainer;
