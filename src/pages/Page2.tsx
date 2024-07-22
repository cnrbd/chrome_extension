
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from '../components/Button';

export default function Page2() {
  return (
    <div className="flex flex-col px-5 items-stretch">
      <Header />
      <Link to="/">
        <Button> Return </Button>
      </Link>
    </div>
  );
}