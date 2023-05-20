import React, {useContext, useState} from 'react';
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';

import { Input, FormControl, FormLabel, Stack, Button, Text } from '@chakra-ui/react';

function RegisterPage(){

    var caracteresEspeciales = "!@#$%^&*()_+{}:\"<>?|[];',./~`";



    const [error, setError] = useState('');

    //Constantes para obtener los datos del formulario para registrarse
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');

    const navigateTo = useNavigate();

    let registerUser = async (e )=> {

        e.preventDefault()
        let response = await fetch('http://localhost:8000/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {'username':e.target.username.value, 
                'password':e.target.password.value,
                'password2':e.target.password2.value,
                'email':e.target.email.value,
                'first_name':e.target.first_name.value,
                'last_name':e.target.last_name.value})
        })
        
        //Logica para indicar si la contraseña no tiene caracteres especiales
        var regex = new RegExp(`[${caracteresEspeciales.replace(/\\/g, "\\\\")}]`);
        var tieneCaracteresEspeciales = regex.test(password);

        if(response.status === 400){
            setError('Algo salio mal, revisa los campos!');
            if (password.length < 8){
                setError('La contraseña debe ser mayor o igual a 8 caracteres.')
            }
            else if (!tieneCaracteresEspeciales){
                setError('La contraseña debe contener al menos un caracter especial !@#$%^&*()_+{}:\"<>?|[];')
            }

        }else{
            navigateTo('/login')
        }
    }
    
    return (
        <>
            <Navbar/>
            <Stack
                direction={['column']}
                spacing='24px'
                width='100%'
                padding={10}>
            
            <form onSubmit={registerUser}>
            <FormControl  isRequired>
                        <Stack direction={{base:'column',lg:'column', sm:'column'}} alignItems={{sm:'center'}}>
                            
                            <Stack direction={'row'}>

                                <Stack padding={5}> 
                                    <FormLabel>Nombre:</FormLabel>
                                    <Input name='first_name' variant='flushed' placeholder='Nombre...' id='first_name' onChange={event => setFirst_name(event.currentTarget.value)}/>
                                </Stack> 

                                <Stack padding={5}> 
                                    <FormLabel>Apellido:</FormLabel>
                                    <Input name='last_name' variant='flushed' placeholder='Apellido...' id='last_name' onChange={event => setLast_name(event.currentTarget.value)}/>
                                </Stack> 

                            </Stack>

                            <Stack direction={'row'}> 
                                <Stack padding={5}> 
                                        <FormLabel>Email:</FormLabel>
                                        <Input name='email' type='email' variant='flushed' placeholder='email@ejemplo.com' id='email' onChange={event => setEmail(event.currentTarget.value)}/>
                                    </Stack> 

                                    <Stack padding={5}> 
                                        <FormLabel>Nombre de usuario:</FormLabel>
                                        <Input name='username' variant='flushed' placeholder='Nombre de usuario...' id='username' onChange={event => setUsername(event.currentTarget.value)}/>
                                </Stack> 
                                
                            </Stack>

                            <Stack direction={'row'}>

                                <Stack padding={5}> 
                                    <FormLabel>Contraseña:</FormLabel>
                                    <Input variant='flushed' name='password' type='password' placeholder='************' id='password' onChange={event => setPassword(event.currentTarget.value)}/>
                                </Stack> 

                                <Stack padding={5}> 
                                    <FormLabel>Repetir contraseña:</FormLabel>
                                    <Input variant='flushed' name='password2' type='password' placeholder='************' id='password2' onChange={event => setPassword2(event.currentTarget.value)}/>
                                </Stack> 

                            </Stack>

                            <Button bg='gray.300' width={'177.6px'} textAlign={'center'} type="submit">Registrarse</Button>
                            
                            {error && <Text padding={5} color="red.600"fontWeight="bold">{error}</Text>}
                        </Stack>
            </FormControl>
            </form>
            
            </Stack>
            
        </>

    )
}


export default RegisterPage;