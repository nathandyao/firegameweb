import { google } from 'googleapis'
import * as fs from 'fs-extra'
import * as path from 'path'
import credentials from '@/config/client_secret_1018478576567-b4gnrarc52oe0bl09o22qibo1a16r10j.apps.googleusercontent.com.json'

/**
 * API that authenticate gmail
 * authenticate callback url: ovyvbslprmns
 * 
 */
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send']
const TOKEN_PATH = path.join("build", 'token.json')

export const authorize = async () => {
    // check if the token already exists

    const exists = await fs.exists(TOKEN_PATH)
    console.log(`TOKEN_PATH ${TOKEN_PATH} ${exists}`)
    const token = exists ? await fs.readFile(TOKEN_PATH, 'utf8') : ''
    console.log(`token read: ${token}`)
    if(token){
        authenticate(JSON.parse(token))
        return true
    }
    
    return false
}

export const getNewToken = async () => {
    const oAuth2Client = getOAuth2Client()
    const auth_url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES,
    })
    console.log(`getNewToken ${auth_url}`)
    return auth_url;
}

export const saveToken = async (token) => {
    console.log(`TOKEN_PATH:${TOKEN_PATH}`);
    await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
}

export const getOAuth2Client = () => {
    const GOOGLE_CLIENT_ID = credentials.web.client_id
    const GOOGLE_CLIENT_SECRET = credentials.web.client_secret
    const GOOGLE_CALLBACK_URL = credentials.web.redirect_uris[0]
    console.log(`getOAuth2Client GOOGLE_CLIENT_ID ${GOOGLE_CLIENT_ID}`)
    console.log(`getOAuth2Client GOOGLE_CLIENT_SECRET ${GOOGLE_CLIENT_SECRET}`)
    console.log(`getOAuth2Client GOOGLE_CALLBACK_URL ${GOOGLE_CALLBACK_URL}`)

    const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL)
    return oAuth2Client
}

const authenticate = (token) => {
    const oAuth2Client = getOAuth2Client()

    oAuth2Client.setCredentials(token)
    google.options({
        auth: oAuth2Client
    })
}