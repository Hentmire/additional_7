module.exports = function solveSudoku(matrix) {
const arrayForValues = {};
const valueArray = {};

let checkExist = function(checkValue, checkRow, checkCol) {
				let existNumber = false;
				for (colI = 0; colI < 9; colI++) {
					if (checkValue == matrix[checkRow][colI]) {
						existNumber = true;
					}
				}
				for (rowI = 0; rowI < 9; rowI++) {
					if (checkValue == matrix[rowI][checkCol]) {
						existNumber = true;
					}
				}
				
				
				let rowSquare = Math.floor(checkRow / 3);
				let colSquare = Math.floor(checkCol / 3);
				const options = [];
				for (let rowSqN = rowSquare*3; rowSqN < ( (rowSquare + 1) * 3 ); rowSqN++){ //перебор вариантов по квадрату 3*3
					for (let colSqN = colSquare*3; colSqN < ( (colSquare + 1) * 3 ); colSqN++) {
						if (checkValue == matrix[rowSqN][colSqN]) {
							existNumber = true;
						}
					}
				}
				return existNumber;
}

let i = 0;
while (i < 100) {
	for (let rowNumber = 0; rowNumber < 9; rowNumber++) { //поиск одиночек
		for (let colNumber = 0; colNumber < 9; colNumber++) {
			const block = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
			const numbers = [];
			if (matrix[rowNumber][colNumber] === 0) {
				for (let rowN = 0; rowN < 9; rowN++) { //перебор вариантов по столбцу
					if (matrix[rowN][colNumber] !== 0) {
						let position = matrix[rowN][colNumber] - 1;
						block[position] = 0;
					}
				}
				for (let colN = 0; colN < 9; colN++) { //перебор вариантов по строке
					if (matrix[rowNumber][colN] !== 0) {
						let position = matrix[rowNumber][colN] - 1;
						block[position] = 0; 
					}
				}

				let rowSquare = Math.floor(rowNumber / 3);
				let colSquare = Math.floor(colNumber / 3);
				const options = [];
				for (let rowSqN = rowSquare*3; rowSqN < ( (rowSquare + 1) * 3 ); rowSqN++){ //перебор вариантов по квадрату 3*3
					for (let colSqN = colSquare*3; colSqN < ( (colSquare + 1) * 3 ); colSqN++) {
						if (matrix[rowSqN][colSqN] !== 0) {
							options.push(matrix[rowSqN][colSqN]);
						}
					}
				}
				options.sort( (a, b) => (a - b) );;
				for (let i = 0; i < options.length; i++) {
					let position = options[i] - 1;
					block[position] = 0; 
				}

				for (let position = 0; position < 9; position++) { //если в block, содержащем варианты, одно число, вставить его в судоку
					if (block[position] !== 0) {
						numbers.push( block[position] );
					}
				}
				if (numbers.length === 1) {
					matrix[rowNumber][colNumber] = numbers[0];
				} else {
					arrayForValues[ [rowNumber,colNumber] ] = numbers;
				}
			}
		}
	} i++;
}

//************************************************************************************************
//поиск скрытых очиночек
	for (let rowNumber = 0; rowNumber < 9; rowNumber++) { // поиск по строке
		const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let colNumber = 0; colNumber < 9; colNumber++) {
			if (matrix[rowNumber][colNumber] === 0) {
				let p = arrayForValues[ [rowNumber,colNumber] ];
				array[colNumber] = p;
			}
		}

		for(let i = 0; i < 9; i++) {
			let count = 0;
			if (array[i] !== 0) {
				for(let j = 0; j < array[i].length; j++) {
					let counter = 0;
					let a = array[i][j];
					for (let m = 0; m < 9; m++) {
						if (array[m] !== 0 && m !== i) {
							for (let k = 0; k < array[m].length; k++){
								if (a == array[m][k]) {
									counter++;
								}
							}
						}
					}
					if (counter === 0) {
						matrix[rowNumber][i] = a;
						count++;
					}
				}
			}
			if (count !== 0) {
				array[i] = 0;
			}
		}
	}


	for (let colNumber = 0; colNumber < 9; colNumber++) { // поиск по столбцу
		const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
			if (matrix[rowNumber][colNumber] === 0) {
				let p = arrayForValues[ [rowNumber,colNumber] ];
				array[rowNumber] = p;
			}
		}
		for(let i = 0; i < 9; i++) {
			let count = 0;
			if (array[i] !== 0) {
				for(let j = 0; j < array[i].length; j++) {
					let counter = 0;
					let a = array[i][j];
					if (checkExist(a, i, colNumber) === true) {
						continue;
					}

					for (let m = 0; m < 9; m++) {
						if (array[m] !== 0 && m !== i) {
							for (let k = 0; k < array[m].length; k++){
								if (a == array[m][k]) {
									counter++;
								}
							}
						}
					}
					if (counter === 0) {
						matrix[i][colNumber] = a;
						count++;
					}
				}
			}
			if (count !== 0) {
				array[i] = 0;
			}
		}
	}

	
	let n = 0;
	while (n < 3) {  // поиск по 1-3-им квадратам 3*3
	for (let  l = 0; l < 3; l++) {
		const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let rowNumber = n*3; rowNumber < ( (n + 1) * 3); rowNumber++) {
			for (let colNumber = l*3; colNumber < ( (l + 1) * 3); colNumber++) {
				if (matrix[rowNumber][colNumber] === 0) {
					let p = arrayForValues[ [rowNumber,colNumber] ];
					let a = rowNumber % 3;
					let b = colNumber % 3;
					array[ (3*a + b) ] = p;
				}
			}
		}
		for(let i = 0; i < 9; i++) {
			let count = 0;
			if (array[i] !== 0) {
				for(let j = 0; j < array[i].length; j++) {
					let counter = 0;
					let a = array[i][j];
					
					if (checkExist(a, n*3, l*3) === true) {
						continue;
					}
					
					for (let m = 0; m < 9; m++) {
						if (array[m] !== 0 && m !== i) {
							for (let k = 0; k < array[m].length; k++){
								if (a == array[m][k]) {
									counter++;
								}
							}
						}
					}
					if (counter === 0) {
						let b = Math.floor(i / 3);
						let c = Math.round(3*n + b);
						let d = i % 3;
						let f = Math.round(3*l + d);
						matrix[c][f] = a;
						count++;
					}
				}
			}
			if (count !== 0) {
				array[i] = 0;
			}
		}
	}
	n++;
}
//************************************************************************************************
for (let rowIndex = 0; rowIndex < 9; rowIndex++) { //подстановка возможного числа в судоку
	for (let colIndex = 0; colIndex < 9; colIndex++) {
		if (matrix[rowIndex][colIndex] === 0) {
			let p = arrayForValues[ [rowIndex,colIndex] ];
			for (let j = 0; j < p.length; j++) {

				if ( checkExist(p[j], rowIndex, colIndex) === true) {
					continue;
				}

				const clone = matrix.slice(0);
				clone[rowIndex][colIndex] = p[j];

				let z = 0;
				while (z < 5) {
					for (let rowNumber = 0; rowNumber < 9; rowNumber++) { //поиск одиночек
						for (let colNumber = 0; colNumber < 9; colNumber++) {
							const block = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
							const numbers = [];

							if (clone[rowNumber][colNumber] === 0) {

								for (let colN = 0; colN < 9; colN++) { //перебор вариантов по строке
									
									if (clone[rowNumber][colN] !== 0) {
										let position = matrix[rowNumber][colN] - 1;
										block[position] = 0;
									}
								}

								
								for (let rowN = 0; rowN < 9; rowN++) { //перебор вариантов по столбцу
									if (clone[rowN][colNumber] !== 0) {
										let position = matrix[rowN][colNumber] - 1;
										block[position] = 0;
									}
								}

								let rowSquare = Math.floor(rowNumber / 3);
								let colSquare = Math.floor(colNumber / 3);
								const options = [];
								for (let rowSqN = rowSquare*3; rowSqN < ( (rowSquare + 1) * 3 ); rowSqN++){ //перебор вариантов по квадрату 3*3
									for (let colSqN = colSquare*3; colSqN < ( (colSquare + 1) * 3 ); colSqN++) {
										if (clone[rowSqN][colSqN] !== 0) {
											options.push(matrix[rowSqN][colSqN]);
										}
									}
								}
								options.sort( (a, b) => (a - b) );;
								for (let i = 0; i < options.length; i++) {
									let position = options[i] - 1;
									block[position] = 0; 
								}

								for (let position = 0; position < 9; position++) { //если в block, содержащем варианты, одно число, вставить его в судоку
									if (block[position] !== 0) {
										numbers.push( block[position] );
									}
								}
								if (numbers.length === 1) {
									clone[rowNumber][colNumber] = numbers[0];
								} else {
									valueArray[ [rowNumber,colNumber] ] = numbers;
								}
							}
						}
					} z++;
				}
				//поиск скрытых очиночек
					for (let rowNumber = 0; rowNumber < 9; rowNumber++) { // поиск по строке
						const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
						for (let colNumber = 0; colNumber < 9; colNumber++) {
							if (clone[rowNumber][colNumber] === 0) {
								let p = valueArray[ [rowNumber,colNumber] ];
								array[colNumber] = p;
							}
						}

						for(let i = 0; i < 9; i++) {
							let count = 0;
							if (array[i] !== 0) {
								for(let j = 0; j < array[i].length; j++) {
									let counter = 0;
									let a = array[i][j];
									if (checkExist(a, rowNumber, i) === true) {
										continue;
									}
									for (let m = 0; m < 9; m++) {
										if (array[m] !== 0 && m !== i) {
											for (let k = 0; k < array[m].length; k++){
												if (a == array[m][k]) {
													counter++;
												}
											}
										}
									}
									if (counter === 0) {
										clone[rowNumber][i] = a;
										count++;
									}
								}
							}
							if (count !== 0) {
								array[i] = 0;
							}
						}
					}


					for (let colNumber = 0; colNumber < 9; colNumber++) { // поиск по столбцу
						const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
						for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
							if (clone[rowNumber][colNumber] === 0) {
								let p = valueArray[ [rowNumber,colNumber] ];
								array[rowNumber] = p;
							}
						}
						for(let i = 0; i < 9; i++) {
							let count = 0;
							if (array[i] !== 0) {
								for(let j = 0; j < array[i].length; j++) {
									let counter = 0;
									let a = array[i][j];
									if (checkExist(a, i, colNumber) === true) {
										continue;
									}
									for (let m = 0; m < 9; m++) {
										if (array[m] !== 0 && m !== i) {
											for (let k = 0; k < array[m].length; k++){
												if (a == array[m][k]) {
													counter++;
												}
											}
										}
									}
									if (counter === 0) {
										clone[i][colNumber] = a;
										count++;
									}
								}
							}
							if (count !== 0) {
								array[i] = 0;
							}
						}
					}

					
				let n = 0;
				while (n < 3) {  // поиск по 1-3-им квадратам 3*3
					for (let  l = 0; l < 3; l++) {
						const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
						for (let rowNumber = n*3; rowNumber < ( (n + 1) * 3); rowNumber++) {
							for (let colNumber = l*3; colNumber < ( (l + 1) * 3); colNumber++) {
								if (clone[rowNumber][colNumber] === 0) {
									let p = valueArray[ [rowNumber,colNumber] ];
									let a = rowNumber % 3;
									let b = colNumber % 3;
									array[ (3*a + b) ] = p;
								}
							}
						}
						for(let i = 0; i < 9; i++) {
							let count = 0;
							if (array[i] !== 0) {
								for(let j = 0; j < array[i].length; j++) {
									let counter = 0;
									let a = array[i][j];
									if (checkExist(a, n*3, l*3) === true) {
										continue;
									}
									
									for (let m = 0; m < 9; m++) {
										if (array[m] !== 0 && m !== i) {
											for (let k = 0; k < array[m].length; k++){
												if (a == array[m][k]) {
													counter++;
												}
											}
										}
									}
									if (counter === 0) {
										let b = Math.floor(i / 3);
										let c = Math.round(3*n + b);
										let d = i % 3;
										let f = Math.round(3*l + d);
										clone[c][f] = a;
										count++;
									}
								}
							}
							if (count !== 0) {
								array[i] = 0;
							}
						}
					}
					n++;
				}



				let count = 0;
				for (let rowN = 0; rowN < 9; rowN++) {
					for (let colN = 0; colN < 9; colN++) {
						if (clone[rowN][colN] === 0) {
							count++;
						}
					}
				}
				if (count === 0) {
					break;
				}
			}
		}
	}
} 
  return matrix;
}
