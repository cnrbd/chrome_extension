
import { Link } from "react-router-dom";
import { Button } from './Button';

export default function Page2() {
    return (
        <div>
            <Link to="/home">
                <Button> Hello </Button>
            </Link>
        </div >
    );
}