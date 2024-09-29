import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDelete, useTable } from "@refinedev/core";
import { BiTrash } from "react-icons/bi";
import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import type { Post } from "shared";

export default function PostList() {
  const { tableQuery } = useTable<Post>({ resource: "posts" });
  const { mutate } = useDelete();

  return (
    <Stack>
      <Container maxW="container.2xl">
        <Flex
          as="section"
          bg="bg.surface"
          pt={{ base: "4", md: "8" }}
          pb={{ base: "12", md: "24" }}
          justify="space-between"
        >
          <Stack spacing="1">
            <Heading size={{ base: "md", md: "lg" }} fontWeight="medium">
              Post overview
            </Heading>
            <Text>All published posts in the overview</Text>
          </Stack>

          <Button
            colorScheme="teal"
            size="sm"
            leftIcon={<MdCreate />}
            as={Link}
            to="/admin/posts/create"
          >
            Écrire un post
          </Button>
        </Flex>
      </Container>

      <Container maxW="container.2xl">
        {tableQuery.isLoading ? (
          <Spinner />
        ) : tableQuery.isError ? (
          <Alert status="error">
            <AlertIcon />
            Error fetching posts
          </Alert>
        ) : (
          <Table w="full">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Content</Th>
                <Th>Created At</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableQuery.data?.data.map((post: Post) => (
                <Tr key={post._id}>
                  <Td>{post.title}</Td>
                  <Td>
                    {post.content.length > 50
                      ? `${post.content.substring(0, 50)}...`
                      : post.content}
                  </Td>
                  <Td>{new Date(post.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={() =>
                        mutate({ resource: "posts", id: post._id })
                      }
                    >
                      <Icon as={BiTrash} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Container>
    </Stack>
  );
}
