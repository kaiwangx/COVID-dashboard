import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Retrieve data from the local storage
 */
async function retrieveData( key ) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return {}
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Store key value pair into the local storage
 */
 async function storeData( key, item ) {
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