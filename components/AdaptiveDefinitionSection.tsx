import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Text } from "react-native-paper"

interface AdaptiveDefinitionSectionProps {
    term: (string | null)
}

const tones = {
    children: "You are a friendly explainer who rewrites definitions in a fun, simple as possible, and childish way that kids can easily understand.",
    human: "You are a humane and empathetic explainer. Rewrite definitions clearly with warmth, making them relatable and easy to grasp for everyone.",
    expert: "You are an expert in the field. Rewrite definitions with precise, detailed, and concrete explanations suitable for professionals.",
}

export default function AdaptiveDefinitionSection({term}: Readonly<AdaptiveDefinitionSectionProps>) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!term) return

        axios.get(`https://mnemix.arcd009999.workers.dev/openrouter/?systemMessage=${encodeURIComponent(tones["children"])}&message=${encodeURIComponent(`What does ${term} mean?`)}`)
            .then(response => {
                setIsLoading(false)
                setData(response?.data?.choices?.at(0)?.message?.content)
                console.log(response)
            })
            .catch(console.log)
    }, [term])
    
    return(
        <Card>
            <Card.Content>
                <Text>{data ?? "No term found."}</Text>
            </Card.Content>
        </Card>
    )
}