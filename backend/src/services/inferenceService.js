import * as tf from '@tensorflow/tfjs-node';
import InputError from '../exceptions/InputError.js';

export async function predict(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ["Cancer", "Non-cancer"];

    const classResult = confidenceScore > 50 ? 0 : 1;
    const result = classes[classResult];

    let suggestion;

    if (result === "Cancer") {
      suggestion = "Segera periksa ke dokter!";
    }

    if (result === "Non-cancer") {
      suggestion = "Anda sehat!";
    }

    return { result, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
}
