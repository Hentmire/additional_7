module.exports = function solveSudoku(matrix) {
  const arrayForValues = {};
let i = 0;
while (i < 5) {
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
  return matrix;
}
