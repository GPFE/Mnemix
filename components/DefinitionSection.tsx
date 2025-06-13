import { Card, Text } from "react-native-paper";

interface Definition {
    definition: string;
    synonyms: (string | null)[];
    antonyms: (string | null)[];
}

interface DefinitionSectionProps {
    definitions: Definition[]
}

export default function DefinitionSection({definitions}: Readonly<DefinitionSectionProps>) {
    return (
        <Card style={{
            width: "100%",
            boxShadow: "none",
            borderRadius: 0,
            borderLeftColor: "black",
            borderLeftWidth: 5
        }}>
            <Card.Content>
                <Text variant="titleLarge">Definition</Text>
                <Text variant="bodyMedium">{definitions?.at(0)?.definition || "No definitions available."}</Text>
            </Card.Content>
        </Card>
    ) 
}