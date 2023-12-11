export const usePlunk = ({ email }: { email: string }) => {
  const PLUNK_URL = "https://api.useplunk.com/v1/track";

  async function triggerPlunkEvt() {
    const options = { event: "user-signup", email, subscribed: true, data: {} };
    console.log(process?.env?.PLUNK_API_KEY);
    const data = await fetch(PLUNK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process?.env?.PLUNK_API_KEY!}`,
        Authorization: `Bearer ${process?.env?.NEXT_PUBLIC_PLUNK_API_KEY!}`,
      },
      body: JSON.stringify(options),
    });
    return await data.json();
  }

  return { triggerPlunkEvt };
};

// https://docs.useplunk.com/api-reference/actions/track
