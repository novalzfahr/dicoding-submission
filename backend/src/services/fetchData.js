import { Firestore } from '@google-cloud/firestore';

export async function fetchData() {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: "db-mlgc-achmadnovalf",
  });

  const predictCollection = db.collection("Predictions");

  const snapshot = await predictCollection.get();

  const data = snapshot.docs.map((doc) => {
    const dt = doc.data();

    return {
      id: dt.id,
      history: {
        result: dt.result,
        createdAt: dt.createdAt,
        suggestion: dt.suggestion,
        id: dt.id,
      },
    };
  });

  return data;
}