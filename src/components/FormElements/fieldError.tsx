interface Props {
  message?: string;
}

const FieldError = ({ message }: Props) =>
  message ? (
    <p className="m-2 rounded px-2 py-1 text-xs text-red">{message}</p>
  ) : (
    <></>
  );

export default FieldError;
