export type UserAuthData = {
  username: string;
};

export type HonoEnv = {
  Variables: {
    user: UserAuthData;
  };
};
