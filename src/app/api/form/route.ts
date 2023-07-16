import {  NextRequest, NextResponse } from 'next/server'
import * as gmail from '@/app/_api/gmail-api'
import { get, set } from 'lodash';

const rateLimit = 10; // Number of allowed requests per minute

const rateLimiter = {};

const rateLimiterMiddleware = (ip : string) => {
  const now = Date.now();
  const windowStart = now - 60 * 1000; // 1 minute ago

  const requestTimestamps = get(rateLimiter, ip, []).filter((timestamp) => timestamp > windowStart);
  requestTimestamps.push(now);

  set(rateLimiter, ip, requestTimestamps);

  return requestTimestamps.length <= rateLimit;
};

export async function POST(req: NextRequest ) {
    let ip;
    // if (req.headers.get('x-forwarded-for') && req.headers.get('x-forwarded-for')!== null ) {
    //     ip = req.headers.get('x-forwarded-for').split(',')[0];
    // } else if (req.headers.get('x-real-ip')) {
    // ip = req.socket.remoteAddress;
    // } else {
    // ip = req.connection.remoteAddress;
    // }
    
    // if (!rateLimiterMiddleware(ip)) {
    //   return NextResponse.json(
    //     { data: 'Too Many Requests' },
    //     {status: 429 }
    // )
    //   return;
    // }
    console.log(`request: ${JSON.stringify(req, null, " ")}`)
    try{
        // Get data submitted in request's body.
        console.log(`POST ${JSON.stringify(req)}`)
        const body =  await req.json();
    
        // Optional logging to see the responses
        // in the command line where next.js app is running.
        console.log('body: ', body);
    
        // Guard clause checks for first and last name,
        // and returns early if they are not found
        if (!body.email || !body.name || !body.comment) {
            // Sends a HTTP bad request error code
            console.log(`email error: 'email or name or comment not found'`)
            return NextResponse.json(
                { data: 'email or name or comment not found' },
                {status: 400 }
            )
        
        }

        const mailData = {
            to: "nathandyao@gmail.com",
            subject: `Fire Safety Game Message from ${body.name}`,
            text: `${body.comment} | Sent from: ${body.email}`,
            html: `<div>${body.comment}</div><p>Sent from: ${body}</p>`,
        };

        let res = await gmail.sendMessage(mailData)
        console.log(`RES: ${JSON.stringify(res, null, " ")}`)
        if (res.hasOwnProperty("error")){
            return NextResponse.json(
                {message: `We have error: ${res.error}`},
                {status: 400}
            )
        }
        return NextResponse.json(
            {message: 'Message sent!'},
            {status: 200 }
        )

    }catch(e){
        console.log(`email error: ${JSON.stringify(e)}`)
        return NextResponse.json(
            {error: e},
            {status: 400 }
        )
    }

  }
  