// cards.js
import wormImage from '/home/olymarks/JS-Projects/Crab de Jour/src/assets/imgs/bait/bait-worm.png';
import fishImage from '/home/olymarks/JS-Projects/Crab de Jour/src/assets/imgs/bait/bait-fish.png';
import crabCrackImage from '/home/olymarks/JS-Projects/Crab de Jour/src/assets/imgs/bait/bait-crab-crack.png'; 

// react version of services, dependency injection

const allCards = [
    {
        type: 'Bait',
        title: 'Worm',
        img: wormImage,
        description: '+1 to your catch roll this turn',
        cost: 1,
        effect: function (setPlayers) {
          setPlayers(prevPlayers => ({
              ...prevPlayers,
              currentModifier: prevPlayers.currentModifier + 1
          }));
      },
        

    },
    {
        type: 'Bait',
        title: 'Fish',
        img: fishImage,
        description: '+2 to your catch roll this turn',
        cost: 2,
        effect: function (setPlayers) {
          setPlayers(prevPlayers => ({
              ...prevPlayers,
              currentModifier: prevPlayers.currentModifier + 2
          }));
         
      },

    },
    {
        type: 'Bait',
        title: 'Crab Crack',
        img: crabCrackImage,
        description: '+3 to your catch roll this turn',
        cost: 3,
        effect: function (setPlayers) {
          setPlayers(prevPlayers => ({
              ...prevPlayers,
              currentModifier: prevPlayers.currentModifier + 3
          }));
         
      },

    },
    { type : 'Action',
      title: 'Tidal Surge',
      img: wormImage,
      description:'ignore tide modifiers for your catches this turn',
      cost:2,
      effect: function () {
        console.log("test")

    },
    location: 'shop'
    },
    { type : 'Action',
      title: 'Mooncrooner',
      img: wormImage,
      description:'reverse the tidal modifier for your own catches this turn',
      cost:2,
      effect: function () {
        console.log("test")
    },

    },
    { type : 'Action',
      title: 'Sussy Looking Crab',
      img: wormImage,
      description:'At the end of the game this counts as one crab',
      cost:2,
      effect: function () {
        console.log("test")
    },

    },




  { type : 'Companion',
    title: 'Exactatron-3000',
    img: wormImage,
    description:'Each time you roll exactly what is needed (after modifiers) gain an additional crab',
    cost:2,
    effect: function () {
        console.log("test")
    },
  },
  { type : 'Companion',
    title: 'Lucky Pete',
    img: wormImage,
    description:'You may re-roll one of your catch rolls per round',
    cost:2,
    effect: function () {
        console.log("test")
    },

  },
  { type : 'Companion',
    title: 'The Crab Charmer',
    img: wormImage,
    description:'If you roll a double during a catch attempt, gain an additional crab or trash',
    cost:2,
    effect: function () {
        console.log("test")
    },

  }
]

export { allCards };




// const baitCards = [
//   {
//       type: 'Bait',
//       title: 'Worm',
//       img: wormImage,
//       description: '+1 to your catch roll this turn',
//       cost: 1,
//       effect: function () {
//           console.log("test");
//       },
      
//       location: 'shop'

//   },
//   {
//       type: 'Bait',
//       title: 'Fish',
//       img: fishImage,
//       description: '+2 to your catch roll this turn',
//       cost: 2,
//       effect: function () {
//           console.log("test");
//       },
//       location: 'shop'

//   },
//   {
//       type: 'Bait',
//       title: 'Crab Crack',
//       img: crabCrackImage,
//       description: '+3 to your catch roll this turn',
//       cost: 3,
//       effect: function () {
//           console.log("test");
//       },
//       location: 'shop'

//   }
// ];

// const actionCards = [
//   { type : 'Action',
//     title: 'Tidal Surge',
//     img: wormImage,
//     description:'ignore tide modifiers for your catches this turn',
//     cost:2,
//     effect: function () {
//       console.log("test")

//   },
//   location: 'shop'
//   },
//   { type : 'Action',
//     title: 'Mooncrooner',
//     img: wormImage,
//     description:'reverse the tidal modifier for your own catches this turn',
//     cost:2,
//     effect: function () {
//       console.log("test")
//   },

//   },
//   { type : 'Action',
//     title: 'Sussy Looking Crab',
//     img: wormImage,
//     description:'At the end of the game this counts as one crab',
//     cost:2,
//     effect: function () {
//       console.log("test")
//   },

//   }



// ]

// const companionCards = [
// { type : 'Companion',
//   title: 'Exactatron-3000',
//   img: wormImage,
//   description:'Each time you roll exactly what is needed (after modifiers) gain an additional crab',
//   cost:2,
//   effect: function () {
//       console.log("test")
//   },
// },
// { type : 'Companion',
//   title: 'Lucky Pete',
//   img: wormImage,
//   description:'You may re-roll one of your catch rolls per round',
//   cost:2,
//   effect: function () {
//       console.log("test")
//   },

// },
// { type : 'Companion',
//   title: 'The Crab Charmer',
//   img: wormImage,
//   description:'If you roll a double during a catch attempt, gain an additional crab or trash',
//   cost:2,
//   effect: function () {
//       console.log("test")
//   },

// }
// ]
