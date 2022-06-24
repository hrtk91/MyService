import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import AuthForm from "../molecules/AuthForm";

export default function SignupForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = (location.state as any)?.from?.pathname || "/";

  const clear = (): void => {
    setId("");
    setPassword("");
  };

  const signup = async (): Promise<void> => {
    try {
      await auth.signup(id, password);
      clear();
      navigate(from, { replace: true });
    } catch (err) {
      console.table(err);
      alert("サインインに失敗しました。もう一度やり直してください。");
    }
  };

  return (
    <AuthForm
      onChangeId={setId}
      onChangePassword={setPassword}
      onClickSubmit={signup}
    />
  );
}
