import React, { type ReactNode } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { path: "/", label: t("common.home") },
    { path: "/search", label: t("common.search") },
    { path: "/import", label: t("common.import") },
    { path: "/about", label: t("common.about") },
  ];

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box
        as="header"
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Container maxW="container.xl" py={4}>
          <Flex align="center">
            <VStack align="start" gap={0}>
              <Heading
                onClick={() => navigate("/")}
                size="lg"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecoration: "none", color: "blue.600" }}
              >
                {t("navigation.title")}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {t("navigation.subtitle")}
              </Text>
            </VStack>

            <Spacer />

            {/* Navigation */}
            <HStack gap={4} display={{ base: "none", md: "flex" }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  variant={location.pathname === item.path ? "solid" : "ghost"}
                  colorScheme="blue"
                  size="sm"
                >
                  {item.label}
                </Button>
              ))}
            </HStack>

            <Spacer />

            {/* Language Selector */}
            <HStack gap={2}>
              <Button
                size="sm"
                variant={i18n.language === "et" ? "solid" : "outline"}
                onClick={() => handleLanguageChange("et")}
              >
                EST
              </Button>
              <Button
                size="sm"
                variant={i18n.language === "en" ? "solid" : "outline"}
                onClick={() => handleLanguageChange("en")}
              >
                ENG
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box as="main" py={8}>
        <Container maxW="container.xl">{children}</Container>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg="gray.100"
        borderTop="1px"
        borderColor="gray.200"
        py={6}
        mt={8}
      >
        <Container maxW="container.xl">
          <Flex align="center" justify="center">
            <Text fontSize="sm" color="gray.600">
              {t("footer.copyright")}
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
