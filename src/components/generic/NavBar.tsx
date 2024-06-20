import { useState, useEffect, useRef } from "react";
import {
  HStack,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { FiUser, FiShield, FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { FaCircleUser } from "react-icons/fa6";

interface DecodedToken {
  exp: number;
  iat: number; // issued at
  is_admin: boolean;
}

const decodeToken = (token: string | null): DecodedToken | null => {
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

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const [displayWelcome, setDisplayWelcome] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayWelcome(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, [displayWelcome]);

  useEffect(() => {
    setDisplayWelcome(true);
  }, [token]);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          handleLogoutConfirmed();
        }
      }
    }
  }, [token]);

  const onClose = () => setIsOpen(false);

  const handleLogout = () => {
    setIsOpen(true);
  };

  const handleLogoutConfirmed = () => {
    setIsOpen(false);
    console.log("Logout Success!");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    navigate("/settings");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    navigate("/user-profile");
  };

  const handleAdminClick = () => {
    console.log("Admin clicked");
    navigate("/admin");
  };

  // Decode token and check if user is an admin
  const decodedToken = decodeToken(token || "");
  const isAdmin = decodedToken ? decodedToken.is_admin : false;

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="50px" />
      {token && (
        <>
          <Menu>
            <MenuButton as={Button} variant="ghost" rightIcon={<FiUser />}>
              {displayWelcome ? `Welcome, ${username}` : username}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleProfileClick} icon={<FaCircleUser />}>
                Your Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSettingsClick} icon={<FiSettings />}>
                Settings
              </MenuItem>

              <MenuDivider />
              {isAdmin && (
                <>
                  <MenuItem onClick={handleAdminClick} icon={<FiShield />}>
                    Admin
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout} icon={<FiLogOut />}>
                    Logout
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Logout
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to logout?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleLogoutConfirmed}
                  ml={3}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </HStack>
  );
};

export default NavBar;
