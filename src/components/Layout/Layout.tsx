import React, { type ReactNode } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Spacer,
  Image,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/eestianagrammideleidjalogo.png";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    // Persist language selection to localStorage
    localStorage.setItem("i18nextLng", lng);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isOpen) {
      onToggle(); // Close mobile menu after navigation
    }
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
              <Image
                src={logo}
                alt={t("navigation.title")}
                onClick={() => navigate("/")}
                cursor="pointer"
                height="62px"
                _hover={{ opacity: 0.8 }}
              />
            </VStack>

            <Spacer />

            {/* Desktop Navigation */}
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

            {/* Desktop Language Selector */}
            <HStack gap={2} display={{ base: "none", md: "flex" }}>
              <Button
                size="sm"
                variant={i18n.language === "et" ? "solid" : "outline"}
                onClick={() => handleLanguageChange("et")}
                aria-label="Eesti keel"
              >
                🇪🇪
              </Button>
              <Button
                size="sm"
                variant={i18n.language === "en" ? "solid" : "outline"}
                onClick={() => handleLanguageChange("en")}
                aria-label="English"
              >
                🇬🇧
              </Button>
              <Button
                size="sm"
                variant={i18n.language === "de" ? "solid" : "outline"}
                onClick={() => handleLanguageChange("de")}
                aria-label="Deutsch"
              >
                🇩🇪
              </Button>
              <Button
                size="sm"
                variant={i18n.language === "fr" ? "solid" : "outline"}
                onClick={() => handleLanguageChange("fr")}
                aria-label="Français"
              >
                🇫🇷
              </Button>
            </HStack>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle Navigation"
              size="sm"
            />
          </Flex>
        </Container>

        {/* Mobile Menu */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: "none" }}>
            <Container maxW="container.xl">
              <VStack spacing={3} align="stretch">
                {/* Mobile Navigation Items */}
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    variant={
                      location.pathname === item.path ? "solid" : "ghost"
                    }
                    colorScheme="blue"
                    size="sm"
                    justifyContent="flex-start"
                  >
                    {item.label}
                  </Button>
                ))}

                {/* Mobile Language Selector */}
                <Box pt={2}>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    {t("common.language") || "Language"}
                  </Text>
                  <HStack gap={2} flexWrap="wrap">
                    <Button
                      size="sm"
                      variant={i18n.language === "et" ? "solid" : "outline"}
                      onClick={() => handleLanguageChange("et")}
                      aria-label="Eesti keel"
                    >
                      🇪🇪
                    </Button>
                    <Button
                      size="sm"
                      variant={i18n.language === "en" ? "solid" : "outline"}
                      onClick={() => handleLanguageChange("en")}
                      aria-label="English"
                    >
                      🇬🇧
                    </Button>
                    <Button
                      size="sm"
                      variant={i18n.language === "de" ? "solid" : "outline"}
                      onClick={() => handleLanguageChange("de")}
                      aria-label="Deutsch"
                    >
                      🇩🇪
                    </Button>
                    <Button
                      size="sm"
                      variant={i18n.language === "fr" ? "solid" : "outline"}
                      onClick={() => handleLanguageChange("fr")}
                      aria-label="Français"
                    >
                      🇫🇷
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            </Container>
          </Box>
        </Collapse>
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
