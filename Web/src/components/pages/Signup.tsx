import { ServiceContext } from "../../context";
import SignupForm from "../organisms/SignupForm";

export default function Signup() {
  return (
    <div>
      <h1>Signup</h1>
      {
        <ServiceContext.Consumer>
          {(context) => <SignupForm accountService={context.accountService} />}
        </ServiceContext.Consumer>
      }
    </div>
  );
}
