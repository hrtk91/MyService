import { useState } from "react";
import AccountService from "../../services/AccountService";
import AuthForm from "../molecules/AuthForm";

interface IProps {
  accountService: AccountService;
}

export default function SignupForm(props: IProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const accountService = props.accountService;
  const clear = (): void => {
    setId("");
    setPassword("");
  };
  const signup = async (): Promise<void> => {
    try {
      accountService.signup(id, password);
      clear();
      alert("サインアップに成功しました。");
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
