import React from 'react';
import WifiSVG from 'src/assets/svgs/wifi.svg';
import CarSVG from 'src/assets/svgs/car.svg';
import GymSVG from 'src/assets/svgs/gym.svg';
import HeaterSVG from 'src/assets/svgs/heater.svg';
import AirconSVG from 'src/assets/svgs/snowflake.svg';
import SofaSVG from 'src/assets/svgs/sofa.svg';
import UtilitiesSVG from 'src/assets/svgs/utilities.svg';
import BusSVG from 'src/assets/svgs/bus.svg';

const amenities = [
  {
    icon: <WifiSVG />,
    label: 'Wifi',
    value: 'wifi',
  },
  {
    icon: <CarSVG />,
    label: 'Parking',
    value: 'parking',
  },
  {
    icon: <GymSVG />,
    label: 'Gym',
    value: 'gym',
  },
  {
    icon: <HeaterSVG />,
    label: 'Heater',
    value: 'heater',
  },
  {
    icon: <AirconSVG />,
    label: 'Aircon',
    value: 'aircon',
  },
  {
    icon: <SofaSVG />,
    label: 'Furnished',
    value: 'furnished',
  },
  {
    icon: <UtilitiesSVG />,
    label: 'Utilities Included',
    value: 'utilities',
  },
  {
    icon: <BusSVG />,
    label: 'TCAT Accessible',
    value: 'tcat',
  },
];

export default amenities;
