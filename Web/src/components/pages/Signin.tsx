import SigninForm from "../organisms/SigninForm";
import { ServiceContext } from "../../context";

export default function Signin() {
  return (
    <div>
      <h1>Signin</h1>
      {
        <ServiceContext.Consumer>
          {(context) => <SigninForm accountService={context.accountService} />}
        </ServiceContext.Consumer>
      }
    </div>
  );
}
