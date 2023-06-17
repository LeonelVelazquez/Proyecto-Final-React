import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, where, query, addDoc } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAeXCsEfNrRbumijC_eZcdEJVIXt-Hf_Wg",
    authDomain: "ln-sublimacion-3a22c.firebaseapp.com",
    projectId: "ln-sublimacion-3a22c",
    storageBucket: "ln-sublimacion-3a22c.appspot.com",
    messagingSenderId: "562677991278",
    appId: "1:562677991278:web:3ffabd9ffdc2f62841237f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function testApp() {
}

export async function getSingleItem(itemid) {
    const docRef = doc(db, "products", itemid);
    const snapshot = await getDoc(docRef);

    const docData = snapshot.data();
    docData.id = snapshot.id;
    return snapshot.data()
}

export async function getItems() {
    const productsCollection = collection(db, "products")
    const querySnapshot = await getDocs(productsCollection)

    const dataDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return dataDocs
}

export function getItemsPromise() {
    return Promise((resolve, reject) => {
        const productsCollection = collection(db, "products")
        getDocs(productsCollection).then(querySnapshot => {
            const dataDocs = querySnapshot.docs.map((doc) = ({
                ...doc.data(),
                id: doc.id,
            }))
            resolve(dataDocs)
        })
    })
}

export async function ItemListContainer(categoryid) {
    const productsCollectionRef = collection(db, "producs")

    const q = query 
    (productsCollectionRef, where("category", "==", categoryid))

    const querySnapshot = await getDocs(q)

    const dataDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return dataDocs


   
}

export async function createBuyOrder(order){
 const orderCollection = collection("orders")
 

 const orderCreated = await addDoc(orderCollection, order)
}