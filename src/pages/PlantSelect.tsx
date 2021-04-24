import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import EnviromentButton from '../components/EnviromentButton';
import Header from '../components/Header';
import Load from '../components/Load';
import PlantCardPrimary from '../components/PlantCardPrimary';
import { PlantProps } from '../libs/storage';
import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
    key: string,
    title: string,
}

export default function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false)

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        }
        else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handleChangeSelectedEnviroment(enviroment: string) {
        setEnviromentSelected(enviroment);

        if(enviroment == 'all')
            return setFilteredPlants(plants);
        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);
    }

    useEffect(() => {
        (async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data,
            ]);
        })()
    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])

    if(loading)
        return <Load />

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Header />
                <Text style={ styles.title }>
                    Em qual ambiente
                </Text>
                <Text style={ styles.subtitle }>
                    você quer colocar sua planta?
                </Text>
            </View>
            
            <View>
                <FlatList
                    data={ enviroments }
                    renderItem={
                        ({ item }) => (
                            <EnviromentButton 
                                title={ item.title } 
                                active={ item.key === enviromentSelected }
                                onPress={ () => handleChangeSelectedEnviroment(item.key) }
                            />
                        )
                    }
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                    contentContainerStyle={ styles.enviromentList }
                    keyExtractor={ item => item.key }
                />
            </View>

            <View style={ styles.plants }>
                <FlatList
                    data={ filteredPlants }
                    renderItem={ ({item}) => 
                        <PlantCardPrimary
                            data={ item }
                            onPress={ () => handlePlantSelect(item) }
                        />
                    }
                    keyExtractor={ item => item.id }
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
                    onEndReachedThreshold={ 0.1 }
                    onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green_dark} />
                        : <></>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, 
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 30,
        marginVertical: 30,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    }
})