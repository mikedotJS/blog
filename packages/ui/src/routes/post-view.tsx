import { Container, Heading, HStack, Icon, Stack } from "@chakra-ui/react";
import { useShow } from "@refinedev/core";
import MDEditor from "@uiw/react-md-editor";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { Post } from "shared";

export default function PostView() {
  const { id } = useParams<{ id: string }>();

  const { query } = useShow<Post>({ resource: "posts", id });

  return (
    <Container data-color-mode="light" pb={8}>
      <Stack>
        <HStack alignItems="center" pt={24} pb={12}>
          <Link to="/">
            <Icon as={BiLeftArrowAlt} />
          </Link>
          <Heading as="h1" fontSize="md">
            Fuzzy Pickles
          </Heading>
        </HStack>
        <Heading as="h2" fontSize="lg">
          {query.data?.data.title}
        </Heading>
      </Stack>

      <MDEditor.Markdown
        data-color-mode="light"
        source={query.data?.data.content ?? ""}
      />
    </Container>
  );
}
