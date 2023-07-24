type AuthType = {
  userInfo: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };

  reducers: {
    setCredentials: (state: any, action: any) => void;
  };
};

export default AuthType;
