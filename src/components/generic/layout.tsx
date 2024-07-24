import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import AsideContents from "./AsideContents";

interface LayoutProps {
  children: ReactNode;
  onPageChange: (page: string) => void; //accept onPageChange as a prop
}

const Layout = ({ children, onPageChange }: LayoutProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
      mt={28}
    >
      <GridItem area={"aside"} display={{ base: "none", lg: "block" }}>
        <AsideContents onPageChange={onPageChange} />
      </GridItem>
      <GridItem area={"main"} p={4}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
