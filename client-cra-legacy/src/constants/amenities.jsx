import React from 'react';
import { ReactComponent as WifiSVG } from 'src/assets/svgs/wifi.svg';
import { ReactComponent as CarSVG } from 'src/assets/svgs/car.svg';
import { ReactComponent as GymSVG } from 'src/assets/svgs/gym.svg';
import { ReactComponent as HeaterSVG } from 'src/assets/svgs/heater.svg';
import { ReactComponent as AirconSVG } from 'src/assets/svgs/snowflake.svg';
import { ReactComponent as SofaSVG } from 'src/assets/svgs/sofa.svg';
import { ReactComponent as UtilitiesSVG } from 'src/assets/svgs/utilities.svg';
import { ReactComponent as BusSVG } from 'src/assets/svgs/bus.svg';

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
