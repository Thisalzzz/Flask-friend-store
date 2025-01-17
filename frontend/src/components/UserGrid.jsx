import { Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UserCard from './UsersCard'


const UserGrid = ({users, setUsers}) => {
  const[loading, setLoading] = useState(true);

  useEffect(()=>{

    const getUsers = async () =>{
      try{
        const res = await fetch("http://localhost:5000/api/friends")
        const data = await res.json()


        if(!res.ok){
          throw new Error(data.error);
        }

        setUsers(data);

      } 
      catch(err){
        console.error(err);
      }
      finally{
        setLoading(false);
      }
    }
    getUsers();
  },[setUsers])
  
  return (
    <>
    <Grid templateColumns={{
      base:"1fr",
      md:"repeat(2, 1fr)",
      lg: "repeat(3, 1fr"
    }}
    gap={4}>

    {users.map((user)=>(
      <UserCard key={user.id} user={user} setUsers={setUsers}/>
    ))}

    </Grid>

    {loading && (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>

      </Flex>
    )}

    {!loading && users.length === 0 && (
      <Flex>
        <Text fontSize={"xl"}>
          <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
            Poor you!😢
          </Text>
        </Text>
      </Flex>
    )}

    </>
  )
}

export default UserGrid