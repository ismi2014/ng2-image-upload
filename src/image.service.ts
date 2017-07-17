import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export interface Header {
  header: string;
  value: string;
}

export interface Fields {
  key: string;
  value: string;
}

@Injectable()
export class ImageService {

  constructor(private http: Http) {
  }

  public postImage(url: string, image: File, headers?, partName: string = 'image', withCredentials?: boolean, fields?): Observable<Response> {
    if (!url || url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }

    let options: RequestOptionsArgs = new RequestOptions();
    if (withCredentials) {
      options.withCredentials = withCredentials;
    }

    if (headers) {
      options.headers = headers;
    }

    let formData: FormData = new FormData();
    formData.append(partName, image);

    if (fields) {
      for (let key in fields) {
        formData.append(key, fields[key]);
      }
    }

    return this.http.post(url, formData, options);
  }
}
