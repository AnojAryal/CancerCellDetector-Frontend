export interface DecodedToken {
  exp: number;
  iat: number; // issued at
  hospital_id: number;
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
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(base64String) as DecodedToken;
  } catch (error) {
    console.error("Token decoding error:", error);
    return null;
  }
};

export const token = localStorage.getItem("accessToken");

// Decode token
export const decodedToken = decodeToken(token || "");

// Retrieve and use properties from the decoded token
export const isAdmin = decodedToken ? decodedToken.is_admin : false;
export const isHospitalAdmin = decodedToken
  ? decodedToken.is_hospital_admin
  : false;
export const hospitalId = decodedToken ? decodedToken.hospital_id : null;
