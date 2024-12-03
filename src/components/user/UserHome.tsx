import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const UserHome = () => {
  const headerBg = useColorModeValue("teal.600", "teal.800");
  const footerBg = useColorModeValue("teal.600", "teal.800");
  const sectionBg = useColorModeValue("teal.50", "teal.900");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.300");

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")} minH="100vh">
      {/* Header Section */}
      <Box bg={headerBg} color="white" py={8}>
        <Container maxW="container.lg" textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
          >
            Welcome to the Cancer Cell Detection System
          </Heading>
          <Text mt={4} fontSize="lg" maxW="xl" mx="auto">
            Empowering medical professionals with advanced tools for early
            cancer detection and analysis.
          </Text>
        </Container>
      </Box>

      {/* Carousel Section */}
      <Box py={16}>
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h2" fontSize="3xl" mb={8} fontWeight="semibold">
            Key Features of Our Solution
          </Heading>
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <Box>
              <Text fontSize="2xl" color={textColor} fontWeight="bold">
                Advanced Detection Algorithms
              </Text>
              <Text color={secondaryTextColor} mt={2} fontSize="lg">
                Our system uses state-of-the-art AI models to detect cancer
                cells with high accuracy, reducing false negatives.
              </Text>
            </Box>
            <Box>
              <Text fontSize="2xl" color={textColor} fontWeight="bold">
                Real-Time Analysis
              </Text>
              <Text color={secondaryTextColor} mt={2} fontSize="lg">
                Instant analysis and results, enabling quick decision-making and
                timely medical intervention.
              </Text>
            </Box>
            <Box>
              <Text fontSize="2xl" color={textColor} fontWeight="bold">
                User-Friendly Interface
              </Text>
              <Text color={secondaryTextColor} mt={2} fontSize="lg">
                Designed for medical professionals, our interface provides easy
                access to critical information with minimal training.
              </Text>
            </Box>
          </Carousel>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h2" fontSize="2xl" mb={6} fontWeight="semibold">
            Why Trust Our Cancer Detection Technology?
          </Heading>
          <VStack spacing={6} align="start" maxW="lg" mx="auto">
            <Text fontSize="lg" color={textColor}>
              Our AI-powered detection system is designed to provide high
              precision in identifying cancer cells, supporting doctors in
              early-stage diagnosis and improving patient outcomes.
            </Text>
            <Text fontSize="lg" color={textColor}>
              We integrate advanced machine learning algorithms trained on a
              vast dataset of medical images to ensure reliability and accuracy
              in every diagnosis.
            </Text>
            <Text fontSize="lg" color={textColor}>
              Time is critical in cancer treatment. Our tool provides rapid
              analysis, ensuring that medical professionals can act swiftly and
              confidently.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box bg={footerBg} color="white" py={6}>
        <Container maxW="container.lg" textAlign="center">
          <Text fontSize="sm">
            &copy; 2024 Cancer Cell Detection Technology. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default UserHome;
