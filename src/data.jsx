import { db } from './firebase'; // Ensure you have Firebase initialized
import { collection, addDoc,getDocs } from "@firebase/firestore"; 

export const saveToFavorites = async (plantData) => {
  try {
    // Define your collection, in this case "favorites"
    const favoritesCollection = collection(db, 'favorites');
    
    // Add the document to the favorites collection
    await addDoc(favoritesCollection, {
      common_names: plantData.common_names,
      taxonomy: plantData.taxonomy,
      url: plantData.url,
      inaturalist_id: plantData.inaturalist_id,
      rank: plantData.rank,
      description: plantData.description,
      synonyms: plantData.synonyms,
      image: plantData.image,
      watering: plantData.watering,
      propagation_methods: plantData.propagation_methods,
      name: plantData.name,
      entity_id: plantData.entity_id,
    });

    console.log('Document successfully written to favorites!');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const fetchFavorites = async () => {
    try {
      const favoritesCollection = collection(db, 'favorites');
      const querySnapshot = await getDocs(favoritesCollection);
      const favoritesList = querySnapshot.docs.map(doc => doc.data());
      return favoritesList; // Return the favorites list
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return []; // Return an empty array if there's an error
    }
  };




