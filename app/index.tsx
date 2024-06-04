import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Pokemon, getPokemon } from "@/api/pokeapi";
import { Ionicons } from "@expo/vector-icons";

//@ & Relative path ../

//CONT RENDERING :39

const Page = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  //to Load the Data,we're going to use the useEffect
  //which it will be clled the component 1st mounted

  useEffect(() => {
    const load = async () => {
      const result = await getPokemon();
      setPokemon(result);

      //console.log("~ file: index.tsx:12 ~ load ~ result:", result);
    };
    load();
  }, []);

  return (
    <ScrollView>
      {pokemon.map((p) => (
        <Link href={`/(pokemon)/${p.id}`} key={p.id} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={{ uri: p.image }} style={styles.preview} />
              <Text style={styles.itemText}>{p.name}</Text>
              <Ionicons name="chevron-forward" size={24} />
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 18,
    textTransform: "capitalize",
    flex: 1,
  },
  preview: {
    width: 100,
    height: 100,
  },
});

export default Page;
