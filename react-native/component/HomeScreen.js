import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import LocalInfo from './LocalInfo'
import StateInfo from './StateInfo.js'
import { storeData, retrieveData } from "../functions/localStorage.js"
import useData from '../functions/useData'

const styles = StyleSheet.create({
    container: {
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#20232a',
        borderRadius: 6,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: "gray",
    },
})

export default function HomeScreen() {
    // props?
    // retrieve from async storage or backend?

    const state = "WI";
    const stateNumDays = 31;
    const zipcode = 53703;
    const localNumDays = 7;

    return (
        <>
            <ScrollView>
                <LocalInfo zipcode={zipcode} styles={styles} numDays={localNumDays}/>
                {state? <StateInfo state={state} styles={styles} numDays={stateNumDays} /> : null}
            </ScrollView>
        </>
    )
}
