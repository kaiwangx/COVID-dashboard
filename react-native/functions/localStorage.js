import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Retrieve data from the local storage
 */
retrieveData = async ( key ) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error)
  }
};

/**
 * Store key value pair into the local storage
 */
storeData = async ( key, item ) => {
  try {
    await AsyncStorage.setItem(
      key,
      item
    );
  } catch (error) {
    console.log(error)
  }
};

export { retrieveData, storeData }