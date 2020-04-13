import {stringify} from 'querystring';

import UserStorage from './UserStorage';

const BASE_URL = 'http://localhost:3000';

export class ValidationError extends Error {
  constructor(message, validationErrors) {
    super(message);

    this.name = 'ValidationError';

    this.validationErrors = validationErrors;
  }
}

export default class Api {
  static async fetchResource(
    method = 'GET',
    endpoint = '/',
    params = {},
    requireAuth = false,
  ) {
    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    if (requireAuth) {
      let tokenStorage = await UserStorage.getToken();
      headers.set('Authorization', tokenStorage);
    }

    let uri = BASE_URL + endpoint;
    let response;

    if (method === 'GET' || method === 'DELETE') {
      uri += '?' + stringify(params);
      response = await fetch(uri, {method, headers});
    } else {
      response = await fetch(uri, {
        method,
        headers,
        body: JSON.stringify(params),
      });
    }
    if (!response.ok) {
      let type = response.headers.get('Content-type');
      if (type && type.indexOf('json') !== -1) {
        let jsonResponse = await response.json();
        if (jsonResponse.ModelState) {
          throw new ValidationError(jsonResponse.message);
        } else {
          throw new Error(
            jsonResponse.message ||
              jsonResponse.error_description ||
              jsonResponse.error,
          );
        }
        // return jsonResponse;
      } else {
        let textResponse = await response.text();
        throw new Error(textResponse);
      }
    }

    try {
      let res = await response.json();
      if (res.code !== 200) {
        throw new Error('接口错误');
      }
      return res.result;
    } catch (e) {
      return {};
    }
  }

  static async singerCate({email, password}) {
    let endpoint = '/artist/list';
    return Api.fetchResource('GET', endpoint, {});
  }

  static async songCateHot() {
    let endpoint = '/playlist/hot';
    return Api.fetchResource('GET', endpoint, {});
  }

  static async search(keywords) {
    let endpoint = '/search';
    return Api.fetchResource('GET', endpoint, {
      keywords,
    });
  }

  static async similar() {
    let res = await Api.getListResource('/simi/artist', {});
    return res;
  }

  static async ranking(idx) {
    let res = await Api.getListResource('/top/list', {idx});
    return res;
  }

  static async singerRank(id) {
    let res = await Api.getListResource('/toplist/artist', {});
    return res;
  }

  static async playlist(cat, limit = 1) {
    let res = await Api.getListResource('/top/playlist', {cat, limit});
    return res;
  }

  static async listDetail(id) {
    let res = await Api.getListResource('/playlist/detail', {id});
    return res;
  }

  static async hotComment(type, id) {
    let res = await Api.getListResource('/comment/hot', {type, id});
    return res;
  }

  static async songCate() {
    let endpoint = '/playlist/catlist';
    return await Api.getListResource(endpoint, {});
  }

  static async getMusic(br, id) {
    let endpoint = '/song/url';
    let res = await Api.getListResource(endpoint, {br, id});
    return res;
  }

  static async lyric(id) {
    let endpoint = '/lyric';
    let res = await Api.getListResource(endpoint, {id});
    return res;
  }

  static async getListResource(resource, params = {}, requireAuth = false) {
    let endpoint = resource;
    return await Api.fetchResource('GET', endpoint, params, requireAuth);
  }
}
