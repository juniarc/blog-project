import { Modal } from "antd";

export default function NavigationModal({
  isModalOpen,
  handleOK,
  handleCancel,
}: {
  isModalOpen: boolean;
  handleOK: () => void;
  handleCancel: () => void;
}) {
  return (
    <Modal
      title="User ID Not Found"
      open={isModalOpen}
      onOk={handleOK}
      onCancel={handleCancel}
      cancelButtonProps={{ hidden: true }}
      centered
    >
      <p>Please create a user first before proceeding.</p>
    </Modal>
  );
}
