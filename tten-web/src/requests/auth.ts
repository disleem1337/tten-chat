import { client } from "./client";

type ApiResponse<T> =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: T;
    };

export async function login(
  username: string,
  password: string
): Promise<ApiResponse<{ authToken: string }>> {
  const { data } = await client.post("/api/auth/login", {
    username,
    password,
  });

  return data;
}

export async function register(username: string, password: string) {
  const { data } = await client.post("/api/auth/register", {
    username,
    password,
  });

  return data;
}
