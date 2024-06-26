import { Client, NoAuth } from "whatsapp-web.js";
import { Message } from "../../../types/types";
import WhatsModel from "../models/whats.model";
const wwebVersion = '2.2407.3';

const client = new Client({
    authStrategy: new NoAuth(),
    puppeteer: {
      args: ['--no-sandbox'],
    },
    webVersionCache: {
      type: 'remote',
      remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
  },
  });

export const createWhatsSession = (id:any, socket:any) => {
    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      socket.emit("qr", { qr })
    });
  
    client.on("ready", () => {
      socket.emit("sessionReady")
    });
  
    client.on("disconnected", () => {
      socket.emit("sessionDisconnected")
    });
  
    client.initialize();
  }

export const sendMessage = async(data:Message, socket:any) => {

    let valueParam1 = 0;
    let valueParam2 = 0;
    let valueParam3 = 0;
    let valueParam4 = 0;
    let count = 0;
    let total =0;
    for(var i=0; i<data.numbers.length; i++){
        count++;
        if(count === 10){
            socket.emit("sendTotal", { total })
            await sleepFor(100000);
            count = 0;
        }
        let tiempo = data.time * 1000;
        await sleepFor(tiempo);
        const p1 = data.param1[valueParam1];
        const p2 = data.param2[valueParam2];
        const p3 = data.param3[valueParam3];
        const p4 = data.param4[valueParam4];
        valueParam1++;
        if(valueParam1 >= data.param1.length){
            valueParam1 = 0;
        }
        valueParam2++;
        if(valueParam2 >= data.param2.length){
            valueParam2 = 0;
        }
        valueParam3++;
        if(valueParam3 >= data.param3.length){
            valueParam3 = 0;
        }
        valueParam4++;
        if(valueParam4 >= data.param4.length){
            valueParam4 = 0;
        }
        let number = `${data.numbers[i].number}@c.us`;
        const messageSend = data.message.replace('{1}', p1).replace('{2}', p2).replace('{3}', p3).replace('{4}', p4).replace('{0}', (data.numbers[i]?.parameter ?? ""))
        var id = await client.sendMessage(number, messageSend);
        var fecha = new Date(Date.now())
        console.log(fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getMilliseconds() + " ENVIADO A " + number + " t:" + tiempo + " ID:" + JSON.stringify(id));
        total++;
    }
    socket.emit("sendTotal", { total })
    await WhatsModel.create({
      total: total
    });

    socket.emit("finishSend")
} 


const sleepFor = (sleepDuration:number) => {
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
        /* Do nothing */ 
    }
}