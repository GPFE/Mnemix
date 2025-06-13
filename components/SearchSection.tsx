import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import { Card, Text, TextInput } from "react-native-paper"
import { verticalScale } from "react-native-size-matters"

export default function SearchSection({setSearchQuery, searchQuery}) {
    const [suggestions, setSuggestions] = useState([])
    const [isFocused, setIsFocused] = useState(false)
    const suggestionPressed = useRef(false)

    useEffect(() => {
        axios.get(`https://api.datamuse.com/sug?s=${encodeURIComponent(searchQuery)}`)
            .then(response => setSuggestions(response.data.map((item: { word: string, score: number }) => item.word)))
    }, [searchQuery])

    const handleSearchBlur = () => {
        if (suggestionPressed.current) return
        setIsFocused(false)
    }

    return(
        <View
            style={{
                minHeight: verticalScale(120),
                width: "100%",
                position: "fixed",
                zIndex: 1,
                top: 0
            }}
        >
            <TextInput
                onChangeText={setSearchQuery}
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={handleSearchBlur}
            />
            <View
                style={{
                    maxHeight: verticalScale(100),
                    visibility: isFocused ? "visible" : "collapse"
                }}
            >
                <FlatList
                    data={suggestions}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item}) => (
                        <Pressable
                            onPressIn={() => {
                                setSearchQuery(item)
                                suggestionPressed.current = true
                            }}
                            onPressOut={() => {
                                suggestionPressed.current = false
                            }}
                        >
                            <Card
                                style={{
                                    borderRadius: 0
                                }}
                            >
                                <Card.Content>
                                    <Text>{item}</Text>
                                </Card.Content>
                            </Card>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    )
}
