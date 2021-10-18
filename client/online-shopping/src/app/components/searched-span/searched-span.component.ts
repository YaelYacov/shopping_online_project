import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProdInCartService } from 'src/app/services/prod-in-cart.service';

// @Pipe({
//   name: 'highlightSearch',
// })
// export class HighlightSearchPipe implements PipeTransform {
//   transform(value: any, args: any): any {
//     if (!args) {
//       return value;
//     }

//     const regex = new RegExp(args, 'gi');
//     const match = value.match(regex);

//     if (!match) {
//       return value;
//     }

//     return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
//   }
// }

@Component({
  selector: 'app-searched-span',
  templateUrl: './searched-span.component.html',
  styleUrls: ['./searched-span.component.css'],
})
export class SearchedSpanComponent implements OnInit {
  @Input() Name: any;
  str: string = 'someWord';
  strArr: Array<object> | any = [];
  // public span: HTMLElement | any;
  // isMatched: boolean = false;
  // htmlStr: string = ' <strong class="yellowBG">Bold Text Example</strong>';
  // public item: HTMLElement | any;

  // public copyItem(row: HTMLElement): void {
  //   this.item = row;
  //   //this is how you get inner HTML
  //   row.innerHTML = '';
  //   row.innerHTML +=
  //     '<div class="yellowBG">' +
  //     this.prodInCartService._prodInCartSearch +
  //     '</div>';
  //   console.log(row.innerHTML);
  //   //this is to get inner text
  //   console.log(row.innerText);
  // }

  constructor(public prodInCartService: ProdInCartService) {
    // this.strArr = [...this.str.split('')];
    // console.log(this.prodInCartService.strArr);
  }

  replaceIrrelevant = (letter: string) => {
    console.log(this.prodInCartService._str);
    return letter;
  };

  ngOnInit(): void {
    this.prodInCartService._str = this.Name;
    console.log(
      this.Name,
      this.prodInCartService._str,
      this.prodInCartService._currentProdId
    );

    // }

    for (let i = 0; i < this.prodInCartService._str.length; i++) {
      this.prodInCartService.strArr.push({
        letter: this.prodInCartService._str[i],
        isSearched: false,
      });
      console.log(this.prodInCartService._prodInCartSearch);
      // this.Name = this.prodInCartService.newName;
    }

    let Names = this.prodInCartService._prodInCart.map(
      (prod) => prod.Product.Name
    );
    // for (let i = 0; i < Names.length; i++) {
    this.prodInCartService._namesArr.push({
      name: this.Name,
      word: {
        letters: [...this.Name],
        isSearched: false,
      },
    });
    console.log(this.prodInCartService._namesArr);
  }
}
