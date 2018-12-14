import React from "react";
import { getCookie } from "tiny-cookie";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import message from "antd/lib/message";

const FormItem = Form.Item,
  Option = Select.Option;

const NewProject = props => {
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

  const userId = getCookie("user") && JSON.parse(getCookie("user")).id;

  if (!userId)
    message.warning(
      "Could not identifie user, please log out and login again."
    );

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

  const onDatePickerChange = (name, dateString) => {
    const e = {
      target: {
        type: "datepicker",
        name,
        value: dateString
      }
    };
    props.onChange(e);
  };

  const onSubmit = e => {
    props.onSubmit(e);
  };

  const userOpts =
    props.users &&
    props.users.map(user => (
      <Option key={user.id} value={user.id}>
        {user.name}
      </Option>
    ));

  return (
    <div className="app-content">
      <h1>Add new project</h1>

      <Form onSubmit={onSubmit}>
        <FormItem {...formItemLayout} label="Project name">
          <Input placeholder="#saveStark" onChange={onChange} name="name" />
        </FormItem>
        <FormItem {...formItemLayout} label="Manager">
          <Select
            defaultValue={[]}
            onChange={value => {
              onSelectChange("manager", value);
            }}
          >
            {userOpts}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Project manager">
          <Select
            defaultValue={[]}
            onChange={value => {
              onSelectChange("project_manager", value);
            }}
          >
            {userOpts}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Project leader">
          <Select
            defaultValue={[]}
            onChange={value => {
              onSelectChange("project_leader", value);
            }}
          >
            {userOpts}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Members">
          <Select
            mode="multiple"
            defaultValue={[userId]}
            onChange={value => {
              onSelectChange("members", value);
            }}
          >
            {userOpts}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Deadline">
          <DatePicker
            onChange={(date, dateString) =>
              onDatePickerChange("deadline", dateString)
            }
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Programing language">
          <Select
            onChange={value => {
              onSelectChange("programming_language", value);
            }}
          >
            <Option value="C/C++">C/C++</Option>
            <Option value="C#">C#</Option>
            <Option value="Golang">Golang</Option>
            <Option value="Haskell">Haskell</Option>
            <Option value="Java">Java</Option>
            <Option value="Javascript/Typescript">Javascript/Typescript</Option>
            <Option value="Kotlin">Kotlin</Option>
            <Option value="Python">Python</Option>
            <Option value="PHP">PHP</Option>
            <Option value="Ruby">Ruby</Option>
            <Option value="Rust">Rust</Option>
            <Option value="Swift">Swift</Option>
            <Option value="Others">Others</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Database">
          <Select
            onChange={value => {
              onSelectChange("db", value);
            }}
          >
            <Option value="Json">Json</Option>
            <Option value="MongoDB">MongoDB</Option>
            <Option value="MySQL">MySQL</Option>
            <Option value="SQL Server">SQLServer</Option>
            <Option value="SQLite">SQLite</Option>
            <Option value="XML">XML</Option>
            <Option value="Others">Others</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Platform">
          <Select
            onChange={value => {
              onSelectChange("platform", value);
            }}
          >
            <Option value="Android">Android</Option>
            <Option value="iOS">iOS</Option>
            <Option value="ChromeOS">ChromeOS</Option>
            <Option value="MacOS/OSX">MacOS/OSX</Option>
            <Option value="Microsoft Windows">Microsoft Windows</Option>
            <Option value="Unix/Linux">Unix/Linux</Option>
            <Option value="Others">Others</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Type">
          <Input onChange={onChange} name="type" />
        </FormItem>
        <FormItem {...formItemLayout} label="Professional business">
          <Input onChange={onChange} name="professional_business" />
        </FormItem>
        <FormItem {...formItemLayout} label="Web server">
          <Input onChange={onChange} name="web_server" />
        </FormItem>
        <FormItem {...formItemLayout} label="Management">
          <Input onChange={onChange} name="managerment" />
        </FormItem>
        <FormItem {...formItemLayout} label="Application server">
          <Input onChange={onChange} name="application_server" />
        </FormItem>
        <FormItem {...formItemLayout} label="System networking">
          <Input onChange={onChange} name="system_networking" />
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

export default NewProject;
