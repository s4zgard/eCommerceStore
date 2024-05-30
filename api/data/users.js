import bcrypt from "bcryptjs";

const users = [
  {
    name: "Foosha Man",
    email: "admin@foosha.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];

export default users;
