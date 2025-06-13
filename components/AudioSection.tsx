import AntDesign from '@expo/vector-icons/AntDesign';
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function AudioSection({phonetics}) {
    const [currentAudio, setCurrentAudio] = useState(null)
    const player = useAudioPlayer(currentAudio)
    // console.log(phonetics)
    // phonetics?.at(0)?.audio

    useEffect(() => {
        if (!currentAudio) return
        player.play()
    }, [currentAudio])

    return (
        <Card>
            <Card.Content>
                {
                    phonetics?.at(0) ?
                    phonetics.map((phonetic, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                setCurrentAudio(phonetic.audio)
                            }
                            }
                        >
                            <AntDesign name="playcircleo" size={24} color="black" />
                        </Pressable>
                    )) :
                    <Text>No audio available.</Text>
                }
            </Card.Content>
        </Card>
    )
}