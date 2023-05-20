import React from  'react';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { Image, Stack, Container, Text, Divider, FormControl, FormLabel, Button, FormErrorMessage } from '@chakra-ui/react';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


import * as API from '../services/habitaciones';
import  Navbar  from '../components/Navbar';

import AuthContext from '../context/AuthContext';

function DetallePage({match}){
    const [habitaciones, setHabitaciones] = useState([])
    const { id } = useParams();

    let {user} = useContext(AuthContext)
    
    useEffect(() => {
        API.getHabitaciones().then(setHabitaciones);
    }, []);
    
    
    const habitacion = habitaciones.find(
        (habitacion) => habitacion.id === parseInt(id)
    );

    const [startDate, setStartDate] = useState(new Date());
    const [finalDate, setfinalDate] = useState(new Date());


    const navigate = useNavigate();

    const handleReserva = () => {
        axios.post('http://localhost:8000/reservas/', {
            fecha_inicio: startDate.toISOString(), 
            fecha_fin: finalDate.toISOString(),
            precio: habitacion.precio,
            habitacion: id,
            cliente: user.user_id,
        })
        .then(response => {
          console.log('Reserva creada exitosamente:', response.data);
          navigate('/');
        })
        .catch(error => {
          console.error('Error al crear reserva:', error);
          console.log(JSON.stringify(error.response));
        });
      };


    return (
        <>
            <Navbar/>
            <Container padding={10} maxW='100%'> 
            <Stack padding={10} bg="gray.100"  direction={{base:'column', lg:'row', sm: 'column'}} spacing={{base:'50', lg:'50', sm: '50'}}>
            <Stack alignItems={{base:'center',sm:'center'}} >
                    <Stack direction={["column"]}  spacing='24px' pl={2} align={"center"} width='60%'> 
                        <Stack width='100%'> 
                            <Image src={habitacion && habitacion.imagen} height="250px" objectFit="cover" />
                        </Stack>

                        <Stack> 
                            <Text> Descripcion: {habitacion && habitacion.descripcion} </Text>
                            <Text> Tipo: {habitacion && habitacion.tipo} </Text>
                            <Text> Precio: {habitacion && habitacion.precio} </Text>
                        </Stack>


                        <Divider orientation='horizontal'/>
                        <Text padding={5} pl={0} fontWeight="bold"> {habitacion && habitacion.disponible ? "Disponible" : "Reservada"} </Text>
                    
                    </Stack>
                
                <Stack spacing='24px' direction={['column']} width='40%'>
                    <FormControl isRequired>
                        <Stack direction={{base:'column',lg:'row', sm:'column'}} justifyContent="space-between" alignItems={{sm:'center'}}>
                            <Stack> 
                                <FormLabel>Fecha de inicio:</FormLabel>

                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd MMM yyyy"/>
                            </Stack> 

                            <Stack> 
                                <FormLabel>Fecha Final:</FormLabel>

                                <DatePicker selected={finalDate} onChange={(date) => setfinalDate(date)} dateFormat="dd MMM yyyy"/>
                            </Stack> 
                        </Stack>
                        
                        <Stack direction={["column"]} pt={'10px'}>
                            {habitacion && habitacion.disponible ?
                             
                            <Button onClick={handleReserva} bg='gray.200'>Reservar</Button>
                            
                            : <FormErrorMessage>
                                Error, esta habitacion esta reservada.
                            </FormErrorMessage>
                            }
                        </Stack>
                    </FormControl>
                </Stack>
                </Stack>
                
            </Stack>
            </Container>
        </>
        )
    }

export default DetallePage;