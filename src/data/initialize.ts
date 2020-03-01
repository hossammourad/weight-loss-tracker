import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const adapter = new LocalStorage("db");

export const db = low(adapter);

export const initialize = () => {
  db.defaults({ weights: [] }).write();
};
