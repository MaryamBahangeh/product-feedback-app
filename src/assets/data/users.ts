export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string;
};

export const persons: User[] = [
  {
    id: "1",
    firstName: "Ali",
    lastName: "Taheri",
    userName: "@Alitaher23",
    imageUrl: "/images/users/person1.jpg",
  },
  {
    id: "2",
    firstName: "Sara",
    lastName: "Ahmadi",
    userName: "@SaraAhmadi",
    imageUrl: "/images/users/person2.jpg",
  },
  {
    id: "3",
    firstName: "Maral",
    lastName: "Mohamadi",
    userName: "@Maralmohamadi",
    imageUrl: "/images/users/person3.jpg",
  },
];
