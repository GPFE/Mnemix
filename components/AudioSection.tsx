import AntDesign from '@expo/vector-icons/AntDesign';
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function AudioSection({phonetics}) {
    const [currentAudio, setCurrentAudio] = useState(null)
    const player = useAudioPlayer(currentAudio)
    console.log(phonetics)
    // phonetics?.at(0)?.audio

    useEffect(() => {
        if (!currentAudio) return
        player.play()
    }, [currentAudio])

    return (
        <Card
            style={{
                borderRadius: 0,
                width: "100%"
            }}
        >
            <Card.Content>
                {
                    phonetics?.at(0) ?
                    phonetics.map((phonetic, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center"
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    setCurrentAudio(phonetic.audio)
                                }
                                }
                            >
                                <AntDesign name="playcircleo" size={24} color="black" />
                            </Pressable>
                            <Text>{phonetic.text}</Text>
                        </View>
                    )) :
                    <Text>No audio available.</Text>
                }
            </Card.Content>
        </Card>
    )
}