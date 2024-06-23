interface DecodedToken {
  exp: number;
  iat: number; // issued at
  is_admin: boolean;
  is_hospital_admin : boolean;
}

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) {
    return null;
  }
  try {
    const base64Url = token.split(".")[1];
    const base64String = atob(base64Url);
    return JSON.parse(base64String) as DecodedToken;
  } catch {
    return null;
  }
};
