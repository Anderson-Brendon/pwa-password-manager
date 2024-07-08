import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomPasswordCreatorService {

  constructor() { }

  create(pswLength = 1, hasUppercase: boolean = false, hasNumbers: boolean = false,
    hasSymbols: boolean = false) {

    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
      "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '()', '_', '-', '+', '=', '{', '[',
      '}', ']', '|', ":", ";", '"', "'", "<", ">", ".", "?", '/']

    let defaultLength = alphabet.length;

    let characters = []

    for (let i = 0; i < alphabet.length; i++) {
      characters.push(alphabet[i])
    }

    if (hasUppercase) {
      for (let i = 0; i < defaultLength; i++) {
        characters.push(alphabet[i].toUpperCase())
      }
    }

    if (hasNumbers) {
      for (let i = 0; i < numbers.length; i++) {
        characters.push(numbers[i])
      }
    }

    if (hasSymbols) {
      for (let i = 0; i < symbols.length; i++) {
        characters.push(symbols[i])
      }
    }

    const numberOfCharacters = characters.length

    let passwordResult = '';

    for (let i = 1; i <= pswLength; i++) {
      passwordResult += characters[Math.floor(numberOfCharacters * Math.random())]
    }

    return passwordResult;
  }

}
