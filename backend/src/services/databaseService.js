import {prisma} from '../../lib/prisma.js';

export async function saveMessages(chatId,role,content){
    return await prisma.message.create({
        data:{
            chatId,
            role,
            content,
        }
    });
}

export async function createNewChat(
    userId,
    title
) {
    title = title
        .trim()
        .slice(0, 60);

    const chat =
        await prisma.chat.create({
            data: {
                title,
                userId,
            },
        });

    return chat;
}

export async function searchChatIdwithUserId(userId,chatId){
    return await prisma.chat.findFirst({
        where:{
            id:chatId,
            userId:userId
        }
    })
};

export async function loadMessages(chatId) {
    return prisma.message.findMany({
        where: {
            chatId,
        },
        select: {
            role: true,
            content: true,
            citations:{
                select:{
                    citationNumber:true,
                    chunkId:true
                }
            }

            },
        orderBy: {
            createdAt: "asc",
        },
    });
}
export async function loadChats(userId) {
    return prisma.chat.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            title: true,
            },
        orderBy: {
            updatedAt: "desc",
        },
        take:5
    });
}

export async function saveCitations(chunkResults,messageId){
    await prisma.citation.createMany({
    data: Object.entries(chunkResults).map(([citationNumber, chunk]) => ({
        messageId: messageId,
        citationNumber: Number(citationNumber),
        chunkId: chunk.id
    }))
});
   
};


export async function loadChunk(chunkId) {
    return await prisma.chunk.findUnique({
        where: {
            id: chunkId,
        },
        select: {
            id: true,
            documentId: true,
            chunkIndex: true,
            text: true,

            document: {
                select: {
                    originalFileName: true,
                },
            },
        },
    });
}