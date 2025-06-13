import axios from "axios"
import { useEffect, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import { Card, Text, TextInput } from "react-native-paper"
import { verticalScale } from "react-native-size-matters"

export default function SearchSection({setSearchQuery, searchQuery}) {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        axios.get(`https://api.datamuse.com/sug?s=${encodeURIComponent(searchQuery)}`)
            .then(response => setSuggestions(response.data.map((item: { word: string, score: number }) => item.word)))
    }, [searchQuery])

    return(
        <>
            <TextInput
                onChange={e => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
            <View
                style={{
                    maxHeight: verticalScale(100),
                    width: "100%"
                }}
            >
                <FlatList
                    data={suggestions}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item}) => (
                        <Pressable>
                            <Card>
                                <Card.Content>
                                    <Text>{item}</Text>
                                </Card.Content>
                            </Card>
                        </Pressable>
                    )}
                >
                
                </FlatList>
            </View>
        </>
    )
}
