
import { Link } from "react-router-dom";
import { Button } from './Button';

export default function Page2() {
    return (
      <div>
        <p>hello</p>
        <Link to="/">
          <Button> Hello </Button>
        </Link>
      </div>
    );
}