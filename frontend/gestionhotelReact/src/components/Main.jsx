import { Stack, Grid, Text,  Image, Button} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { filterResults } from '../services/helpers';


import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import AuthContext from '../context/AuthContext';

import SimpleSlider from './Slider';


import { FaRegWindowClose } from 'react-icons/fa';

import * as API from '../services/habitaciones';

export default function Main({ search }){
  const [habitaciones, setHabitaciones] = useState([])
  const [reservas, setReservas] = useState([]);


  const navigateTo = useNavigate();
  let {user} = useContext(AuthContext)

  const handleDeleteReserva = (reservaId) => {
    axios.delete(`http://localhost:8000/reservas/${reservaId}/`)
      .then(response => {
        console.log('Reserva eliminada exitosamente:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error al eliminar reserva:', error);
      });
  };
  

   

  useEffect(() => {
      API.getHabitaciones().then(setHabitaciones);
      API.getReservas().then(setReservas);
    }, []);

    
  const filteredHabitaciones = filterResults(habitaciones, search);
  
  if (filteredHabitaciones.length === 0){
    return <Text align={'center'} padding={10}>No hay habitaciones de ese Tipo!!!</Text>
  }

 
  return (
    <> 
      {user && <Text align={'center'} padding={'5'} fontWeight={'bold'}>Bienvenido {user.username}</Text>}

      <SimpleSlider/>
      <Stack padding={10}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(280px, 1fr))">
          
          {filteredHabitaciones.map((habitacion) => {
            const reserva = reservas.find((reserva) => reserva.habitacion === habitacion.numero);
            return (
              <Stack key={habitacion.id} backgroundColor="gray.100" padding={5}>
                <Image src={habitacion.imagen} widht="232px" height="200px" objectFit="cover" />
                <Text>{habitacion.tipo}</Text>
                <Text color="green.500">$ {habitacion.precio}</Text>
                <Text color={habitacion.disponible ? "green.600" : "red.600"} fontWeight="bold">
                  {habitacion.disponible ? "Disponible" : "Reservada"}
                </Text>
                {habitacion.disponible ? (
                  <Link to={`/detalle/${habitacion.id}`} align={"center"}>
                  <Button colorScheme="blue" variant="ghost" color="black">
                    Ver
                  </Button>
                  </Link>
                ) : reserva ? (
                  <Text align={"center"}>Fecha Disponible: <Text as='span'fontWeight="bold">{new Date(reserva.fecha_fin).toLocaleDateString()}</Text></Text>
                ) : null}
                
                {!habitacion.disponible && user.is_superuser && (
                  <Button color={'red.600'} leftIcon={<FaRegWindowClose />} pt={'5px'} onClick={() => handleDeleteReserva(reserva.id)}>
                    Cancelar Reserva
                  </Button>
                )}
              </Stack>
            );
          })}
        </Grid>
      </Stack>
    </>
  );
}