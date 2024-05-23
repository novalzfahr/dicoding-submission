import { Firestore } from '@google-cloud/firestore';

export async function storeData(id, data) {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: "db-mlgc-achmadnovalf",
  });

  const predictCollection = db.collection("Predictions");
  return predictCollection.doc(id).set(data);
}
