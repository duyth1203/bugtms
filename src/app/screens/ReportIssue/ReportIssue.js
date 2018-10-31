import React from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import Form from "antd/lib/form";
import Select from "antd/lib/select";

const FormItem = Form.Item,
  Option = Select.Option;

const ReportIssue = props => {
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

  const onDateChange = (date, dateStr) => {
    const e = {
      target: {
        type: "select",
        name: "updated",
        value: dateStr.replace(/-/g, "") + "000000"
      }
    };
    props.onChange(e);
  };

  const onCategoryChange = value => {
    const e = {
      target: {
        type: "select",
        name: "category",
        value
      }
    };
    props.onChange(e);
  };

  const onStatusChange = value => {
    const e = {
      target: {
        type: "select",
        name: "status",
        value
      }
    };
    props.onChange(e);
  };

  return (
    <div className="app-content">
      <h1>Report issue details</h1>

      <Form onSubmit={props.onSubmit}>
        <FormItem {...formItemLayout} label="ProjectID">
          <Input
            placeholder="Id of working project"
            onChange={onChange}
            name="projectId"
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Notes">
          <Input
            placeholder="Number of notes"
            onChange={onChange}
            name="bugNote"
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Attachments">
          <Input
            placeholder="Number of attachments"
            onChange={onChange}
            name="attachment"
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Category">
          <Select defaultValue="General" onChange={onCategoryChange}>
            <Option value="General">General</Option>
            <Option value="Docs">Documents</Option>
            <Option value="Others">Others</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Status">
          <Select defaultValue="Buggy" onChange={onStatusChange}>
            <Option value="Buggy">Buggy</Option>
            <Option value="Crash">Crash</Option>
            <Option value="Others">Others</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Updated">
          <DatePicker onChange={onDateChange} />
        </FormItem>
        <FormItem {...formItemLayout} label="Summary">
          <Input.TextArea
            rows={4}
            placeholder="Some summaries here..."
            onChange={onChange}
            name="summary1"
          />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default ReportIssue;
