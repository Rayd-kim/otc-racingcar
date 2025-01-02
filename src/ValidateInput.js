import RacingCar from "./RacingCar.js";

class ValidateInput {

	validateCars(input) {
		const split_input_cars = input.split(",");
		if (split_input_cars.length < 2) {
			throw new Error("[ERROR] 2개 이상의 자동차를 설정해주세요.");
		}
		const cars = [];
		for (let car of split_input_cars) {
			cars.push(this.validateCar(car))
		}
		return cars
	}

	validateCar(name) {
		if (name.length > 5) {
			throw new Error("[ERROR] 자동차 이름은 5글자 이하로 설정해주세요.");
		}
		if (name.length == 0) {
			throw new Error("[ERROR] 자동차 이름은 비어있으면 안됩니다.");
		}
		return name
	}

	// validateCarName(input_cars) {
	// 	const split_input_cars = input_cars.split(",");
	// 	const cars = [];
	// 	if (split_input_cars.length < 2) {
	// 		throw new Error("[ERROR] 2개 이상의 자동차를 설정해주세요.");
	// 	}

  //   for (let car of split_input_cars) {
	// 		if (car.length > 5) {
	// 			throw new Error("[ERROR] 자동차 이름은 5글자 이하로 설정해주세요.");
	// 		}
	// 		if (car.length == 0) {
	// 			throw new Error("[ERROR] 자동차 이름은 비어있으면 안됩니다.");
	// 		}
	// 		cars.push(new RacingCar(car));
  //   }
	// 	return cars;
  // }

	validationMathNum(num) {
		if (Number.isNaN(Number(num))) {
			throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
		}
		return num;
	}
}

export default ValidateInput;