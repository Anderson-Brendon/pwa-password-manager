import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomPasswordCreatorService {

  constructor() { }

  create(pswLength = 5, hasUppercase: boolean = false, hasNumbers: boolean = false,
    hasSymbols: boolean = false): string {

    let alphabet :string[] = "abcdefghijklmnopqrstuvwxyz".split("");

    let upperCaseAlphabet :string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    let numbers :string[] = "0123456789".split("");

    let symbols :string[] = "~`!@#$%^&*()_-+={}[]|:;'<>.?/],".split("");

    let characters :string[] = [];

    let passwordResult :any = '';

    characters = characters.concat(alphabet);

    if (hasUppercase) {
       passwordResult = upperCaseAlphabet[Math.floor(Math.random() * upperCaseAlphabet.length)];
       characters = characters.concat(upperCaseAlphabet)
    }

    if (hasNumbers) {
      passwordResult = numbers[Math.floor(Math.random() * numbers.length)];
      characters = characters.concat(numbers);
    }

    if (hasSymbols) {
      passwordResult = symbols[Math.floor(Math.random() * symbols.length)];
      characters = characters.concat(symbols);
    }

    for (let i = 1; i <= pswLength; i++) {
      passwordResult += characters[Math.floor(characters.length * Math.random())];
    }

    let passwordArr : string[] = passwordResult.split("");

    passwordResult = ''

    for (let index = 0; index < pswLength; index++) {
      let position = Math.floor(Math.random() * passwordArr.length);
      passwordResult += passwordArr[position];
      passwordArr.splice(position, 1);
    }

    return passwordResult;
  }

}
