
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from '../components/Button';
//comp1 = stats display
//comp2 = tbd but prob some kinda visualization of a chart and a health rating score for the user to gauge how healthy the dish is
export default function Page2() {
  return (
    <div className="flex flex-col px-5 items-stretch">
      <Header />
      <p className="my-3">
        Learn about this recipe with our AI-powered assistant
      </p>
      <Link to="/">
        <Button> Return </Button>
      </Link>
    </div>
  );
}