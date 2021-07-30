import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import DocItem from '../../components/DocItem';

export default () => {
    const navigation = useNavigation();


    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Perfil'
        });
    }, []);


    return (
        <C.Container>
            <C.Titulo>Perfil - mudando...</C.Titulo>
        </C.Container>
    );
}