import { getUserSession } from '~/server/utils/session'
import { prisma } from '~/server/db'

export default defineEventHandler(async (event) => {
  const user = await getUserSession(event)
  if (!user){
    throw createError({
      statusCode: 401
    })
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })

    return transactions
  } catch (error) {
    
    return { error: 'Erro ao buscar transações.' }
  }
})
