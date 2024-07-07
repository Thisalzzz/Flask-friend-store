import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { BiTrash } from "react-icons/bi";
import EditModel from './EditModel';
import { BASE_URL } from '../App';


function UsersCard({user, setUsers}) {
  const toast = useToast();
  const handleDeleteUser = async ()=>{

    try{
      const res = await fetch(`${BASE_URL}/friends/${user.id}`,{
        method:"DELETE"
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error(data.error)
      }
      setUsers((prevUsers)=> prevUsers.filter((u) => u.id !== user.id))
      toast({
        title:"success",
        status:"success",
        description:"Friend deleted successfully.",
        duration:"2000",
        position:"top-center"
      })
    }
    catch(err){
      toast({
        title:"An error occured",
        description:err.message,
        status:"error",
        duration:4000,
        isClosable:true
      })
    }

  }

  return (
    <Card>
      <CardHeader>
        <Flex>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src='<img src={user.imgUrl} />' />
          
            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>
          
          <Flex>
            <EditModel 
            user={user}
            setUsers={setUsers}
            />
              <IconButton
              variant="ghost"
              colorScheme='red'
              size={"sm"}
              aria-label='See menu'
              icon={<BiTrash size={20}/> }
              onClick={handleDeleteUser}
              >

              </IconButton>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {user.description}
        </Text>
      </CardBody>

    </Card>
  )
}

export default UsersCard