import { Stack, Box, Flex, Button, Input, Text} from '@chakra-ui/react';
import { FaHotel, FaSearch, FaReply } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import { useState, useContext } from 'react';

import AuthContext from '../context/AuthContext'

export default function Navbar({ onSearchChange }){

    const [isExploring, setIsExploring] = useState(false);
    const [search, setSearch] = useState("");
    
    let {user, logoutUser} = useContext(AuthContext)
    

    const onClickSearch = () => {
      setIsExploring(true);
    }

    const handleSearchChange = (e) => {
      setSearch(e.target.value);
      onSearchChange(e.target.value);
    };


    
    return (
      <Stack
      direction={['row']}
      spacing='24px'
      width='100%'
      backgroundColor='gray.800'
      padding={10}
      alignItems='center'>
        
      <Flex alignItems='center' gap={4} flex={1}>
        <Box color='white'>
          <Flex alignItems='center' gap={2}>
            <FaHotel />
            <Link to={'/'} align='center'>
              HotelApp
            </Link>
          </Flex>
        </Box>

        <Box color='white' flex={1}>
          {isExploring ? (
            <Button
              border='none'
              colorScheme='whiteAlpha'
              variant='ghost'
              color='white'
              leftIcon={<FaSearch />}
            >
              <Flex alignItems='center' gap={2}>
                <Input
                  placeholder='Buscar Habitacion..'
                  border='none'
                  color='white'
                  variant='unstyled'
                  value={search}
                  onChange={handleSearchChange}
                />
              </Flex>
            </Button>
          ) : (
            <Button
              border='none'
              colorScheme='whiteAlpha'
              variant='ghost'
              color='white'
              leftIcon={<FaSearch />}
              onClick={onClickSearch}
            >
              <Flex alignItems='center' gap={2}>
                Explorar
              </Flex>
            </Button>
          )}
          
        </Box>
        
      </Flex>

      

      <Box color='white'>
        <Flex alignItems='center' gap={2}>
          <FaReply />
          {user ? (
                 <Text cursor='pointer' onClick={logoutUser}>Salir</Text>
            ): (
          <Link to={'/login'} align='center'>
            Iniciar Sesión
          </Link>
          )}
        </Flex>
      </Box>

      
    </Stack>
  );
}