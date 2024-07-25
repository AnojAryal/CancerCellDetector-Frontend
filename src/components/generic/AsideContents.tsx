import { Box, Button, useColorMode } from "@chakra-ui/react";

interface AsideContentsProps {
  onPageChange: (page: string) => void;
  activePage: string; // Add activePage prop
}

const AsideContents = ({ onPageChange, activePage }: AsideContentsProps) => {
  const { colorMode } = useColorMode();

  const buttonColor = colorMode === "dark" ? "white" : "gray.700";
  const activeColor = colorMode === "dark" ? "blue.400" : "blue.600";
  const hoverBgColor = colorMode === "dark" ? "gray.600" : "gray.100";

  const handleButtonClick = (button: string) => {
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
        color={activePage === "profile" ? activeColor : buttonColor}
        bg={activePage === "profile" ? hoverBgColor : "transparent"}
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
        color={activePage === "patient" ? activeColor : buttonColor}
        bg={activePage === "patient" ? hoverBgColor : "transparent"}
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
        color={activePage === "test" ? activeColor : buttonColor}
        bg={activePage === "test" ? hoverBgColor : "transparent"}
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
