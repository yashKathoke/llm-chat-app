import { useState } from "react";
import { BACKEND_URL } from "../../config.ts";

const useGetResponse = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuestion = async (question: String) => {
    setLoading(true);
    setError(null);

    try {
      let response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        body: JSON.stringify(question),
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

  return {sendQuestion, loading, error}
};

export default useGetResponse;
