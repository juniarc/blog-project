import OutlinedButton from "@/_components/buttons/OutlinedButton";
import { Modal } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function TokenSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <OutlinedButton handleClick={showModal} text="Use Your Own Token" />
      <Modal
        title="Use your own token"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="submit"
      >
        <div className="my-5 flex flex-col items-center gap-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Input token"
            className="w-full bg-gray-200 rounded-md p-2"
          />
          <p className="w-full text-center">
            Didn’t have token ?{" "}
            <Link href="#" target="_blank">
              Get Token
            </Link>
          </p>
        </div>
      </Modal>
    </div>
  );
}
