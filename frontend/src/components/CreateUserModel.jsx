import { Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from '../App';

const CreateUserModel = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: ""
    })

    const toast = useToast()

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error)
            }

            toast({
                status: 'success',
                title: 'Account created.',
                description: "We've created your account for you.",
                duration: 2000,
                position: "top-right"
            })
            onClose()
            setUsers((prevUsers) => [...prevUsers, data]) // Corrected line

            setInputs({
                name: "",
                role: "",
                description: "",
                gender: ""
            })
        } catch (err) {
            toast({
                title: 'Error occurred',
                description: err.message,
                status: 'error',
                duration: 4000,
            })
        } finally {
            setLoading(false);

        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleCreateUser}>
                    <ModalContent>
                        <ModalHeader>My new BFF</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                {/* left */}
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <input placeholder='John Doe'
                                        value={inputs.name}
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <input placeholder='software engineer'
                                        value={inputs.role}
                                        onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                                    />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflow={"hidden"}
                                    placeholder='He is a software engineer who loves to .....'
                                    value={inputs.description}
                                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                />
                            </FormControl>

                            <RadioGroup mt={4} value={inputs.gender} onChange={(e) => setInputs({ ...inputs, gender: e })}>
                                <Flex gap={4}>
                                    <Radio value='male'>Male</Radio>
                                    <Radio value='female'>Female</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit' isLoading={loading}>
                                Add
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default CreateUserModel
