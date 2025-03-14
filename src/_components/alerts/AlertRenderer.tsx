import SuccessAlert from "./SuccesAlert";
import FailAlert from "./FailAlert";

interface AlertRendererProps {
  openAlert: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  failedMessage: string;
  successMessage: string;
}

const AlertRenderer = ({
  openAlert,
  isError,
  isSuccess,
  error,
  failedMessage,
  successMessage,
}: AlertRendererProps) => {
  if (!openAlert) return null;

  if (isError) {
    return (
      <FailAlert
        message={
          (error as { field: string; message: string }[])?.[0]?.message
            ? `${(error as { field: string; message: string }[])[0].field} ${
                (error as { field: string; message: string }[])[0].message
              }`
            : failedMessage
        }
      />
    );
  }

  if (isSuccess) {
    return <SuccessAlert message={successMessage} />;
  }

  return null;
};

export default AlertRenderer;
