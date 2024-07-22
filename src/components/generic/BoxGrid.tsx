import { ReactNode } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

interface BoxGridProps {
  children: ReactNode;
}

const BoxGrid = ({ children }: BoxGridProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.8)"
      zIndex="1000"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="auto"
    >
      <Box
        bg={bgColor}
        color={textColor}
        borderRadius="md"
        boxShadow="lg"
        width="90%"
        maxWidth="500px"
        maxHeight="95%"
        overflowY="auto"
        p={6}
        position="relative"
      >
        {children}
      </Box>
    </Box>
  );
};

export default BoxGrid;
