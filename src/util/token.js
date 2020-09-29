import Cookies from 'js-cookie';
import website from '@/conf/website';
const TokenKey = website.tokenKey;
const RefreshTokenKey = website.refreshTokenKey;
let inFifteenMinutes = time => new Date(new Date().getTime() + 3600 * 2 * 1000);
/**
 * @desc 获取 TOKEN
 */
export function fn_token__get() {
  return Cookies.get(TokenKey);
}
/**
 * @desc 设置Token
 */
export function fn_token__set(token, time) {
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes(time) });
}
/**
 * @desc 删除Token
 */
export function fn_token__remove() {
  return Cookies.remove(TokenKey);
}
/**
 * @desc 获取 refreshToken
 */
export function fn_refreshToken__get() {
  return Cookies.get(RefreshTokenKey);
}
/**
 * @desc 设置 refreshToken
 */
export function fn_refreshToken__set(refreshToken, time) {
  return Cookies.set(RefreshTokenKey, refreshToken, {
    expires: inFifteenMinutes(time)
  });
}
/**
 * @desc 删除 refreshToken
 */
export function fn_refreshToken__remove() {
  return Cookies.remove(RefreshTokenKey);
}
/**
 * @desc 获取全部cookie
 */
export function fn_cookie__all() {
  return Cookies.get();
}
