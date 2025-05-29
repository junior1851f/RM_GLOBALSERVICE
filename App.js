import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

export default function App() {
  const viewShotRef = useRef();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [scale, setScale] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const captureAndShare = async () => {
    const uri = await viewShotRef.current.capture();
    Share.open({
      title: 'Remanejamento',
      message: `Remanejamento de ${name}`,
      url: `file://${uri}`,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '+5592992926772',
    }).catch(err => Alert.alert('Erro', err.message));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image source={require('./assets/logo.png')} style={{ width: 200, height: 60, resizeMode: 'contain' }} />
        </View>

        <Text>Nome:</Text>
        <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10 }} />

        <Text>Data:</Text>
        <TextInput value={date} onChangeText={setDate} style={{ borderWidth: 1, marginBottom: 10 }} />

        <Text>Escala (12x36, 5x2, 6x1):</Text>
        <TextInput value={scale} onChangeText={setScale} style={{ borderWidth: 1, marginBottom: 10 }} />

        <Text>Início:</Text>
        <TextInput value={startTime} onChangeText={setStartTime} style={{ borderWidth: 1, marginBottom: 10 }} />

        <Text>Término:</Text>
        <TextInput value={endTime} onChangeText={setEndTime} style={{ borderWidth: 1, marginBottom: 10 }} />
      </ViewShot>

      <TouchableOpacity onPress={captureAndShare} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Enviar pelo WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}