const output = document.querySelector('.output');
const numbers = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');
const allClear = document.querySelector('.all-clear');
const deletes = document.querySelector('.delete');
const equal = document.querySelector('.equal');

let app = {
  isEnd: false,
  operand: '',
  result: '',
  handleEvent() {
    let arr; // use to convert operand from string to array;
    this.pressNumBtn();
    this.pressOperateBtn();
    this.delAll();
    
    // delete the lastest element
    deletes.addEventListener('click', () => {
      this._delete();
    })


    // print the result when click "="
    equal.addEventListener('click', () => {
      this.equals();
    })
  },

  // delete all function;
  delAll() {
    allClear.addEventListener('click', () => {
      this.operand = ''; // delete all el
      this.renderHTML();
    })
  },

  // solve when click number button
  pressNumBtn() {
      numbers.forEach(num => {
        num.addEventListener('click', e => {
          if (this.isEnd) {
            this.operand = '';
              this.operand += e.target.value;
              this.renderHTML();
              this.isEnd = false;
          } else {
            if (this.operand.length < 12) {
              this.operand += e.target.value;
              this.renderHTML();
            }
          }
        })
      })
  },

  // solve when user click on a operand button;
  pressOperateBtn() {
    operation.forEach(math => {
      math.addEventListener('click', e => {
        arr = this.operand.split('');
        let last = arr.slice(-1);
        if (this.isEnd) { // when user click "="
          this.operand = this.result;
          this.isEnd = false;
        }
        // check the lastest el is an operand or not (when user click operand greater than once)
        if (last[0] === '+' || last[0] === '-' || last[0] === '*' || last[0] === '/') {
          // change the lastest operand 
          arr.pop(); // delete the last el of the input if it is a operand;
          this.operand = arr.join('') + e.target.value;
          this.renderHTML();
        } else if (this.operand === '') {
          // when the first time user use calculator
          this.operand = 0;
          this.operand += e.target.value;
          this.renderHTML();
        } else {
          this.operand += e.target.value;
          this.renderHTML();
        }
      })
    })
  },

  equals() {
    if(this.operand[this.operand.length -1] === '+' ||
      this.operand[this.operand.length -1] === '-' ||
      this.operand[this.operand.length -1] === '*' ||
      this.operand[this.operand.length -1] === '/') return
    else if (this.operand === '') return
    else {
      this.result  = eval(this.operand);
      output.innerHTML = `<span>${this.result}</span>`;
      this.isEnd = true;
    }
  },

    _delete() {
      if (this.isEnd) {
        this.operand = '';
        this.renderHTML();
      } else {
        arr = this.operand.split('');
        arr.pop();
        this.operand = arr.join('');
        this.renderHTML();
      }
  },

  renderHTML() {
    output.innerHTML =  `<span>${this.operand}</span>`
  },

  start() {
    this.handleEvent();
  }
}

app.start();