type FormMessageProps = {
  text: string;
  type: "success" | "error";
};

function FormMessage({ text, type }: FormMessageProps) {
  return (
    <p className={`auth-form__message auth-form__message--${type}`}>
      {text}
    </p>
  );
}

export default FormMessage;
