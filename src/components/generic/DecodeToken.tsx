export interface DecodedToken {
  exp: number;
  iat: number; // issued at
  is_admin: boolean;
  is_hospital_admin: boolean;
}

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) {
    return null;
  }
  try {
    const base64Url = token.split(".")[1];
    const base64String = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(base64String) as DecodedToken;
  } catch (error) {
    console.error("Token decoding error:", error);
    return null;
  }
};

export const token = localStorage.getItem("accessToken");

// Decode token and check if user is an admin or hospital admin
export const decodedToken = decodeToken(token || "");
export const isAdmin = decodedToken ? decodedToken.is_admin : false;
export const isHospitalAdmin = decodedToken
  ? decodedToken.is_hospital_admin
  : false;
