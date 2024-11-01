import { defineEventHandler, readBody } from 'h3';
import { getUserSession } from '~/server/utils/session';
import { prisma } from '~/server/db';

export default defineEventHandler(async (event) => {
  const user = await getUserSession(event);
  
  if (!user){
    throw createError({
      statusCode: 401
    })
  } 

  const { items } = await readBody(event); 

  if (!items || items.length === 0) {
    return { error: 'Nenhuma transação válida foi enviada.' };
  }

  try {
    const transactionPromises = items.map((item:any) =>
      prisma.transaction.create({
        data: {
          userId: user.id,
          currency: item.currency,
          exchangeRate: parseFloat(item.exchangeRate),
          amount: item.amount,
          totalWithFee: item.total,
        },
      })
    );

    await Promise.all(transactionPromises);

    return { 
      title: 'Compra realizada com sucesso!',
      message: 'Confira suas transações na tela de histórico.'
    }

  } catch (error) {

    return { error: 'Erro ao salvar as transações.' };
  }
});
