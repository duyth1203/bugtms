import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from "tiny-cookie";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Select from "antd/lib/select";

const FormItem = Form.Item,
  Option = Select.Option;

const UpdateIssue = props => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 }
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 11
      }
    }
  };

  const onChange = e => {
    props.onChange(e);
  };

  const onSelectChange = (name, value) => {
    const e = {
      target: {
        type: "select",
        name,
        value
      }
    };
    props.onChange(e);
  };

  const onSubmit = (e, issueId) => {
    props.onSubmit(e, issueId);
  };

  const {
    id,
    category,
    statusIssue,
    summary,
    description,
    severity,
    priority,
    assign_to,
    reporter,
    resolution
  } = props;

  const userOpts =
    props.users &&
    props.users.map(user => (
      <Option key={user.id} value={user.username}>
        {user.name}
      </Option>
    ));

  const username = getCookie("user") && JSON.parse(getCookie("user")).username;

  return (
    <div className="app-content">
      <h1>Update Issue Details</h1>
      <p>
        <Link to={`/view-issues/${id}`}>&larr; issue {id} </Link> | {summary}
      </p>

      <Form onSubmit={onSubmit}>
        <FormItem {...formItemLayout} label="Category">
          <Select
            defaultValue={category || "General"}
            onChange={value => {
              onSelectChange("category", value);
            }}
          >
            <Option value="General">General</Option>
            <Option value="Docs">Documents</Option>
            <Option value="UI">UI</Option>
            <Option value="Others">Others</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Status">
          <Select
            defaultValue={statusIssue || "New"}
            onChange={value => {
              onSelectChange("statusIssue", value);
            }}
          >
            <Option value="New">New</Option>
            <Option value="Resolved">Resolved</Option>
            <Option value="Closed">Closed</Option>
            <Option value="Feedback">Feedback</Option>
            <Option value="Confirmed">Confirmed</Option>
            <Option value="Assigned">Assigned</Option>
            <Option value="Acknowledged">Acknowledged</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Summary *">
          <Input
            defaultValue={summary || ""}
            placeholder="Some brief words describing the issue"
            onChange={onChange}
            name="summary"
            ref={props.summaryRef}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Description *">
          <Input.TextArea
            defaultValue={description || ""}
            rows={4}
            placeholder="Details on what is going on..."
            onChange={onChange}
            name="description"
            ref={props.descriptionRef}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Severity">
          <Select
            defaultValue={severity || "1"}
            onChange={value => {
              onSelectChange("severity", value);
            }}
          >
            <Option value="1">Block/Crash</Option>
            <Option value="2">Major</Option>
            <Option value="3">Minor</Option>
            <Option value="4">Tweak/Text/Trivial/Feature</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Priority">
          <Select
            defaultValue={priority || "Normal"}
            onChange={value => {
              onSelectChange("priority", value);
            }}
          >
            <Option value="Low">Low</Option>
            <Option value="Normal">Normal</Option>
            <Option value="High">High</Option>
            <Option value="Urgent">Urgent</Option>
            <Option value="Immediate">Immediate</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Assign to">
          <Select
            defaultValue={assign_to}
            onChange={value => {
              onSelectChange("assign_to", value);
            }}
          >
            {userOpts}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Reporter">
          <Select
            defaultValue={reporter || username}
            onChange={value => {
              onSelectChange("reporter", value);
            }}
          >
            {userOpts}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Resolution">
          <Select
            defaultValue={resolution || "Open"}
            onChange={value => {
              onSelectChange("resolution", value);
            }}
          >
            <Option value="Open">Open</Option>
            <Option value="Reopen">Reopen</Option>
            <Option value="Fixed">Fixed</Option>
            <Option value="Not fixable">Not fixable</Option>
            <Option value="Will not fix">Won't fix</Option>
            <Option value="Unable to reproduce">Unable Reproduce</Option>
            <Option value="Duplicate">Duplicate</Option>
            <Option value="Cancelled">Cancelled</Option>
            <Option value="Suspended">Suspended</Option>
          </Select>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={() => onSubmit}>
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default UpdateIssue;
