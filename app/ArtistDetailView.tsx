import React from "react";
import { Artist } from "@/types/artist";
import { Text, View, Image, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useLocalSearchParams } from "expo-router";

const MainContainer = styled(View)`
  margin: 5px;
  background-color: white;
  flex-direction: column;
  shadow-color: black;
  shadow-opacity: 0.1;
  shadow-offset: 1px -2px;
  elevation: 2;
  padding: 10px;
  border-radius: 8px;
  flex:1;
  align-items: center;
`;

const ImageContainer = styled(Image)`
  width: 70%;
  height: 200px;
  resize-mode: cover;
  border-radius: 8px;
    margin-top: 10px;
`;

const ArtistName = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const ArtistDetails = styled(Text)`
  font-size: 18px;
  margin-top: 10px;
`;


interface ArtistDetailViewProps {
  id: string;
  name: string;
  image: string;
}

const ArtistDetailView: React.FC<ArtistDetailViewProps> = () => {
    const {id, name, image} = useLocalSearchParams();

    console.log('ArtistDetailView', {id, name, image});

    return (
        <ScrollView>
            <MainContainer>
                <ImageContainer source={{uri: Array.isArray(image) ? image[0] : image}} />
                <ArtistName>{name}</ArtistName>
                <ArtistDetails>{id}</ArtistDetails>
            </MainContainer>
        </ScrollView>
    );

}

export default ArtistDetailView;