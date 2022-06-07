import { useState } from "react";
import AccountService from "../../services/AccountService";
import AuthForm from "../molecules/AuthForm";

interface IProps {
  accountService: AccountService;
}

export default function SigninForm(props: IProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const accountService = props.accountService;
  const clear = (): void => {
    setId("");
    setPassword("");
  };
  const signin = async (): Promise<void> => {
    try {
      accountService.signin(id, password);
      clear();
      alert("サインインに成功しました。");
    } catch (err) {
      console.table(err);
      alert("サインインに失敗しました。もう一度やり直してください。");
    }
  };

  return (
    <AuthForm
      onChangeId={setId}
      onChangePassword={setPassword}
      onClickSubmit={signin}
    />
  );
}
