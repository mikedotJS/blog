import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Flex>
      <Stack
        w="2xs"
        height="100vh"
        bgColor="teal.500"
        color="white"
        spacing="48px"
        py={{ base: "4", md: "8" }}
      >
        <Container>
          <Heading as="h2" size="lg">
            Blog
          </Heading>
        </Container>

        <Container>
          <Text color="gray.200" fontSize="2xs" letterSpacing="0.8px">
            CATEGORIES
          </Text>
          <Stack>
            <Link>Posts</Link>
          </Stack>
        </Container>
      </Stack>
      <Box w="full">
        <Outlet />
      </Box>
    </Flex>
  );
}
