import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [warnText, setWarnText] = useState('');
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Adicionar uma Ocorrência'
        });
    }, []);

    const handleAddPhoto = async () => {

        launchCamera({
            mediaType: 'photo',
            maxHeight: 900,
            maxWidth: 1200,
            quality:0.8
        }, async (response) => {
            if(!response.didCancel) {
                setLoading(true);
                let result = await api.addWarningFile(response);
                setLoading(false);
                if(result.error === '') {
                    let list = [...photoList];
                    list.push(result.photo);
                    setPhotoList(list);
                } else {
                    alert(result.error);
                }
            }
        });
    }

    const handleAddLibrary = async () => {

        launchImageLibrary({
            mediaType: 'photo',
            maxHeight: 600,
            maxWidth: 800,
            quality:0.7
        }, async (response) => {
            if(!response.didCancel) {
                setLoading(true);
                let result = await api.addWarningFile(response);
                setLoading(false);
                if(result.error === '') {
                    let list = [...photoList];
                    list.push(result.photo);
                    setPhotoList(list);
                } else {
                    alert(result.error);
                }
            }
        });
    }

    const handleDelPhoto = (url) => {
        let list = [...photoList];
        list = list.filter(value=>value!==url);
        setPhotoList(list);
    }

    const handleSaveWarn = async () => {
        if(warnText !== '') {
            const result = await api.addWarning(warnText, photoList);
            if(result.error === '') {
                setWarnText('');
                setPhotoList([]);
                navigation.navigate('WarningScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert("Descreva a ocorrência");
        }
    }

    return (
        <C.Container>
            <C.Scroller>
                <C.Title>Descreva a ocorrência</C.Title>
                <C.Field
                    placeholder="Ex: Vizinho X está com som alto."
                    value={warnText}
                    onChangeText={t=>setWarnText(t)}
                />

                <C.Title>Fotos relacionadas</C.Title>
                <C.PhotoArea>
                    <C.PhotoScroll horizontal={true}>
                        <C.PhotoAddButton onPress={handleAddPhoto}>
                            <Icon name="camera" size={24} color="#000" />
                        </C.PhotoAddButton>

                        <C.PhotoAddButton onPress={handleAddLibrary}>
                            <Icon name="photo" size={24} color="#000" />
                        </C.PhotoAddButton>

                    </C.PhotoScroll>
                    <C.PhotoScroll horizontal={true}>
                        
                        {photoList.map((item, index)=>(
                            <C.PhotoItem key={index}>
                                <C.Photo source={{uri: item}} />
                                <C.PhotoRemoveButton onPress={()=>handleDelPhoto(item)}>
                                    <Icon name="remove" size={16} color="#FF0000" />
                                </C.PhotoRemoveButton>
                            </C.PhotoItem>
                        ))}
                    </C.PhotoScroll>
                </C.PhotoArea>

                {loading &&
                    <C.LoadingText>Enviando foto. Aguarde.</C.LoadingText>
                }

                <C.ButtonArea disabled={loading?true:false} onPress={handleSaveWarn}>
                    <C.ButtonText>Salvar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
}