import { nanoid } from 'nanoid';
import {predict} from '../services/inferenceService.js';
import  {storeData}  from '../services/storeData.js';
import  {fetchData}  from '../services/fetchData.js';

export async function predictHandler(request, h) {
    const { model } = request.server.app;
    const { image } = request.payload;

    const { result, suggestion } = await predict(model, image);

    const id = nanoid();
    const createdAt = new Date().toISOString();
  
    const data = {
      id: id,
      result: result,
      suggestion: suggestion,
      createdAt: createdAt,
    };
  
    await storeData(id, data);
    
    const response = h.response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    });
    response.code(201);
    return response;
}

export async function historyHandler(request, h) {
    const data = await fetchData();
  
    const response = h.response({
      status: "success",
      data,
    });
  
    response.code(200);
  
    return response;
}