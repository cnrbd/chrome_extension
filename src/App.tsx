import "./App.css";
import { getCurrentTabUrl } from "./utils/getCurrentTabUrl";
import { useEffect, useState } from "react";

export default function App() {
  const [currentTabUrl, setCurrentTabUrl] = useState<string | null>("");

  //async function nested in useeffect to get the current tab url
  //dependecies should have the currentTabUrl since each remount should reset the currentTabUrl
  useEffect(() => {
    const url = async () => {
      const tab = await getCurrentTabUrl();
      setCurrentTabUrl(tab?.url ?? "");
    };
    url();
  }, [currentTabUrl]);

  return (
    <div>
      <h1> hello</h1>
      {currentTabUrl && <p>link: {currentTabUrl}</p>}
    </div>
  );
}
