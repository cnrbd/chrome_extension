
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from '../components/Button';

export default function Page2() {
  return (
    <div className="w-60 h-80 flex flex-col">
      <Header />
      <Link to="/">
        <Button> Return </Button>
      </Link>
    </div>
  );
}