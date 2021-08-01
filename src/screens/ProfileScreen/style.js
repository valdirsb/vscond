import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        padding: 20px;
        background-color: #F5F6FA;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding: 20px;
    `,
    PhotoArea: styled.View`
        margin-bottom: 30px;
    `,
    PhotoScroll: styled.ScrollView`
    flex: 1;
    margin-bottom: 30px;
`,
PhotoAddButton: styled.TouchableOpacity`
        width: 65px;
        height: 65px;
        justify-content: center;
        align-items: center;
        border-width: 1px;
        border-color: #CCC;
        border-radius: 5px;
        margin-left: 5px;
    `,
    PhotoItem: styled.View`
    width: 65px;
    border-width: 1px;
    border-color: #CCC;
    border-radius: 5px;
    padding-bottom: 5px;
    margin-left: 5px;
    align-items: center;
`,
Photo: styled.Image`
    width: 63px;
    height: 63px;
    margin-bottom: 5px;
    border-radius: 5px;
`,
PhotoRemoveButton: styled.TouchableOpacity``,
    Image: styled.Image`
        border-width: 2px;
        border-color: #CCC;
        background-color: #FFF;
        border-radius: 15px;
        width: 150px;
        height: 150px;        
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
    `,
    PhotoArea: styled.View``,
    Title: styled.Text`
        font-size: 17px;
        color: #000;
        margin: 10px 0;
    `,
    Title: styled.Text`        
        color: #000;
        font-size: 15px;
        padding: 10px;
        margin-bottom: 15px;
        align-items: center;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #0098DA;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 15px;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `
};