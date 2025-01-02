import { Console, MissionUtils } from "@woowacourse/mission-utils";
import RacingCar from "./RacingCar.js";
import ValidateInput from "./ValidateInput.js";

class InputView {
  
  constructor() {
    this.validate = new ValidateInput();
  }

  async getCars() {
    const input_cars = await Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n');
    const cars = this.validate.validateCars(input_cars);
    Console.print("");
    return cars
  }

  async getMatches() {
    const input_num = await Console.readLineAsync('시도할 경기 횟수는 몇 회인가요?\n');
    const matches = this.validate.validationMathNum(input_num);
    Console.print("");
    return matches
  }
}

class OutputView {

}

class App {
  #racing_cars = []
  #match_num

  // 중앙콘센트
  constructor() {
    // App 클래스의 객체가 필요로하는 선결조건 필요조건들을 여기서 모두 설정
    // 설정의 역할을 초기화에 모두 중앙화, 위임하는것뿐만아니라 추후 관리(변경)에 용이
    // this.validateInput = new ValidateInput();
    // Static 정적 클래스로 하시는분들도 있지만, 수정을 위해서는 클래스가 더 유용
    this.inputView = new InputView()
    this.outputView = new OutputView()
  }
  // 정적 클래스와 메서드를 만드는 기준 : 무조건 외부 변수만 사용할때
  
  async play() {
    const { cars, matches } = await this.#startRacing();
    const racing = new Racing(cars, matches);
    racing.start();
    // for (let i = 1; i <= this.#match_num ; i++) {
    //   this.#moveCars();
    //   Console.print(i + " 번째 경기 결과");
    //   this.#printCars();
    //   Console.print("");
    // }
    // this.#printWinCars();
    const result = racing.result();
    this.outputView.printResult(result);
  }

  async #startRacing() {
    const cars = this.inputView.getCars()
    const matches = this.inputView.getMatches()
    return {
      cars,
      matches,
    }
  }

  #printCars() {
    this.#racing_cars.forEach(car => {
      car.printMovDistance();
    });
  }
  
  #moveCars() {
    this.#racing_cars.forEach(car => {
      car.move();
    });
  }
  
  #printWinCars() {
    let wins = "최종 우승자 : ";
    const distance = this.#getMaxDistance();
    
    // filter로 객체를 만들려고 했지만, 왜인지 빈 객체가 만들어진다.
    // let winCars = this.#racing_cars.filter((car) => {
    //   console.log("car distance : " + car.distance() + " distance : " + distance);
    //   car.distance() == distance;
    // });
    // console.log(winCars + " : " + winCars.length)
    
    const winCars = [];
    this.#racing_cars.forEach(car => {
      if (car.distance() === distance) {
        winCars.push(car);
      }
    });

    for (let i = 0; i < winCars.length; i++) {
      if (i !== 0) {
        wins += ", ";
      }
      wins += winCars[i].name();
    }

    Console.print(wins);
  }

  #getMaxDistance() {
    let num = 0;
    this.#racing_cars.forEach(car => {
      const distance = car.distance();
      if (distance > num)
        num = distance;
    });
    return num;
  }

}

export default App;