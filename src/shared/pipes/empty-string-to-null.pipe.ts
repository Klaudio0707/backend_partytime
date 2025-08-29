import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class EmptyStringToNullPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach(key => {
        if (value[key] === '') {
          value[key] = null;
        }
      });
    }
    return value;
  }
}