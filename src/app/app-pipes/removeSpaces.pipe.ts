import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'removeSpaces'})
export class RemoveSpacesPipe implements PipeTransform {
    transform(value: string): string {
        value = value.replace(/ +/g, "").toLowerCase();
        console.log(value);
        return value
    }
}
