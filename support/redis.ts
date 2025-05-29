import { Queue } from 'bullmq';

const connection ={
    host: 'paybank-redis',
    port: 6379
}


const queueName='twoFactorQueue'

// se increver na fila
const queue = new Queue(queueName, {connection})

export const getJob = async () =>{
    const jobs = queue.getJobs()// busca todos os jobs
    return  jobs[0]
    
}

export const cleanJobs = async () => {
    await queue.obliterate() //apaga tudo

}