import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Guilherme Buntrok</Text>
          <Text color="gray.300" fontSize="small">
            guilhermebuntrock@hotmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Guilherme Buntrock" src="https://github.com/guilhermebuntrok.png" />
    </Flex>
  );
}