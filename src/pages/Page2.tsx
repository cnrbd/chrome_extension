
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from '../components/Button';

import { useLocation } from "react-router-dom";

//comp1 = stats display
//comp2 = tbd but prob some kinda visualization of a chart and a health rating score for the user to gauge how healthy the dish is
export default function Page2() {
  const location = useLocation();
  return (
    <div className="flex flex-col px-5 items-stretch">
      <p className="my-3">
        <Header />
        Learn about this recipe with our AI-powered assistant
      </p>

      {location.state && (
        <p className="text-red-500">
          {JSON.stringify(location.state.formValues)}
        </p>
      )}

      <Link to="/">
        <Button> Return </Button>
      </Link>
    </div>
  );
}