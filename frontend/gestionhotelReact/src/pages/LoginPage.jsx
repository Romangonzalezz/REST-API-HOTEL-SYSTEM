import React, {useContext, useState} from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'; 

import { Input, FormControl, FormLabel, Stack, Button, Text } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext'

function LoginPage(){
    let {loginUser} = useContext(AuthContext)

    let {error} = useContext(AuthContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    

    return (
        <>
            <Navbar/>
            <Stack
                direction={['column']}
                spacing='24px'
                width='100%'
                padding={10}>
            
            <form onSubmit={loginUser}>
            <FormControl  isRequired>
                        <Stack direction={{base:'column',lg:'column', sm:'column'}} alignItems={{sm:'center'}}>
                            
                            <Stack padding={5}> 
                                <FormLabel>Usuario:</FormLabel>
                                <Input name='username' variant='flushed' placeholder='Nombre de usuario...' id='username' onChange={event => setUsername(event.currentTarget.value)}/>
                            </Stack> 

                            <Stack padding={5}> 
                                <FormLabel>Contraseña:</FormLabel>
                                <Input variant='flushed' name='password' type='password' placeholder='************' id='password' onChange={event => setPassword(event.currentTarget.value)}/>
                            </Stack> 

                            <Button bg='gray.200' width={'177.6px'} type="submit">Iniciar Sesion</Button>

                            <Link to={'/register'}> 
                                <Button bg='gray.300' width={'177.6px'} textAlign={'center'}>Registrarse</Button>
                            </Link>

                            {error && <Text padding={5} color="red.600"fontWeight="bold">{error}</Text>}
                        </Stack>
            </FormControl>
            </form>
            

            </Stack>
            
        </>

    )
}


export default LoginPage;