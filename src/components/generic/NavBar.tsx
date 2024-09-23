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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { decodeToken, isAdmin, isHospitalAdmin, isUser } from "./DecodeToken";
import { FaBuilding } from "react-icons/fa";
import UserSetting from "../user/UserSetting";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const NavBar = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const refreshToken = localStorage.getItem("refreshToken")
  const [displayWelcome, setDisplayWelcome] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const {
    isOpen: isSettingsOpen,
    onOpen: openSettings,
    onClose: closeSettings,
  } = useDisclosure();

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
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleMainPageClick = () => {
    console.log("profile clicked");
    navigate("/profile");
  };

  const handlePatientClick = () => {
    console.log("patient clicked");
    navigate("/patients");
  };

  const handleUserClick = () => {
    console.log("manage users clicked");
    navigate("/admin/manage-user");
  };

  const handleHospitalClick = () => {
    console.log("manage hospitals clicked");
    navigate("/admin/manage-hospital");
  };

  return (
    <>
      <HStack
        as="nav"
        justifyContent="space-between"
        padding="10px"
        bg={colorMode === "light" ? "white" : "gray.800"}
        color={colorMode === "light" ? "black" : "white"}
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        width="100%"
      >
        <Image src={logo} boxSize="50px" />
        {refreshToken && token && (
          <>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<MdAccountCircle />}
              >
                {displayWelcome ? `Welcome, ${username}` : username}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={handleMainPageClick}
                  icon={<BsPersonCircle />}
                >
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={openSettings} icon={<FiSettings />}>
                  Settings
                </MenuItem>
                <MenuDivider />
                {(isUser || isHospitalAdmin) && (
                  <>
                    <MenuItem onClick={handlePatientClick} icon={<BsPerson />}>
                      Patient
                    </MenuItem>
                    <MenuDivider />
                  </>
                )}
                {(isAdmin || isHospitalAdmin) && (
                  <>
                    <MenuItem onClick={handleUserClick} icon={<FiUsers />}>
                      Users
                    </MenuItem>
                    <MenuDivider />
                  </>
                )}
                {isAdmin && (
                  <>
                    <MenuItem
                      onClick={handleHospitalClick}
                      icon={<FaBuilding />}
                    >
                      Hospitals
                    </MenuItem>
                    <MenuDivider />
                  </>
                )}
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
            <UserSetting isOpen={isSettingsOpen} onClose={closeSettings} />
          </>
        )}
      </HStack>
    </>
  );
};

export default NavBar;
