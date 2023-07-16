import 'server-only'
import * as auth from '../../_api/gmail-auth'
/**
 * This is callback from google oauth2
 */


export default async function oauth2Callback(
    {
        params,
        searchParams,
      }: {
        params: { slug: string }
        searchParams: { [key: string]: string | string[] | undefined }
      }
) {
	try{
        console.log(`params\n${JSON.stringify(params, null, " ")}`)
        console.log(`searchParams\n${JSON.stringify(searchParams, null, " ")}`)
        if ("error" in searchParams){
            return (<div> Error: {searchParams.error} </div>)
        }
        if ("code" in searchParams){
            const code = searchParams?.code as string;
            // get authorization code from request
            // const code =  req.query.code as string
            console.log(`oauth2Callback code = ${code}`)
            const oAuth2Client = auth.getOAuth2Client()
            const result = await oAuth2Client.getToken(code)
            const tokens = result.tokens
            console.log(`tokens\n${JSON.stringify(tokens)}`)
            await auth.saveToken(tokens)
    
            console.log('Successfully authorized')
            return (
                <div>Successfully authorized </div>
            );
        }
        return ( <div> authorization is unsuccessful.</div>)
        
    }catch(e){
        const message = e instanceof Error ? e.message : "Unknown error."
        console.log(message);
        return (
            <div>We have error. {message} </div>
        );
	}
}