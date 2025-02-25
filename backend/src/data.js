 export const sampledata = [
    {
      id: '1',
      name: 'Apple',
      imageUrl: 'apple1.png',
      origins: ['USA'],
      price: 15,
      favorite: false,
      stars: 4.7,
      tags: ['Fruit']
    },
    {
      id: '2',
      name: 'Kiwi',
      imageUrl: 'kiwi.jpg',
      origins: ['New Zealand'],
      price: 25,
      favorite: true,
      stars: 4.8,
      tags: ['Fruit']
    },
    {
      id: '3',
      name: 'Basmati Rice',
      imageUrl: 'basmati-rice.png',
      origins: ['India', 'Pakistan'],
      price: 50,
      favorite: true,
      stars: 4.9,
      tags: ['Rice']
    },
    {
      id: '4',
      name: 'Biryani',
      imageUrl: 'biryani-category.png',
      origins: ['India'],
      price: 200,
      favorite: true,
      stars: 5.0,
      tags: ['Rice']
    },
    {
      id: '5',
      name: 'Amaranthus',
      imageUrl: 'amaranthus.jpg',
      origins: ['Worldwide'],
      price: 15,
      favorite: false,
      stars: 4.6,
      tags: ['Vegetable']
    },
    {
      id: '6',
      name: 'Beetroot',
      imageUrl: 'beetroot.jpg',
      origins: ['Europe', 'Asia'],
      price: 25,
      favorite: true,
      stars: 3,
      tags: ['Vegetable']
    },
    {
      id: '7',
      name: 'Cake',
      imageUrl: 'cake.png',
      origins: ['Worldwide'],
      price: 300,
      favorite: true,
      stars: 4.9,
      tags: ['Dessert']
    },
    {
      id: '8',
      name: 'Brinjal',
      imageUrl: 'brinjal.jpg',
      origins: ['India', 'China'],
      price: 30,
      favorite: false,
      stars: 4.5,
      tags: ['Vegetable']
    },
    {
      id: '9',
      name: 'Burger',
      imageUrl: 'burger-king.png',
      origins: ['USA'],
      price: 400,
      favorite: true,
      stars: 4.8,
      tags: ['Fast Food']
    },
    {
      id: '10',
      name: 'Carrot',
      imageUrl: 'carrot.jpg',
      origins: ['Asia', 'Europe'],
      price: 30,
      favorite: true,
      stars: 4.7,
      tags: ['Vegetable']
    },
    {
      id: '11',
      name: 'Chicken',
      imageUrl: 'chicken-category.png',
      origins: ['Worldwide'],
      price: 250,
      favorite: true,
      stars: 4.9,
      tags: ['Fast Food']
    },
    {
      id: '12',
      name: 'Coriander',
      imageUrl: 'coriander.jpg',
      origins: ['Mediterranean', 'Asia'],
      price: 15,
      favorite: false,
      stars: 4.6,
      tags: ['Vegetable']
    },
    {
      id: '13',
      name: 'Dosa',
      imageUrl: 'dosa-masala.png',
      origins: ['India'],
      price: 40,
      favorite: true,
      stars: 4.9,
      tags: ['Breakfast']
    }
  ];
  
  export const getAll = async () => sampledata;

  export const sampletags=[
    {name:'All',count:13},
    {name:'Vegetable',count:5},
    {name:'Fruit',count:2},
    {name:'Fast Food',count:2},
    {name:'Rice',count:2},
    {name:'Breakfast',count:1},
    {name:'Dessert',count:1}
  ]

  export const getAllTag = async () => sampletags;
  

export const sampleuser=[
  {
    id:1,
    name:'vahitha',
    email:'vahitha@gmail.com',
    password:'vahitha2013',
    address:'vijayawada',
    isAdmin:true,
  },
  {
    id:2,
    name:'balu',
    email:'balu@gmail.com',
    password:'balu123',
    address:'vijayawada',
    isAdmin:false,
  }
]