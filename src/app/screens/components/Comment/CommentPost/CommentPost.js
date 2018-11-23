import React from "react";
import Form from "antd/lib/form";
import Button from  "antd/lib/button";
import Input from  "antd/lib/input";

const FormItem = Form.Item,
    TextArea = Input.TextArea;

const PostComment = props => {
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

    const onSubmit = e => {
        props.onSubmit(e);
    };

    return (
        <Form onSubmit={onSubmit}>
            <FormItem {...formItemLayout} label="Note">
                <TextArea autosize={{ minRows: 3, maxRows: 6 }}
                    onChange={onChange} name="note_content"
                />
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => onSubmit}
                >
                    Submit
                </Button>
            </FormItem>
        </Form>
    );
};

export default PostComment;
