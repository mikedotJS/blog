import {
  Stack,
  Container,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  HStack,
  Icon,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { HttpError } from "@refinedev/core";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters long"),
});

type PostCreatePayload = yup.InferType<typeof schema>;

export default function PostCreate() {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useForm<PostCreatePayload, HttpError, PostCreatePayload>({
    refineCoreProps: {
      redirect: "list",
      resource: "posts",
      action: "create",
      onMutationSuccess: () => {
        toast({
          title: "Post created.",
          description: "Your post has been successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate("/admin/posts");
      },
    },
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  return (
    <Container maxW="container.2xl">
      <Stack>
        <Flex
          as="section"
          bg="bg.surface"
          pt={{ base: "4", md: "8" }}
          pb={{ base: "12", md: "24" }}
          justify="space-between"
        >
          <Stack spacing="1">
            <HStack alignItems="center">
              <Link to="/admin/posts">
                <Icon as={BiLeftArrowAlt} />
              </Link>
              <Heading size={{ base: "md", md: "lg" }} fontWeight="medium">
                Create a post
              </Heading>
            </HStack>
          </Stack>
        </Flex>

        <form onSubmit={handleSubmit(onFinish)}>
          <Stack>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" {...register("title", { required: true })} />
              {errors.title && (
                <FormErrorMessage>
                  {errors.title.message?.toString()}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.content}>
              <FormLabel>Content</FormLabel>
              <MDEditor
                data-color-mode="light"
                value={watch("content")}
                onChange={(value) => setValue("content", value ?? "")}
              />
              {errors.content && (
                <FormErrorMessage>
                  {errors.content.message?.toString()}
                </FormErrorMessage>
              )}
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              disabled={!isValid || !isDirty}
            >
              {formLoading ? <Spinner size="sm" /> : "Save"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
