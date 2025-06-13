import AdaptiveDefinitionSection from "@/components/AdaptiveDefinitionSection";
import AudioSection from "@/components/AudioSection";
import DefinitionSection from "@/components/DefinitionSection";
import ImageSection from "@/components/ImageSection";
import RelatedSection from "@/components/RelatedSection";
import SearchSection from "@/components/SearchSection";
import TitleSection from "@/components/TitleSection";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { scale, verticalScale } from 'react-native-size-matters';

export default function Index() {
  const [media, setMedia] = useState("cat")
  const [data, setData] = useState("")
  const [searchQuery, setSearchQuery] = useState("cat")

  useEffect(() => {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchQuery)}`)
    .then(response => setData(response.data[0]))
    .catch(e => console.log(e))

    axios.get(`${process.env.EXPO_PUBLIC_PIXABAY_API_URL}/?q=${encodeURIComponent(searchQuery)}&image_type=photo`)
          .then(response => setMedia(response.data.hits.at(0)))
  }, [searchQuery])
    
  return (
      <ScrollView
        contentContainerStyle={styles.contentConatiner}
        style={{
      
        }}
      >
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TitleSection
          word={data?.word}
          phonetic={data?.phonetic}
        />
        <DefinitionSection
          definitions={data?.meanings?.at(0)?.definitions}
        />
        <ImageSection url={media?.webformatURL} />
        <AudioSection phonetics={data?.phonetics} />
        <AdaptiveDefinitionSection term={data?.word} />
        <RelatedSection
          title="Synonyms"
          words={data?.meanings?.at(0)?.synonyms}
        />
        <RelatedSection
          title="Antonyms"
          words={data?.meanings?.at(0)?.antonyms}
        />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentConatiner: {
      marginTop: verticalScale(100),
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: scale(10),
      maxWidth: 1000,
      alignSelf: "center"
  }
})