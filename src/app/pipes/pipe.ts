import {Pipe} from '@angular/core';
 
@Pipe({
  name: 'keys'
})
export class KeysPipe {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)
        //.map(key => value[key]);
    }
}

