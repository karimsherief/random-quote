import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const API = "https://api.quotable.io/random";

export default function App() {
  const [quote, setQuote] = useState("Let time be your only competitor.");
  const [author, setAuthor] = useState("Ahmed Saber");
  
  function handleCopy() {
    navigator.clipboard.writeText(quote);
    toast.success("Coppied to clipboard");
  }
  async function generateRandomQuote() {
    await axios.get(API).then((res) => {
      setAuthor(res.data.author);
      setQuote(res.data.content);
    });
  }

  useEffect(() => {
    generateRandomQuote();
  }, []);

  return (
    <div>
      <h1>Quote Generator</h1>
      <div className="container">
        <p>{quote}</p>
        <span>{author}</span>
        <div className="btns">
          <button className="btn" onClick={handleCopy}>
            copy
          </button>
          <button onClick={generateRandomQuote}>generate another quote</button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
