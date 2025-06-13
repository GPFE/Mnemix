import { Image } from "react-native"
import { Card } from "react-native-paper"

export default function ImageSection({url}) {

    return(
        <Card
            style={{
                width: "100%",
                borderRadius: 0
            }}
        >
            <Card.Content
                style={{
                    alignItems: "center",
                    display: "flex"
                }}
            >
                <Image
                    style={{
                        width: 200,
                        height: 200
                    }}
                    source={{
                        uri: url
                    }} />
            </Card.Content>
        </Card>
    )
}