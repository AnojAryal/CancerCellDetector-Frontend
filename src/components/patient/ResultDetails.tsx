import {
  Container,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  useColorModeValue,
  Flex,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { ResultImage, Result } from "../../hooks/user/useResults";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResultDetail = () => {
  const location = useLocation();
  const result = location.state as Result;

  const containerBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const tealColor = useColorModeValue("teal.500", "teal.200");

  const downloadPDF = async () => {
    const element = document.getElementById("result-detail");
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Result_${result.celltest_id}.pdf`);
    }
  };

  if (!result) {
    return <Text>Result data not available at the moment.</Text>;
  }

  return (
    <Box
      bg={containerBg}
      maxHeight="100vh"
      overflowY="auto"
      paddingBottom="20px"
    >
      <Container
        maxW="container.xl"
        py={8}
        pt={{ base: 20, md: 24 }}
        bg={containerBg}
        id="result-detail"
      >
        <Heading as="h2" size="xl" mb={8} textAlign="center" color={textColor}>
          Result Details
        </Heading>

        <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6} mb={8}>
          <GridItem>
            <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
              Cell Test ID:
            </Text>
            <Text mb={4} color={textColor}>
              {result.celltest_id}
            </Text>
            <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
              Description:
            </Text>
            <Text mb={4} color={textColor}>
              {result.description}
            </Text>
          </GridItem>
        </Grid>

        <Heading as="h3" size="lg" mb={6} textAlign="center" color={textColor}>
          Result Images
        </Heading>
        <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {result.result_images.map((image: ResultImage, index: number) => (
            <Box
              key={image.id}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                src={image.image}
                alt={`Result Image ${index + 1}`}
                objectFit="cover"
                width="100%"
                height="auto"
                boxShadow="md"
              />
            </Box>
          ))}
        </Grid>

        <Flex justifyContent="space-between" alignItems="center" mt={8}>
          <Text fontWeight="bold" color={tealColor}>
            Cancer Cell Detector Team
          </Text>
          <Text color={tealColor}>
            Processed At: {new Date(result.created_at).toLocaleString()}
          </Text>
          <Box textAlign="right">
            <IconButton
              icon={<FaDownload />}
              aria-label="Download PDF"
              onClick={downloadPDF}
              colorScheme="teal"
              variant="outline"
              size="lg"
              mb={2}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ResultDetail;
