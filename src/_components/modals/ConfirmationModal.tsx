import { Modal } from "antd";

export default function ConfirmationModal({
  isModalOpen,
  handleCancel,
  footer,
  content,
  title,
}: {
  isModalOpen: boolean;
  handleCancel: () => void;
  footer?: React.ReactNode;
  content: string;
  title: string;
}) {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      centered
      width={300}
      okText="Yes"
      cancelText="Cancel"
      footer={footer}
    >
      <p>{content}</p>
    </Modal>
  );
}
