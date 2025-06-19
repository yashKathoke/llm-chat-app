import { useState } from "react";
import { BACKEND_URL } from "../../config";

const useGetResponse = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuestion = async (question: string) => {
    setLoading(true);
    setError(null);

    try {
      let response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      let data = await response.json();

      return data.answer;
    } catch (error) {
      setError("backend api error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendQuestion, loading, error };
};

export default useGetResponse;
