import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'
import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents(){
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident){
        navigation.navigate('Detail',{ incident })
    }

    async function loadIncidents(){
        if(loading){
            return
        }

        if(total>0 && incidents.length === total){
            return
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: page,
        });

        setIncidents(...incidents,...response.data)
        setTotal(response.headers['x-total-count'])
        setPage(page+1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text>Total de <TexT style={styles.headerTextBold}>{total} casos</TexT>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList  
                style={styles.incidentList}
                data={[1,2,3]}
                keyExtractor={incident => String(incident.id)}
                showsHorizontalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (

                <View style={styles.incident}>
                    <Text style={styles.incidentProprety}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProprety}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProprety}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFOrmat('pt-BR', {style: 'currency', currency: 'BRl',}).format(incident.value)}</Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => navigateToDetail(incidents)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>

    )
}