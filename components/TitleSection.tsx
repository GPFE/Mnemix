import { Text } from "react-native-paper";
interface TitleSectionProps {
    word: string;
    phonetic: string;
}

export default function TitleSection({word, phonetic} : Readonly<TitleSectionProps>) {
    return(
        <>
        <Text
            variant="headlineLarge"
        >
            {word || "No title available."}
        </Text>
        <Text>
            {phonetic || "No phonetic available."}
        </Text>
        </>
    )
}