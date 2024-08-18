import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import LocalStorge from './local_storge';
import TokenResponse from '../interfaces/token';
import ApiUrls from '../interfaces/api_urls';

const localStorge = new LocalStorge(__dirname);
const configService = new ConfigService();

// 테스트 데이터
const apiUrl: string = 'http://0.0.0.0:8000';
const adminData: object = {
                'username': 'cats',
	            'password': 'cats1234'
            }


export default class TokenHandler{
    // public static apiLoginTokenUrl: string = `${apiUrl}/api/token/login/`;
    // public static apiRefreshTokenUrl: string = `${apiUrl}/api/token/refresh/`;
    // public static apiVerifyTokenUrl: string = `${apiUrl}/api/token/verify/`;

    // login 토큰 발급
    static async getLoginToken(url: string): Promise<TokenResponse | null>{
        try {
            // login 토큰 가져오기
            const response: AxiosResponse<TokenResponse> = await axios.post(url, adminData);
            console.log(response.status);
            // 로컬에 토큰 저장
            localStorge.setItem(response.data);
            return response.data;
        } catch (error) {
            console.error('[Token] getLoginToken :', error);
            return null;
        }
    }

    // access 토큰 재발급
    static async getAccessToken(url: string, refreshToken: string): Promise<TokenResponse | null>{
        try {
            // refresh 토큰 가져오기
            const body: object = {
                'body': refreshToken
            };
            const response: AxiosResponse<TokenResponse> = await axios.post(url, body);
            const newTokenItem: TokenResponse = {
                'access': response.data.access,
                'refresh': refreshToken
            };

            // 로컬에 토큰 저장
            localStorge.setItem(newTokenItem);
            return newTokenItem;
        }
        catch (error) {
            console.error('[Token] getAccessToken :', error);
            return null;
        }
    }

    // 토큰 유효성 검증
    static async verifyToken(url: string, token: string): Promise<boolean>{
        try {
            const response: AxiosResponse<TokenResponse> = await axios.post(url, { 'token': token });
            if (response.status === 200) return true;
        } catch (error) {
            // console.error(error);
        }
        return false;
    }

    // 토큰 가져오기
    public static async getToken(apiUrls: ApiUrls): Promise<string | void> {
        let token: TokenResponse | null = localStorge.getItem() as TokenResponse;
        // 저장된 토큰 없거나 토큰 만료 시 refresh 토큰 발급
        if (!token || !await TokenHandler.verifyToken(apiUrls.apiVerifyTokenUrl, token['refresh'])) token = await TokenHandler.getLoginToken(apiUrls.apiLoginTokenUrl);
        // access 토큰 만료 시 재발급
        if (token && !await TokenHandler.verifyToken(apiUrls.apiVerifyTokenUrl, token['access'])) token = await TokenHandler.getAccessToken(apiUrls.apiRefreshTokenUrl, token['refresh']);
        
        return token?.access;
    }
}

// console.log('test.ts');

// async function testFunc(): Promise<void>{
//     console.log(TokenHandler.apiLoginTokenUrl);
//     const token = await TokenHandler.getToken();
//     console.log(token);
// }

// testFunc();
