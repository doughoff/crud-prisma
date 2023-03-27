import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@crud/db';

async function prismaOperation(model: string, operation: string, body: any) {
  // eslint-disable-next-line
  // @ts-ignore
  return await prisma[model][operation](body);
}

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/:model/:operation', async function (req, res) {
    const model = (req.params as any).model;
    const operation = (req.params as any).operation;
    const body = req.body;

    console.log(`Received request for ${model}.${operation} with body:`, body);

    // check if model is an internal prisma function
    // this can be improved with some kind of acces level or allowed operations list
    // for now is good enough
    if (model.startsWith('$') || model.startsWith('_')) {
      res.status(400).send({
        error: 'invalid model',
        time: new Date().toISOString(),
      });
      return;
    }

    try {
      const result = await prismaOperation(model, operation, req.body);
      res.send(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).send({
        error: error.message ? error.message : 'unkown',
        time: new Date().toISOString(),
      });
    }
  });
};

export default example;
