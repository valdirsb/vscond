import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';



export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [photo, setPhoto] = useState({});
    const [description, setDescription] = useState('');
    const [where, setWhere] = useState('');
    
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Perfil'
        });
    }, []);

    const handleAddPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            maxHeight: 900,
            maxWidth: 1200,
            quality:0.8
        }, (response) => {
            if(!response.didCancel) {
                setPhoto(response.assets[0]);
            }
        });
    }

    const handleAddLibrary = () => {
        launchImageLibrary({
            mediaType: 'photo',
            maxHeight: 600,
            maxWidth: 800,
            quality:0.7
        }, (response) => {
            if(!response.didCancel) {
                setPhoto(response);
            }
        });
    }

    const handleSave = async () => {
        if('' && photo.uri !== '') {
            const result = await api.addLostItem(
                photo, 
            );
            if(result.error === '') {
                setPhoto({});
                setDescription('');
                setWhere('');
                navigation.navigate('FoundAndLostScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert('Preencha os campos');
        }
    }


   
    return (
        <C.Container>
            <C.Title>Olá {context.user.user.name}</C.Title>
            <C.UnitText>{context.user.property.name}</C.UnitText>
            
            <C.Image
                source={require('../../assets/undraw_home.png')}
                resizeMode="contain"
            />
                <C.PhotoArea>
                    {!photo.uri &&
                        <C.ButtonArea onPress={handleAddPhoto}>
                            <C.ButtonText>Tirar uma foto</C.ButtonText>
                        </C.ButtonArea>
                    }
                    {photo.uri &&
                        <>
                            <C.PhotoItem source={{uri: photo.uri}} resizeMode="cover" />
                            <C.ButtonArea onPress={handleAddPhoto}>
                                <C.ButtonText>Tirar outra foto</C.ButtonText>
                            </C.ButtonArea>
                        </>
                    }
                </C.PhotoArea>
            
        </C.Container>
    );
}