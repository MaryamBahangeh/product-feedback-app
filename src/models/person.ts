export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string;
};

export const persons: Person[] = [
  {
    id: "1",
    firstName: "Ali",
    lastName: "Taheri",
    userName: "Ali@taher23",
    imageUrl: "./images/person1.png",
  },
  {
    id: "2",
    firstName: "Sara",
    lastName: "Ahmadi",
    userName: "Sara@Ahmadi",
    imageUrl: "./images/person2.png",
  },
  {
    id: "3",
    firstName: "Maral",
    lastName: "mohamadi",
    userName: "maral@mohamadi",
    imageUrl: "./images/person3.png",
  },
];
