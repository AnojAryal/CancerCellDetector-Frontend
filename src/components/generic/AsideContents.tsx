import { useState } from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";

interface AsideContentsProps {
  onPageChange: (page: string) => void;
}

const AsideContents = ({ onPageChange }: AsideContentsProps) => {
  const { colorMode } = useColorMode();
  const [activeButton, setActiveButton] = useState<string>("profile");

  const buttonColor = colorMode === "dark" ? "white" : "gray.700";
  const activeColor = colorMode === "dark" ? "blue.400" : "blue.600";
  const hoverBgColor = colorMode === "dark" ? "gray.600" : "gray.100";

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    onPageChange(button); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      p={2}
      width="250px"
      h="100vh"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      borderRightWidth={0}
      borderRightColor="transparent"
    >
      <Button
        variant="ghost"
        color={activeButton === "profile" ? activeColor : buttonColor}
        bg={activeButton === "profile" ? hoverBgColor : "transparent"}
        _hover={{
          bg: hoverBgColor,
          borderLeftWidth: 4,
          borderLeftColor: activeColor,
        }}
        _active={{
          bg: hoverBgColor,
          borderLeftWidth: 4,
          borderLeftColor: activeColor,
        }}
        _focus={{
          boxShadow: "none",
        }}
        onClick={() => handleButtonClick("profile")}
        width="100%"
        textAlign="left"
        py={3}
        px={4}
        mb={2}
      >
        Profile
      </Button>
      <Button
        variant="ghost"
        color={activeButton === "patient" ? activeColor : buttonColor}
        bg={activeButton === "patient" ? hoverBgColor : "transparent"}
        _hover={{
          bg: hoverBgColor,
          borderLeftWidth: 4,
          borderLeftColor: activeColor,
        }}
        _active={{
          bg: hoverBgColor,
          borderLeftWidth: 4,
          borderLeftColor: activeColor,
        }}
        _focus={{
          boxShadow: "none",
        }}
        onClick={() => handleButtonClick("patient")}
        width="100%"
        textAlign="left"
        py={3}
        px={4}
        mb={2}
      >
        Patient
      </Button>
      <Button
        variant="ghost"
        color={activeButton === "test" ? activeColor : buttonColor}
        bg={activeButton === "test" ? hoverBgColor : "transparent"}
        _hover={{
          bg: hoverBgColor,
          borderLeftWidth: 4,
          borderLeftColor: activeColor,
        }}
        _active={{
          bg: hoverBgColor,
          borderLeftWidth: 4,
          borderLeftColor: activeColor,
        }}
        _focus={{
          boxShadow: "none",
        }}
        onClick={() => handleButtonClick("test")}
        width="100%"
        textAlign="left"
        py={3}
        px={4}
      >
        CellTest
      </Button>
    </Box>
  );
};

export default AsideContents;
