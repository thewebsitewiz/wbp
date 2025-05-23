import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { IImage, IImageResponse } from '../interfaces/image.interface';

interface Environment {
  baseAPIUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseAPIUrl = (env as Environment).baseAPIUrl;

  // private _headers = new HttpHeaders();

  private http = inject(HttpClient);

  constructor() {}

  createImage(imageData: FormData): Observable<FormData> {
    console.log('imageData: ', imageData);
    return this.http.post<FormData>(
      `${this.baseAPIUrl}/images/upload-image`,
      imageData
    );
  }

  updateImage(
    id: string,
    updateValue: { [key: string]: string | number | boolean }
  ) {
    return this.http.patch(
      `${this.baseAPIUrl}/images/patch-image/${id}`,
      updateValue
    );
  }

  updateImageFields(
    id: string,
    updateValue: { [key: string]: string | number | boolean }
  ): Observable<any> {
    return this.http.patch(
      `${this.baseAPIUrl}/images/patch-image/${id}`,
      updateValue
    );
  }

  getAllImages(): Observable<any> {
    return this.http.get(`${this.baseAPIUrl}/images/get-all-images`);
  }

  getImagesWithTags(tagList: string[]): Observable<any> {
    return this.http.get(`${this.baseAPIUrl}/images/get-images-with-tags`, {
      params: { tags: tagList.join(',') },
    });
  }

  getImage(imageId: string): Observable<IImageResponse> {
    return this.http.get<IImageResponse>(
      `${this.baseAPIUrl}/images/get-image/${imageId}`
    );
  }

  OLDupdateImage(imageData: FormData, imageId: number): Observable<IImage> {
    return this.http.put<IImage>(
      `${this.baseAPIUrl}/images/update-image/${imageId}`,
      imageData
    );
  }

  deleteImage(imageId: string): Observable<IImage> {
    return this.http.delete<IImage>(
      `${this.baseAPIUrl}/images/delete-image/${imageId}`
    );
  }
}
