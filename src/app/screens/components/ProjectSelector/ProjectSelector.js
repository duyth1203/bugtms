import React from "react";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Checkbox from "antd/lib/checkbox";
import Button from "antd/lib/button";

const FormItem = Form.Item,
  Option = Select.Option;

const ProjectSelector = props => {
  const selectedPjId = (props.projects[0] && props.projects[0].id) || -1;

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

  const onSubmit = e => {
    e.preventDefault();
    props.onSubmit();
  };

  return +selectedPjId === -1 ? (
    <h1>No project available</h1>
  ) : (
    <div className="app-content project-selector">
      <h1>Choose a project to continue</h1>
      <br />
      <Form onSubmit={onSubmit}>
        <FormItem {...formItemLayout} label="Project name">
          <Select
            defaultValue={selectedPjId}
            onChange={value => {
              onSelectChange("selectedProject", value);
            }}
          >
            {props.projects.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Make as default">
          <Checkbox onChange={onChange} name="markAsDefault" />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Select
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default ProjectSelector;
