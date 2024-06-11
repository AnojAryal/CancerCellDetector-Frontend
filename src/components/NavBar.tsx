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
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";


const NavBar = () => {
  const navigate = useNavigate(); 
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const [displayWelcome, setDisplayWelcome] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayWelcome(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, [displayWelcome]);

  useEffect(() => {
    setDisplayWelcome(true);
  }, [token]);

  const onClose = () => setIsOpen(false);

  const handleLogout = () => {
    setIsOpen(true);
  };

  const handleLogoutConfirmed = () => {
    setIsOpen(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login"); 
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Navigate to settings page
    navigate("/settings"); 
  };

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
              <MenuItem onClick={handleSettingsClick} icon={<FiSettings />}>
                Setting
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout} icon={<FiLogOut />}>
                Logout
              </MenuItem>
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
