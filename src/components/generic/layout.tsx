import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
      templateRows={{
        base: "auto",
        lg: "auto",
      }}
      h="100vh"
      gap={4}
      p={4}
    >
      <GridItem
        area={"aside"}
        bg="orange.500"
        p={4}
        display={{ base: "none", lg: "block" }}
      >
        <Center h="100%">
          <Box textAlign="center">
            <h1>Aside</h1>
          </Box>
        </Center>
      </GridItem>
      <GridItem area={"main"} bg="green.500" p={4}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
