import 'server-only'
import * as auth from '../../_api/gmail-auth'


type GmailAuth = {
    status: 'OK'|'Authenticated'|'error';
    authorizeUrl?: string;
    error?: string;
}


export default async function gmailAuthPage() {
    const gauth: GmailAuth = await getData()
    if (gauth.status == 'OK'){
        return (
            <a href={gauth.authorizeUrl}>click here!</a>
        );
    }
    else if(gauth.status == 'Authenticated'){
        return (
            <div>It is already authenticated. </div>
        );
    }
    else{
        return (
            <div>We have error. {gauth.error} </div>
        );
    }
    
  }

export async function getData() : Promise<GmailAuth>  {
    console.log(`gmailAuth.getData ==>>`);

	try{
        const authenticated = await auth.authorize()

        // if not authenticated, request new token
        if(!authenticated){
            const authorizeUrl = await auth.getNewToken()
            let ret = { 
                        status: 'OK' as const,
                        authorizeUrl: authorizeUrl
                        }
            return ret;
        }
        

        return {status: 'Authenticated'}
    }catch(e){
        const message = e instanceof Error ? e.message : "Unknown error."
        console.log(message);
        return {status: 'error', error: message};
	}
}


 