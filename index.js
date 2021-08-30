const { PrismaClient, ApprovalWorkflowEvents, FinalizeSteps } = require('@prisma/client')

const prisma = new PrismaClient()

async function findRequestCache(id) {
    return await prisma.requestCache.findUnique({
        where: { id }
    })
}

async function findFailedTasks() {
    return await prisma.failedTask.findMany({})
}

async function upsertRequestCache(
    requestId = '3',
    rawRep = 'da co co nut nut is a giant nut',
    status = ApprovalWorkflowEvents.RECV,
    requesterEmail = 'if-you-eat-too-much-youll-get-very-fat@bignut.com',
    spreadsheetId = '000'
) {
    return await prisma.requestCache.upsert({
        where: {
            requestId
        },
        update: {
            status,
            rawRep,
            requesterEmail,
            spreadsheetId
        },
        create: {
            requestId,
            status,
            rawRep,
            requesterEmail,
            spreadsheetId
        }
    })
}
async function deleteFailedTask(id) {
  return await prisma.requestCache.delete({
    where: {
      id
    }
  })
}

async function main() {
    // console.log(await findRequestCache(1).then((data) => data.status))

    // console.log( await upsertRequestCache())

    console.log( await deleteFailedTask(1))
    await prisma.failedTask.create({
        data: {
            nextStep : FinalizeSteps.FINISH,
            request: { 
              create: {
                requestId: "1",
                rawRep: "ya",
                status: ApprovalWorkflowEvents.SUBMITTED,
                requesterEmail : "yayaya@yayaya.com",
                spreadsheetId : "212"
            }
            }
        }
    })
    

    const allFailed = await findFailedTasks()
    // console.log(JSON.stringify(allFailed, null, 2));

}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })


