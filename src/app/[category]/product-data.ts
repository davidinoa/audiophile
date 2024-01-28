export const idToNameMap = {
  'edc4479c-226d-4d71-8fad-b804ff6368c2': 'xx99-mark-ii',
  '728a3055-fbed-49ab-9c69-ad0140a581bd': 'xx99-mark-i',
  'abefd550-c2ad-4127-ad38-0994e632ea19': 'xx59',
  '90073dcc-f0f5-4e05-ba84-3ef7aa439b33': 'yx1-wireless',
  'dfbf2583-c0c7-4faa-b217-9fc2c9f3ca05': 'zx9',
  '102a3fe3-6bfa-45a3-aa06-629b50c65e18': 'zx7',
}

export const idToCategoryMap = {
  'edc4479c-226d-4d71-8fad-b804ff6368c2': 'headphones',
  '728a3055-fbed-49ab-9c69-ad0140a581bd': 'headphones',
  'abefd550-c2ad-4127-ad38-0994e632ea19': 'headphones',
  '90073dcc-f0f5-4e05-ba84-3ef7aa439b33': 'earphones',
  'dfbf2583-c0c7-4faa-b217-9fc2c9f3ca05': 'speakers',
  '102a3fe3-6bfa-45a3-aa06-629b50c65e18': 'speakers',
}

export const recommendedProducts: Record<string, string[]> = {
  'edc4479c-226d-4d71-8fad-b804ff6368c2': [
    '728a3055-fbed-49ab-9c69-ad0140a581bd',
    'abefd550-c2ad-4127-ad38-0994e632ea19',
    '90073dcc-f0f5-4e05-ba84-3ef7aa439b33',
  ],
  '728a3055-fbed-49ab-9c69-ad0140a581bd': [
    'edc4479c-226d-4d71-8fad-b804ff6368c2',
    'abefd550-c2ad-4127-ad38-0994e632ea19',
    '90073dcc-f0f5-4e05-ba84-3ef7aa439b33',
  ],
  'abefd550-c2ad-4127-ad38-0994e632ea19': [
    'edc4479c-226d-4d71-8fad-b804ff6368c2',
    '728a3055-fbed-49ab-9c69-ad0140a581bd',
    '90073dcc-f0f5-4e05-ba84-3ef7aa439b33',
  ],
  '90073dcc-f0f5-4e05-ba84-3ef7aa439b33': [
    'dfbf2583-c0c7-4faa-b217-9fc2c9f3ca05',
    '102a3fe3-6bfa-45a3-aa06-629b50c65e18',
    'abefd550-c2ad-4127-ad38-0994e632ea19',
  ],
  'dfbf2583-c0c7-4faa-b217-9fc2c9f3ca05': [
    '90073dcc-f0f5-4e05-ba84-3ef7aa439b33',
    '102a3fe3-6bfa-45a3-aa06-629b50c65e18',
    'abefd550-c2ad-4127-ad38-0994e632ea19',
  ],
  '102a3fe3-6bfa-45a3-aa06-629b50c65e18': [
    '90073dcc-f0f5-4e05-ba84-3ef7aa439b33',
    'dfbf2583-c0c7-4faa-b217-9fc2c9f3ca05',
    'abefd550-c2ad-4127-ad38-0994e632ea19',
  ],
}
