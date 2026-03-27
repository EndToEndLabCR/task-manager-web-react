import React, { useEffect } from "react";
import { Modal, Form, Input, notification } from "antd";
import ProjectColorPicker from "../project-color-picker/ProjectColorPicker";
import type { ProjectFormValues, ProjectFormModalProps } from "../../types/project.types";
import "./ProjectFormModal.scss";

const DEFAULT_VALUES: ProjectFormValues = {
  name: "",
  description: "",
  color: "blue",
};

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  initialValues,
}) => {
  const [form] = Form.useForm<ProjectFormValues>();
  const isEditing = !!initialValues?.id;

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues ?? DEFAULT_VALUES);
    }
  }, [open, initialValues, form]);

  const handleClose = (): void => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = async (): Promise<void> => {
    const values = await form.validateFields();
    onSubmit(values);
    form.resetFields();
    notification.success({
      message: isEditing ? "Project updated" : "Project created",
      description: `"${values.name}" has been ${isEditing ? "updated" : "created"} successfully.`,
      placement: "topRight",
    });
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Edit Project" : "New Project"}
      okText={isEditing ? "Save changes" : "Create project"}
      cancelText="Cancel"
      onOk={handleSubmit}
      onCancel={handleClose}
      confirmLoading={loading}
      className="project-form-modal"
      destroyOnClose
      width={520}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        initialValues={DEFAULT_VALUES}
        className="project-form-modal__form"
      >
        {/* Name */}
        <Form.Item
          label="Project name"
          name="name"
          rules={[
            { required: true, message: "Please enter a project name" },
            { max: 100, message: "Name cannot exceed 100 characters" },
          ]}
        >
          <Input
            placeholder="e.g. Q4 Marketing Campaign"
            size="large"
            showCount
            maxLength={100}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            placeholder="What is this project about? (optional)"
            rows={3}
            maxLength={300}
            showCount
          />
        </Form.Item>

        {/* Color */}
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please select a color" }]}
        >
          <ProjectColorPicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectFormModal;
