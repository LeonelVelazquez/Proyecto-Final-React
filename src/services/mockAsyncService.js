import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";

const databaseItemes = [
    {
        id: "1",
        title: "Taza Bugs Bunny",
        price: 2000,
        detail: "Taza de personaje capacidad 600ml",
        imgurl: "../assets/img/Bugs.png",
        category: "tazas",
        stock: 4


    },
    {
        id: "2",
        title: "Set de jardin Grizzy",
        price: 2500,
        detail: "set de jardin completo",
        imgurl: "../assets/img/GRIZZY.png",
        category: "set",
        stock: 2,

    },
    {
        id: "3",
        title: "Taza Rafa Gorgory",
        discount: 30,
        price: 3000,
        detail: "Taza edicion limitada 600ml",
        imgurl: "../assets/img/TazaRafa.png",
        category: "tazas",
        stock: 2,

    },
    {
        id: "4",
        title: "Llavero de Argentina",
        price: 1000,
        detail: "Llavero de la nueva camiseta ",
        imgurl: "../assets/img/llaveros.png",
        category: "llavero",
        stock: 40,

    },

    {
        id: "5",
        title: "Taza de dos Grades",
        price: 2400,
        detail: "Diego y Messi dos leyendas",
        imgurl: "../assets/img/Idolos.png",
        category: "tazas",
        stock: 2,
    },
    {
        id: "6",
        title: "Remera Death Cat ",
        price: 3000,
        detail: "Remera gato de la muerte",
        imgurl: "../assets/img/Cat.png",
        category: "remeras",
        stock: 2,
    },
    {
        id: "7",
        title: "Remera Cat Fuck Off",
        price: 3000,
        detail: "Gatito Fuck Off",
        imgurl: "../assets/img/Remeras.png",
        category: "remeras", 
        stock: 5,
    },
    {
        id: "8",
        title: "Vaso de Bad Bunny",
        price: 1500,
        detail: "vaso de acrilico capacidad 700ml",
        imgurl: "../assets/img/vasoBad.png",
        category: "vasos",
        stock:20,

    },
    {
        id: "9",
        title: "Set de Jardin Lilo y Stitch",
        price: 2300,
        detail: "Set de jardin con taza, toalla, individual",
        imgurl: "../assets/img/set.png",
        category: "set",
        stock: 2,
    },
    {
        id: "10",
        title: "Set de Jardin Granja de Zenon",
        price: 2300,
        detail: "Set de jardin con taza, toalla, individual",
        imgurl: "../assets/img/Jardin.png",
        category: "set",
        stock: 2,
    },


];

function getItems() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(databaseItemes);
        }, 2000);
    });
}

export function getSingleItem(itemid) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(databaseItemes.find((prod) => prod.id === itemid));
        }, 2000);
    })
}

export default getItems;