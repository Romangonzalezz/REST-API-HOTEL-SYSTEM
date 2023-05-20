import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { Image, Stack, Text } from "@chakra-ui/react";

import * as API from '../services/habitaciones';

export default function SimpleSlider() {
    const [habitaciones, setHabitaciones] = useState([])

    useEffect(() => {
        API.getHabitaciones().then(setHabitaciones)
      }, []);

    var settings = {
        className: 'center',
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
        centerPadding: '100px',
        speed: 500,
        
    };


    return (
        <Stack padding={'40px'}> 
            <Slider {...settings}>
            {habitaciones.map((habitacion, index) => (
                <div key={index}>
               
                <Image src={habitacion.imagen} key={index} objectFit="cover" width={'100%'} height="300px"/>
                <Text align={"center"} fontWeight="bold"> {habitacion.tipo} </Text>
                
                </div>
            ))}
            </Slider>
        </Stack>
      );
    }