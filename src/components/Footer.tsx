import { Box, Text, Flex } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Box className="bg-gray-100 dark:bg-gray-900 py-4 mt-8">
      <Flex justify="center" align="center">
        <Text size="2" color="gray">
          © {new Date().getFullYear()} Kevin James · Built with React + Radix UI
        </Text>
      </Flex>
    </Box>
  );
}
