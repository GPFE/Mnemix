import { Card, Text } from "react-native-paper";

interface RelatedSectionProps {
    title: string;
    words: (null | string[])
}

export default function RelatedSection({title, words} : RelatedSectionProps) {
    console.log(words)
    return(
        <Card
            style={{
                width: "100%"
            }}
        >
            <Card.Content>
                <Text 
                 variant="titleLarge">{title || ""}</Text>
                {
                    words?.slice(0, 8).map((word, index) => (
                        <Text key={index} variant="bodyMedium">{word}</Text>
                    )) || `No ${title?.toLowerCase()} yet.`
                }
            </Card.Content>
        </Card>
    )
}