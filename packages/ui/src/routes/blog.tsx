import { Container, Heading, Stack } from "@chakra-ui/react";
import { useList } from "@refinedev/core";
import type { Post } from "shared";

import { Card } from "../components/card";

export default function Blog() {
  const { data: posts } = useList<Post>({ resource: "posts" });

  console.log(posts?.data);

  return (
    <Container>
      <Stack>
        <Heading as="h1" fontSize="md" pt={24} pb={12}>
          Fuzzy Pickles
        </Heading>

        <Stack spacing="24px">
          {posts?.data.map((post: Post) => (
            <Card key={post._id} post={post} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
