import {test, expect} from '@playwright/test';

test('Get Pokemon details - 200 OK', async ({request}) => {
    const response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu')
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('pikachu');
});

test('Get Pokemon moves sorted alphabetically using bubble sort', async ({ request }) => {
  const response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  
  // Validar código de estado y nombre
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.name).toBe('pikachu');

  // Extraer nombres de los movimientos
  const moveNames = responseBody.moves.map(
    (move: { move: { name: string } }) => move.move.name
  );

  // Ordenar alfabéticamente usando método de la burbuja
  for (let i = 0; i < moveNames.length - 1; i++) {
    for (let j = 0; j < moveNames.length - i - 1; j++) {
      if (moveNames[j].localeCompare(moveNames[j + 1]) > 0) {
        // Intercambio
        const temp = moveNames[j];
        moveNames[j] = moveNames[j + 1];
        moveNames[j + 1] = temp;
      }
    }
  }

  // Log de los movimientos ordenados
  console.log('=== Sorted Pokemon Moves (Bubble Sort) ===');
  moveNames.forEach((name: string) => console.log(name));

  // Verificar que efectivamente estén ordenados alfabéticamente
  const manuallySorted = [...moveNames].sort();
  expect(moveNames).toEqual(manuallySorted);
});

