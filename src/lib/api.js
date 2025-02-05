const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function LoginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    if (!response.ok) {
      console.error("Response status:", response.status);
      throw new Error("Login failed");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.log("Fetch Error", error.message);
    throw error;
  }
}

export const getMe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      // console.log("Failed to fetch user. Status:", response.status);
      return null;
    }

    const data = await response.json();
    console.log("Response data:", data);

    return data;
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
};

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    // console.log("object", BASE_URL);

    const options = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };
    // console.log(`${BASE_URL}/${endpoint}`);
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    console.log("ini adalah response", response.text);
    if (!response.ok) {
      console.log(`Error ${method} ${endpoint}: ${response.statusText}`);
    }
    // console.log("Response Status:", response.status);
    // console.log("Response Headers:", response.headers);

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    // console.log(error);
    return null;
  }
};
