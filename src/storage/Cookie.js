import { Cookies } from 'react-cookie';

class Cookie {
    constructor() {
        this.cookies = new Cookies();

    }

    set(key, value, options) {
        return this.cookies.set(key, value, options);
    }

    // Cookie에서 특정 키의 값을 가져오기 위한 함수
    get(key) {
        return this.cookies.get(key);
    }

    // Cookie에서 특정 키의 값을 삭제하기 위한 함수
    remove(key, options) {
        return this.cookies.remove(key, options);
    }

    //Refresh Token 을 Cookie에 저장하기 위한 함수
    setRefreshToken(refreshToken) {
        const today = new Date();
        const expireDate = today.setDate(today.getDate() + 7);

        return this.cookies.set('refresh_token', refreshToken, {
            sameSite: 'strict',
            path: "/",
            expires: new Date(expireDate)
        });
    }
    //Cookie에 저장된 Refresh Token 값을 갖고 오기 위한 함수
    getCookieToken() {
        return this.cookies.get('refresh_token');
    }
    //Cookie 삭제를 위한 함수, 로그아웃 시 사용
    removeCookieToken() {
        return this.cookies.remove('refresh_token', { sameSite: 'strict', path: "/" })
    }
}

const cookieManager = new Cookie();
export default cookieManager;