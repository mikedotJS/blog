import { Heading, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import type { Post } from "shared";

interface Props {
  post: Post;
}

export const Card: React.FC<Props> = ({
  post: { _id, title, content, createdAt },
}) => (
  <LinkOverlay href={`/posts/${_id}`}>
    <Stack spacing="4px">
      <Text fontSize="xs">{new Date(createdAt).toLocaleDateString()}</Text>
      <Heading as="h5" fontSize="md">
        {title}
      </Heading>
      <Text>
        {content.length > 50 ? `${content.substring(0, 50)}...` : content}
      </Text>
    </Stack>
  </LinkOverlay>
);
